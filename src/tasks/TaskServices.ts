import { ICrudRepository } from "../common/ICrudRepository";
import { ICrudService } from "../common/ICrudService";
import { Task } from "./Task";

export class TaskService implements ICrudService<number, Task>{
    repository: ICrudRepository<number, Task>;

    constructor(repository: ICrudRepository<number, Task>){
        this.repository = repository;
    }

    /**
     * タスク登録
     */
    public async create(task: Task): Promise<number> {
        return this.repository.create(task);
    }
    
    /**
     * タスク一覧
     */
    public async list(offset: number, limit:number ): Promise<Array<Task>> {
        return this.repository.list(offset, limit);
    }

    /**
     * タスク詳細
     */
    public async find(id: number):Promise<Task> {
        return this.repository.find(id);
    }

    /**
     * タスク情報更新
     */
    public async update(task: Task): Promise<Task> {
        return this.repository.update(task);
    }

    /**
     * ステータス更新
     */
    public async updateStatus(id: number, status: number): Promise<Task>{
        const task =  await this.repository.find(id);
        task.updateStatus(status);
        const updatedTask = this.repository.update(task);
        return updatedTask;
    }

    /**
     * タスク削除
     */
    public async delete(id: number):Promise<boolean> {
        const task: Task = await this.repository.find(id);
        return this.repository.delete(task);
    }
}