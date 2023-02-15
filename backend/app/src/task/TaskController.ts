import { plainToInstance } from "class-transformer";
import { format } from "date-fns";
import { NextFunction, Request, Response } from "express";
import { HttpsError } from "../common/http-error";
import JwtUtils from "../common/JwtUtils";
import Validator from "../common/Validator";
import TaskInput from "./TaskInput";
import TaskService from "./TaskService";

export default class TaskController {

    async create(req: Request, res: Response, next: NextFunction){
        const service = new TaskService();
        const hasMultiBody = req.body.tasks;
        const hasOneBody = req.body.title || req.body.period;

        let taskInputList: TaskInput[] = [];

        if(hasMultiBody&&hasOneBody){
            throw new HttpsError("invalid-argument", "invalid argument");
        } else if(hasMultiBody){
            taskInputList = plainToInstance(TaskInput, Object.values(req.body.tasks)) as TaskInput[];
        } else if(hasOneBody){
            const taskInput = plainToInstance(TaskInput, req.body);
            taskInputList = [taskInput];
        } else {
            throw new HttpsError("invalid-argument", "invalid argument");
        }

        const userId: number = Number(await JwtUtils.getUserId(req));

        const failed: any[] = [];
        const success: number[] = [];
        for await (const taskInput of taskInputList) {
            try {
                const validationResult = Validator.classValidate(taskInput);
                if(format(taskInput.period, "yyyy-MM-dd") < format(new Date(), "yyyy-MM-dd")){
                    throw new HttpsError("invalid-argument", "task period is past. please input future or current date.");
                }                
            } catch (error) {
                const errorDetail = Object.assign(taskInput, {error: error}) ; 
                failed.push(errorDetail);
            }
        }

        const registResult = await service.regist(userId, taskInputList);
        success.push(...registResult.success);
        failed.push(...registResult.failed);
        
        res.send({result: true, success: success, failed: failed});
    }
}