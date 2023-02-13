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
        const taskInput = plainToInstance(TaskInput, req.body);
        const validationResult = await Validator.classValidate(taskInput);
        const userId: number = Number(await JwtUtils.getUserId(req));

        if(format(taskInput.period, "yyyy-MM-dd") < format(new Date(), "yyyy-MM-dd")){
            throw new HttpsError("invalid-argument", "task period is past. please input future or current date.");
        }

        const taskId: number = await service.regist(userId, taskInput.taskName, taskInput.period);
        
        res.send({result: true, taskId: taskId});
    }
}