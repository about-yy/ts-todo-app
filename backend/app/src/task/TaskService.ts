import { format } from "date-fns";
import { HttpsError } from "../common/http-error";
import Validator from "../common/Validator";
import TaskInput from "./TaskInput";
import TaskRepository from "./TaskRepository";

export default class TaskService {
    async regist(userId: number, taskInputList: TaskInput[]){
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
}