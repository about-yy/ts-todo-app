import { ICrudService } from "../common/ICrudService";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";

export class TaskService implements ICrudService<number, TaskForm, Task>{
    constructor(){
    }

    /**
     * タスク登録
     */
    public async create():Promise<any> {
        
        throw new Error("Method not implemented.");
    }
    
    /**
     * タスク一覧
     */
    public async list():Promise<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * タスク詳細
     */
    public async find():Promise<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * タスク更新
     */
    public async update():Promise<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * タスク削除
     */
    public async delete():Promise<any> {
        throw new Error("Method not implemented.");
    }
}