import { format } from "date-fns";
import { HttpsError } from "../common/http-error";
import Validator from "../common/Validator";
import TaskCompleteInput from "./TaskCompleteInput";
import TaskRegistInput from "./TaskRegistInput";
import TaskRepository from "./TaskRepository";
import TaskUpdateInput from "./TaskUpdateInput";

export default class TaskService {
    async regist(userId: number, taskInputList: TaskRegistInput[]){
        const repository = new TaskRepository();
        const validatedInput = [];
        const failed = [], success = [];

        for await (const taskInput of taskInputList) {
            try {
                const validationResult = await Validator.classValidate(taskInput);
                if(format(taskInput.period, "yyyy-MM-dd") < format(new Date(), "yyyy-MM-dd")){
                    throw new HttpsError("invalid-argument", "task period is past. please input future or current date.");
                }
                validatedInput.push(taskInput);
            } catch (error) {
                const errorDetail = Object.assign(taskInput, {error: error}) ; 
                failed.push(errorDetail);
            }
        }

        const registResult = await repository.regist(userId, validatedInput);
        success.push(...registResult.success);
        failed.push(...registResult.failed);
        
        return {success, failed};
    }

    async getTasks(userId: number, limit: number = 100){
        const repository = new TaskRepository();
        const tasks = await repository.get(userId, limit);
        return tasks;
    }

    async updateTasks(userId: number, taskList: TaskUpdateInput[]){
        const repository = new TaskRepository();
        const validatedInput = [];
        const failed = [], success = [];

        for await (const taskInput of taskList) {
            try {
                const validationResult = await Validator.classValidate(taskInput);
                if(format(taskInput.period, "yyyy-MM-dd") < format(new Date(), "yyyy-MM-dd")){
                    throw new HttpsError("invalid-argument", "task period is past. please input future or current date.");
                }
                validatedInput.push(taskInput);
            } catch (error) {
                const errorDetail = Object.assign(taskInput, {error: error}) ; 
                failed.push(errorDetail);
            }
        }

        const result = await repository.update(userId, validatedInput);
        success.push(...result.success);
        failed.push(...result.failed);
        return {success, failed};
    }

    async completeTask(userId: number, taskCompleteInput: TaskCompleteInput) {
        const repository = new TaskRepository();
        const result = await repository.complete(userId, taskCompleteInput.taskId);
        if(result.count == 0){
            throw new HttpsError("invalid-argument", "task is not found")
        }
        return taskCompleteInput.taskId;
    }

}