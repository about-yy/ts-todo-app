import { PrismaClient } from "@prisma/client";

export default class TaskRepository {
    async regist(userId: number, taskName: string, period: Date){
        const client = new PrismaClient();
        const registedTask = await client.task.create(
            {data: {
                title: taskName,
                limit_date: period,
                user: {
                    connect: {id: userId}
                }
            }}
        );

        return registedTask;
    }
}