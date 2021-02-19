import { CrudRepositoryInterface } from "../common/CrudRepositoryInterface";
import { Task } from "./Task";
import pg, { QueryResult } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

export class TaskRepository implements CrudRepositoryInterface<number, Task>{
    private client: pg.Client;
    constructor(){
        const sslmode = (process.env.SSL_MODE=="true");

        this.client = new pg.Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {rejectUnauthorized: sslmode},
        });
        this.client.connect();
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
            const res = await this.client.query(sql, Object.values(fields));
            return res.rows[0].id;
        } catch (error) {
            throw error;
        }
    }

    async list(offset: number, limit: number): Promise<Array<Task>> {
        throw new Error("Method not implemented.");
    }

    async find(taskId: number):Promise<Task> {
        try {
            const sql = "select * from task where id = $1";
            const values = [taskId];
            const res: QueryResult = await this.client.query(sql, values);
            const task = new Task(res.rows[0]);
            return task;
        } catch(error){
            throw error;
        }
    }
    async update(task: Task): Promise<Task> {
        try{
            const sql = "update task set name = $2, status = $3, updated_at = now() where id = $1 RETURNING *";
            const fields = task.getFields();
            delete fields.created_at;
            delete fields.updated_at;
            delete fields.deleted_at;
            const res: QueryResult = await this.client.query(sql, Object.values(fields));
            const updated = new Task(res.rows[0]);
            return updated;
        } catch (error){
            throw error;
        }
    }
    async delete(task: Task): Promise<boolean> {
        try {
            const sql = "update task set deleted_at = now() where id = $1 RETURNING *";
            const res: QueryResult = await this.client.query(sql, [task.id]);
            return res.rows[0].id;
        } catch (error){
            throw error;
        }
    }


    /**
     * TODO テスト用のため、削除する
     */
    async deleteAll(){
        try {
            const sql = "delete from task";
            const res: QueryResult = await this.client.query(sql);
            return true;
        } catch (error){
            throw error;
        }
    }
}