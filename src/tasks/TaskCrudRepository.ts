import { ICrudRepository } from "../common/ICrudRepository";
import { Task } from "./Task";
import { QueryResult } from "pg";
import * as dotenv from "dotenv";
import { DBInterface } from "../common/DBInterface";
dotenv.config();

export class TaskRepository implements ICrudRepository<number, Task>{

    database: DBInterface; 
    constructor(database: DBInterface){
        this.database = database;
    }

    /**
     * タスク登録
     * @param task 
     */
    async create(task:Task): Promise<number>{
        try {
            const sql = "insert into task(name, status, created_at, updated_at) values($1, $2, $3, $4) RETURNING id";
            const fields = task.getFields();
            delete fields.id;
            delete fields.deleted_at;
            const res = await this.database.query(sql, Object.values(fields));
            return res.rows[0].id;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 一覧取得
     * @param offset 
     * @param limit 
     */
    async list(offset: number, limit: number): Promise<Array<Task>> {
        try {
            const sql = "select * from task offset $1 limit $2";
            const values = [offset, limit];
            const res: QueryResult = await this.database.query(sql, values);
            const list: Array<Task> = new Array();
            res.rows.forEach((row)=>{
                const task = new Task(row);
                list.push(task);
            });
            return list;
        } catch (error) {
            throw error;
        }
    }

    /**
     * 詳細取得
     * @param taskId 
     */
    async find(taskId: number):Promise<Task> {
        try {
            const sql = "select * from task where id = $1";
            const values = [taskId];
            const res: QueryResult = await this.database.query(sql, values);
            const task = new Task(res.rows[0]);
            return task;
        } catch(error){
            throw error;
        }
    }

    /**
     * 更新
     * @param task 
     */
    async update(task: Task): Promise<Task> {
        try{
            const sql = "update task set name = $2, status = $3, updated_at = now() where id = $1 RETURNING *";
            const fields = task.getFields();
            delete fields.created_at;
            delete fields.updated_at;
            delete fields.deleted_at;
            const res: QueryResult = await this.database.query(sql, Object.values(fields));
            const updated = new Task(res.rows[0]);
            return updated;
        } catch (error){
            throw error;
        }
    }
    
    /**
     * 削除
     * @param task 
     */
    async delete(task: Task): Promise<boolean> {
        try {
            const sql = "update task set deleted_at = now() where id = $1 RETURNING *";
            const res: QueryResult = await this.database.query(sql, [task.id]);
            return res.rows[0].id;
        } catch (error){
            throw error;
        }
    }


    /**
     * すべてのデータを削除する
     * テスト環境以外では呼び出せないようにする
     */
    async deleteAll(){
        try {
            const sql = "delete from task";
            const seqReset = "select setval('task_id_seq', 1, false)";
            const res: QueryResult = await this.database.query(sql);
            const resetRes: QueryResult = await this.database.query(seqReset);
            return true;
        } catch (error){
            throw error;
        }
    }
}