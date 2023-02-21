import { expect } from "chai";
import words from "random-words";
import supertest from "supertest";
import Logger from "../../src/common/Logger";
import index from "../../src/index";
import testdata from "./taskEdit.testdata.json";

const app = supertest(index);

describe("タスク編集機能のテスト 1件ずつ", async()=>{
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
        
        const editWord = words(1);
        const targetTask = taskListResult.body.tasks[0];

        const taskEditResult = await app
            .post("/task/edit")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                taskId: targetTask.taskId,
                title: editWord,
                period: new Date().toISOString()
            });
        
        expect(taskEditResult.status).to.eq(200)
        expect(taskEditResult.body.result).eq(true)

        const reGetResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        expect(reGetResult.status).to.eq(200)
        expect(reGetResult.body.tasks.length).eq(10)
        const updatedTask = reGetResult.body.tasks.filter((task:any)=>task.title === editWord)[0];
        expect(updatedTask.title).to.eq(targetTask.title);
        expect(updatedTask.period).not.eq(targetTask.period);

    })
    it("2件編集", async()=>{})
    it("存在しないタスクID", async()=>{})
    it("タスクIDの値がない", async()=>{})
    it("タスクIDはあるが、編集内容がない", async()=>{})
    it("タスクIDはあるが、編集内容が不正な値", async()=>{})
});