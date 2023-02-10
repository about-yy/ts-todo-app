import { expect } from "chai";
import { addMonths, format, subMonths } from "date-fns";
import supertest from "supertest";
import Logger from "../../src/common/Logger";
import index from "../../src/index";
import testdata from "./taskCreate.testdata.json";

const app = supertest(index);

describe("タスク登録テスト", async()=>{
    const user = testdata.users.correct;
    before(async ()=>{
        // ユーザ登録
        const regsitResult = await app
            .post("/user/regist")
            .send({
                email: user.email,
                password: user.password,
                username: user.username
            });
    })

    it("正常処理", async()=>{
        const task = testdata.tasks.correct;
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200)
        const createResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                title: task.title,
                period: format(new Date(),'yyyy-M-d')
            });
        expect(createResult.status).to.eq(200);
        expect(createResult.body).has.keys(["result", "taskId"]);
        expect(createResult.body.result).eq(true);
        expect(createResult.body.taskId).is.not.undefined;
    })

    it("タスク名なし", async()=>{
        const task = testdata.tasks.no_content;
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200)


        const createResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                title: task.title,
                period: format(new Date(),'yyyy-M-d')
            });
        expect(createResult.status).to.eq(400);
        expect(createResult.body).include.keys(["result"]);
        expect(createResult.body.result).eq(false);

    })

    it("期限が今日", async()=>{
        const task = testdata.tasks.correct;
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200)


        const createResult = await app
        .post("/task/create")
        .set("Authorization", loginResult.headers.authorization)
        .send({
            title: task.title,
            period: format(new Date(),'yyyy-M-d')
        });
        expect(createResult.status).to.eq(200);
        expect(createResult.body).has.keys(["result", "taskId"]);
        expect(createResult.body.result).eq(true);
        expect(createResult.body.taskId).is.not.undefined;

    })

    it("期限が未来", async()=>{
        const task = testdata.tasks.correct;
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200)


        const createResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                title: task.title,
                period: format(addMonths(new Date(), 1) ,'yyyy-M-d')
            });
        expect(createResult.status).to.eq(200);
        expect(createResult.body).has.keys(["result", "taskId"]);
        expect(createResult.body.result).eq(true);
        expect(createResult.body.taskId).is.not.undefined;

    })

    it("期限が過去", async()=>{
        const task = testdata.tasks.correct;
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200)


        const createResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                title: task.title,
                period: format(subMonths(new Date(), 1) ,'yyyy-M-d')
            });
        expect(createResult.status).to.eq(400);
        expect(createResult.body).include.keys(["result"]);
        expect(createResult.body.result).eq(false);
    })

    it("期限が不正な値", async()=>{
        const task = testdata.tasks.correct;
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);


        const createResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                title: task.title,
                period: format(new Date(),'yyyy-M-d, yyyyy-M-d')
            });
        expect(createResult.status).to.eq(400);
        expect(createResult.body).include.keys(["result"]);
        expect(createResult.body.result).eq(false);

    })

})