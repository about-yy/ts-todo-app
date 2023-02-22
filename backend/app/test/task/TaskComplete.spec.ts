import { Task } from "@prisma/client";
import { expect } from "chai";
import words from "random-words";
import supertest from "supertest";
import index from "../../src/index";
import testdata from "./taskComplete.testdata.json";

const app = supertest(index);


describe("タスク完了機能のテスト", async()=>{
    const user = testdata.users.correct;
    before(async()=>{
        // ユーザ登録
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
        
        // タスク作成
        const tasks = words(20).map(word => {
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

    it("正常に完了", async()=>{
        // ログイン
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        // タスク取得
        const getTaskResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        
        expect(getTaskResult.status).to.eq(200);

        const targetTasks = getTaskResult.body.tasks[0] as Task;
        // タスク完了
        const completeResult = await app
            .post("/task/complete")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                taskId: targetTasks.task_id
            })
        expect(completeResult.status).to.eq(200);
        expect(completeResult.body).has.keys(["result", "task_id"])
        expect(completeResult.body.result).eq(true)
        expect(completeResult.body.task_id).eq(targetTasks.task_id);

        // タスク取得
        const reGetTaskResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        
        expect(reGetTaskResult.status).to.eq(200);

        const completedTasks = reGetTaskResult.body.tasks.filter((task: Task)=>{
            return task.task_id == targetTasks.task_id
        });
        expect(completedTasks.length).to.eq(0);

    });

    it("タスクIDなし", async()=>{
        // ログイン
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        // タスク取得
        const getTaskResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        
        expect(getTaskResult.status).to.eq(200);

        const targetTasks = getTaskResult.body.tasks[0] as Task;
        // タスク完了
        const completeResult = await app
            .post("/task/complete")
            .set("Authorization", loginResult.headers.authorization)
            .send({
            })
        expect(completeResult.status).to.eq(400);
        expect(completeResult.body).include.keys(["result"])
        expect(completeResult.body.result).eq(false)
 
        // タスク取得
        const reGetTaskResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        
        expect(reGetTaskResult.status).to.eq(200);

        const completedTasks = reGetTaskResult.body.tasks.filter((task: Task)=>{
            return task.task_id == targetTasks.task_id
        });
        expect(completedTasks.length).to.eq(1);

    });


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
        const getTaskResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        
        expect(getTaskResult.status).to.eq(200);

        const targetTasks = getTaskResult.body.tasks[0] as Task;
        // タスク完了
        const completeResult = await app
            .post("/task/complete")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                taskId: Math.pow(targetTasks.task_id*2, 2)*100
            })
        expect(completeResult.status).to.eq(400);
        expect(completeResult.body).include.keys(["result"])
        expect(completeResult.body.result).eq(false)
        
        // タスク取得
        const reGetTaskResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        
        expect(reGetTaskResult.status).to.eq(200);

        const completedTasks = reGetTaskResult.body.tasks.filter((task: Task)=>{
            return task.task_id == targetTasks.task_id
        });
        expect(completedTasks.length).to.eq(1);

    });


})
