import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { HttpsError } from "../common/http-error";
import JwtUtils from "../common/JwtUtils";
import Validator from "../common/Validator";
import TaskListInput from "./TaskListInput";
import TaskRegistInput from "./TaskRegistInput";
import TaskService from "./TaskService";

export default class TaskController {

    async create(req: Request, res: Response, next: NextFunction){
        const service = new TaskService();
        const hasMultiBody = req.body.tasks;
        const hasOneBody = req.body.title || req.body.period;
        let taskInputList: TaskRegistInput[] = [];

        if(hasMultiBody&&hasOneBody){
            throw new HttpsError("invalid-argument", "invalid argument");
        } else if(hasMultiBody){
            taskInputList = plainToInstance(TaskRegistInput, Object.values(req.body.tasks)) as TaskRegistInput[];
        } else if(hasOneBody){
            const taskInput = plainToInstance(TaskRegistInput, req.body);
            taskInputList = [taskInput];
        } else {
            throw new HttpsError("invalid-argument", "invalid argument");
        }

        const userId: number = Number(await JwtUtils.getUserId(req));
        const {success, failed} = await service.regist(userId, taskInputList);
        const result = (success.length == taskInputList.length && failed.length == 0);

        res.send({result: result, success: success, failed: failed});
    }

    async list(req: Request, res: Response , next: NextFunction){
        const service = new TaskService();
        const taskListInput = plainToInstance(TaskListInput, req.body);
        const validationResult = await Validator.classValidate(taskListInput);
        const userId = Number(await JwtUtils.getUserId(req));
        const result = await service.getTasks(userId, taskListInput.limit);
        res.send({tasks: result});
    }
}