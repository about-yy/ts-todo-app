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
                    period: taskInput.period,
                    user: {connect: {user_id: userId}}
                }}
            );
            await registResult.then((registedTask)=>{
                success.push(registedTask.task_id);
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
            select: {
                task_id: true,
                title: true,
                period: true 
            },
            where: {
                user_id: userId,
                completed_at: null,
                deleted_at: null
            },
            orderBy: {
                created_at: "asc"
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
            const updateResult = client.task.updateMany(
                {
                    where: {
                        task_id: taskInput.taskId,
                        user_id: userId
                    }, 
                    data: {
                        title: taskInput.taskName,
                        period: taskInput.period
                    }
                }
            );
            await updateResult.then((task)=>{
                success.push(taskInput.taskId);
            }).catch((e)=>{
                failed.push(Object.assign(taskInput, e));
            })
        }
        return {success, failed};
    }

    async complete(userId: number, taskId: number){
        const client = await PrismaClientProvider.getClient();
        const result = await client.task.updateMany({
            where: {
                task_id: taskId,
                completed_at: null,
                user_id: userId
            }, 
            data: {
                completed_at: new Date().toISOString()
            }
        });
        return result;
    }

}