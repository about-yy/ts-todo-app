import { CrudRepository } from "../common/CrudRepository";
import { Task } from "./Task";
import pg, { QueryResult } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

export class TaskRepository implements CrudRepository<number, Task>{
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
     * タスクをDBに登録する処理
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
            console.error(error);            
            throw error;
        }
    }
    list() {
        throw new Error("Method not implemented.");
    }
    async find(taskId: number) {
        try {
            const sql = "select * from task where id = $1";
            const values = [taskId];
            const res: QueryResult = await this.client.query(sql, values);
            const task = new Task(res.rows[0]);
            return task;
        } catch(error){
            console.error(error);
            throw error;
        }
    }
    update() {
        throw new Error("Method not implemented.");
    }
    delete() {
        throw new Error("Method not implemented.");
    }

}