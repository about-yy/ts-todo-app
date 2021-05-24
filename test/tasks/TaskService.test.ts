import { PostgresDB } from "../../src/common/PostgresDB";
import { Task } from "../../src/tasks/Task";
import { TaskRepository } from "../../src/tasks/TaskCrudRepository";
import { TaskService } from "../../src/tasks/TaskServices";

const repository = new TaskRepository(new PostgresDB());

beforeAll(()=>{
    // テストデータ
    const data = [
        {
            name: "test task1",
            status: Task.STATE_NOTE
        },
        {
            name: "test task2",
            status: Task.STATE_NOTE
        },
        {
            name: "test task3",
            status: Task.STATE_NOTE
        },
        {
            name: "test task4",
            status: Task.STATE_NOTE
        },
        {
            name: "test task5",
            status: Task.STATE_NOTE
        },
        {
            name: "test task6",
            status: Task.STATE_NOTE
        }
    ];

    data.forEach((datum)=>{
        repository.create(new Task(datum.name, datum.status, new Date()));
    });

    
});

const service = new TaskService(repository);

describe("Task Service Crud Test", ()=>{
    test("create", async ()=>{
        const task = new Task("creeated task", Task.STATE_NOTE, new Date());
        expect(typeof(await service.create(task))).toBe("number");
    });

    test("find", async()=>{
        expect((await service.find(1)).name).toBe("test task1");
    });

    test("list", async()=>{
        const taskList:Array<Task> = await service.list(0, 5);
        expect(taskList.length).toBe(5);
        expect(taskList[0].name).toBe("test task1");
    });

    test("update", async()=>{
        const task = await repository.find(2);
        task.name = "updated task2";
        expect((await service.update(task)).name).toBe("updated task2");
    });

    test("delete", async()=>{
        const task = await repository.find(3);
        expect((await service.delete(task.getId()))).toBe(3);
    });
});

describe("task service's unique process test", ()=>{
    test("task status updating test", async()=>{
        const task = await repository.find(4);
        const updated = await service.updateStatus(task.getId(), Task.STATE_PLAN);
        expect(updated.getStatus()).toBe(Task.STATE_PLAN);
    });
});

afterAll(()=>{
    repository.deleteAll();
});