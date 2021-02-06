import { CrudRepository } from "../common/CrudRepository";
import { Task } from "./Task";

export class TaskRepository implements CrudRepository<Task>{

    /**
     * タスクをDBに登録する処理
     * @param task 
     */
    create(task:Task) {
        
        throw new Error("Method not implemented.");
    }
    list() {
        throw new Error("Method not implemented.");
    }
    find() {
        throw new Error("Method not implemented.");
    }
    update() {
        throw new Error("Method not implemented.");
    }
    delete() {
        throw new Error("Method not implemented.");
    }

}