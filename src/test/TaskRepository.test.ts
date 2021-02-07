import { Task } from "../app/tasks/Task";
import { TaskRepository } from "../app/tasks/TaskRepository";

const repository = new TaskRepository();
jest.setTimeout(50000); // in milliseconds
test("タスクRepoのテスト",async ()=>{
    const date = new Date();
    const task = new Task(
        "test task",
        Task.STATE_NOTE,
        date
    );
    const fields = task.getFields();
    delete fields.id;
    delete fields.deleted_at;
    const values = Object.values(fields);
    expect(values).toStrictEqual(["test task", 0, date, date]);
    const taskId = await repository.create(task);
    try{
        const createdTask = await repository.find(taskId);
        expect(createdTask.name).toStrictEqual(task.name);
    } catch(e){
        console.error(e);
    }

});



