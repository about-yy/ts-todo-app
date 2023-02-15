import { PrismaClient } from "@prisma/client";
import Logger from "../common/Logger";
import TaskInput from "./TaskInput";

export default class TaskRepository {
    async regist(userId: number, taskInputList: TaskInput[]){
        const client = new PrismaClient();
        const insertData = taskInputList.map((task)=>{
            return {
                title: task.taskName,
                limit_date: task.period,
                userId: userId
            };
        });
        const success: number[] = [];
        const failed: any[] = [];
        for (const taskInput of taskInputList) {
            const registResult = client.task.create(
                {data: {
                    title: taskInput.taskName,
                    limit_date: taskInput.period,
                    user: {connect: {id: userId}}
                }}
            );
            await registResult.then((registedTask)=>{
                success.push(registedTask.id);
            }).catch((e)=>{
                failed.push(Object.assign(taskInput, e));
            })
        }
        const result = {
            "success": success,
            "failed": failed
        }
        return result;
    }
}