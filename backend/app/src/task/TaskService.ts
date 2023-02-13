import TaskRepository from "./TaskRepository";

export default class TaskService {
    async regist(userId: number, taskName: string, period: Date){
        const repository = new TaskRepository();
        const registedTask = await repository.regist(userId, taskName, period);
        return registedTask.id;
    }
}