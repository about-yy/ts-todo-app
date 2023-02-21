import { expect, use } from "chai";
import words from "random-words";
import supertest from "supertest";
import index from "../../src/index";
import testdata from "./taskEdit.testdata.json";
import deepEqualInAnyOrder from 'deep-equal-in-any-order';
import { Task } from "@prisma/client";
use(deepEqualInAnyOrder);

const app = supertest(index);

describe("タスク編集機能のテスト", async()=>{
    const user = testdata.users.correct;
    before(async()=>{
        // 会員登録
        const registResult = await app
            .post("/user/regist")
            .send({
                email: user.email,
                password: user.password,
                username: user.username
            });

        // ログイン
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        
        // テストデータ登録
        const tasks = words(10).map(word=>{
            return {
                title: word,
                period: new Date().toISOString()
            }
        });
        const createResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                tasks: tasks
            });
    })

    it("1件編集", async()=>{
        // ログイン
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        // タスク取得
        const taskListResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        
        expect(taskListResult.status).to.eq(200)
        expect(taskListResult.body.tasks.length).to.eq(10)
        
        const editWord = words(1)[0];
        const targetTask: Task = taskListResult.body.tasks[0];
        const taskEditResult = await app
            .post("/task/edit")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                taskId: targetTask.task_id,
                title: editWord,
                period: new Date().toISOString()
            });
        expect(taskEditResult.status).to.eq(200)
        expect(taskEditResult.body.result).eq(true)
        expect(taskEditResult.body.success.length).eq(1);
        expect(taskEditResult.body.failed.length).eq(0);

        const reGetResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        expect(reGetResult.status).to.eq(200)
        expect(reGetResult.body.tasks.length).eq(10)
        const updatedTask = reGetResult.body.tasks.filter((task:Task)=>task.task_id === targetTask.task_id)[0];
        expect(updatedTask.title).to.eq(editWord);
        expect(updatedTask.period).not.eq(targetTask.period);
    })
    it("2件編集", async()=>{
        // ログイン
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        // タスク取得
        const taskListResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        
        expect(taskListResult.status).to.eq(200)
        expect(taskListResult.body.tasks.length).to.eq(10)
        
        const editTasks: Task[] = taskListResult.body.tasks.slice(0,2).map((task: any)=>{  
            return {
                taskId: task.task_id,
                title: words(1)[0], 
                period: new Date().toISOString()
            };
        });

        const taskEditResult = await app
            .post("/task/edit")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                tasks: editTasks
            });
        expect(taskEditResult.status).to.eq(200)
        expect(taskEditResult.body.result).eq(true)
        expect(taskEditResult.body.success.length).eq(2);
        expect(taskEditResult.body.failed.length).eq(0);

        const reGetResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        expect(reGetResult.status).to.eq(200)
        expect(reGetResult.body.tasks.length).eq(10)
        const editIds = editTasks.map((value: any)=>value.taskId) as number[];
        const updatedTask = reGetResult.body.tasks.filter((task:any)=>editIds.includes(task.id));
        expect(updatedTask).not.to.deep.equalInAnyOrder(editTasks);
    })
    it("存在しないタスクID", async()=>{
        // ログイン
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        // タスク取得
        const taskListResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        
        expect(taskListResult.status).to.eq(200)
        expect(taskListResult.body.tasks.length).to.eq(10)
        
        const editWord = words(1)[0];
        const targetTask = taskListResult.body.tasks[0];
        const taskEditResult = await app
            .post("/task/edit")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                taskId: Math.pow(targetTask, 2),
                title: words(1)[0], 
                period: new Date().toISOString()
            });
        expect(taskEditResult.status).to.eq(200)
        expect(taskEditResult.body.result).eq(false)
        expect(taskEditResult.body.success.length).eq(0);
        expect(taskEditResult.body.failed.length).eq(1);

        const reGetResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        expect(reGetResult.status).to.eq(200)
        expect(reGetResult.body.tasks.length).eq(10)
        const updatedTask = reGetResult.body.tasks.filter((task:any)=>task.id === targetTask.id)[0];
        expect(updatedTask).to.deep.equal(targetTask);
    })
    it("タスクIDの値がない", async()=>{
                // ログイン
                const loginResult = await app
                .post("/auth/login")
                .send({
                    email: user.email,
                    password: user.password
                });
            expect(loginResult.status).to.eq(200);
    
            // タスク取得
            const taskListResult = await app
                .get("/task/list")
                .set("Authorization", loginResult.headers.authorization);
            
            expect(taskListResult.status).to.eq(200)
            expect(taskListResult.body.tasks.length).to.eq(10)
            
            const editWord = words(1)[0];
            const targetTask = taskListResult.body.tasks[0];
            const taskEditResult = await app
                .post("/task/edit")
                .set("Authorization", loginResult.headers.authorization)
                .send({
                    title: words(1)[0], 
                    period: new Date().toISOString()
                });
            expect(taskEditResult.status).to.eq(200)
            expect(taskEditResult.body.result).eq(false)
            expect(taskEditResult.body.success.length).eq(0);
            expect(taskEditResult.body.failed.length).eq(1);
    
            const reGetResult = await app
                .get("/task/list")
                .set("Authorization", loginResult.headers.authorization);
            expect(reGetResult.status).to.eq(200)
            expect(reGetResult.body.tasks.length).eq(10)
            const updatedTask = reGetResult.body.tasks.filter((task:any)=>task.id === targetTask.id)[0];
            expect(updatedTask).to.deep.equal(targetTask);
    
    })
    it("タスクIDはあるが、編集内容がない", async()=>{
        // ログイン
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        // タスク取得
        const taskListResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        
        expect(taskListResult.status).to.eq(200)
        expect(taskListResult.body.tasks.length).to.eq(10)
        
        const editWord = words(1)[0];
        const targetTask = taskListResult.body.tasks[0];
        const taskEditResult = await app
            .post("/task/edit")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                taskId: Math.pow(targetTask, 2),
                period: new Date().toISOString()
            });
        expect(taskEditResult.status).to.eq(200)
        expect(taskEditResult.body.result).eq(false)
        expect(taskEditResult.body.success.length).eq(0);
        expect(taskEditResult.body.failed.length).eq(1);

        const reGetResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        expect(reGetResult.status).to.eq(200)
        expect(reGetResult.body.tasks.length).eq(10)
        const updatedTask = reGetResult.body.tasks.filter((task:any)=>task.id === targetTask.id)[0];
        expect(updatedTask).to.deep.equal(targetTask);

    })
    it("タスクIDはあるが、編集内容が不正な値", async()=>{
        // ログイン
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        // タスク取得
        const taskListResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        
        expect(taskListResult.status).to.eq(200)
        expect(taskListResult.body.tasks.length).to.eq(10)
        
        const editWord = words(1)[0];
        const targetTask = taskListResult.body.tasks[0];
        const taskEditResult = await app
            .post("/task/edit")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                taskId: Math.pow(targetTask, 2),
                title: editWord,
                period: new Date().toISOString()+new Date().toISOString()
            });
        expect(taskEditResult.status).to.eq(200)
        expect(taskEditResult.body.result).eq(false)
        expect(taskEditResult.body.success.length).eq(0);
        expect(taskEditResult.body.failed.length).eq(1);

        const reGetResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        expect(reGetResult.status).to.eq(200)
        expect(reGetResult.body.tasks.length).eq(10)
        const updatedTask = reGetResult.body.tasks.filter((task:any)=>task.id === targetTask.id)[0];
        expect(updatedTask).to.deep.equal(targetTask);

        
    })
});