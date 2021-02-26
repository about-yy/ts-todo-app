import { Task } from "../../app/tasks/Task";
import { TaskRepository } from "../../app/tasks/TaskCrudRepository";

const repository = new TaskRepository();
beforeAll(()=>{
    repository.deleteAll();

    repository.create(new Task(
        "find task",
        Task.STATE_NOTE,
        new Date()
    ));
    
    repository.create(new Task(
        "update task",
        Task.STATE_NOTE,
        new Date()
    ));
})

afterAll(()=>{
    repository.deleteAll();
})

describe("Task Repository Tests", ()=>{
    test("create new task", async ()=>{
        const task = new Task(
            "test task",
            Task.STATE_NOTE,
            new Date()
        );
        expect(typeof await repository.create(task)).toBe("number");
    })

    test("find created task", async ()=>{
        expect((await repository.find(1)).name).toBe("find task");
    })

    test("update find task", async()=>{
        const task = await repository.find(2);
        task.name = "updated task";
        const updated = await repository.update(task);
        expect(updated.id).toBe(task.id);
    })

    test("list all task", async()=>{
        const offset = 0;
        const limit = 5;
        expect((await repository.list(offset, limit)) instanceof Array).toBe(true);
        expect((await repository.list(offset, limit))[0] instanceof Task).toBe(true);
    })

    test("delete find task", async()=>{
        const task = await repository.find(1);
        expect((await repository.delete(task))).toBe(1);
    })

});