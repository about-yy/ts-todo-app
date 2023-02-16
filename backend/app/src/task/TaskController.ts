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
        const {success, failed} = await service.regist(userId, taskInputList);
        const result = (success.length == taskInputList.length && failed.length == 0);

        res.send({result: result, success: success, failed: failed});
    }
}