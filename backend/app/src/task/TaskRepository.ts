import PrismaClientProvider from "../common/PrismaClientProvider";
import TaskRegistInput from "./TaskRegistInput";
import TaskUpdateInput from "./TaskUpdateInput";

export default class TaskRepository {
    async regist(userId: number, taskInputList: TaskRegistInput[]){
        const client = await PrismaClientProvider.getClient();
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
        const client = await PrismaClientProvider.getClient();
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

    async update(userId: number, taskInputList: TaskUpdateInput[]){
        const client = await PrismaClientProvider.getClient();
        const success: number[] = [];
        const failed: any[] = [];
        for (const taskInput of taskInputList) {
            const updateResult = client.task.update(
                {
                    where: {
                        id: taskInput.taskId
                    }, 
                    data: {
                        title: taskInput.taskName,
                        limit_date: taskInput.period
                    }
                }
            );
            await updateResult.then((task)=>{
                success.push(task.id);
            }).catch((e)=>{
                failed.push(Object.assign(taskInput, e));
            })
        }
        return {success, failed};
    }

}