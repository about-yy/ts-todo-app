import TaskInput from "./TaskInput";
import TaskRepository from "./TaskRepository";

export default class TaskService {
    async regist(userId: number, taskInputList: TaskInput[]){
        const repository = new TaskRepository();
        const registResult = await repository.regist(userId, taskInputList);
        return registResult;
    }
}