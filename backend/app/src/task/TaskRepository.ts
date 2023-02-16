import { PrismaClient } from "@prisma/client";
import TaskRegistInput from "./TaskRegistInput";

export default class TaskRepository {
    async regist(userId: number, taskInputList: TaskRegistInput[]){
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

    async get(userId: number, limit: number) {
        const client = new PrismaClient();
        const result = await client.task.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                limit_date: "asc"
            },
            take: limit
        });
        return result;
    }

}