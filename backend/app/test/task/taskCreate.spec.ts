import { expect } from "chai";
import { addMonths, format, subMonths } from "date-fns";
import supertest from "supertest";
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
                period: new Date().toISOString()
            });

        expect(createResult.status).to.eq(200);
        expect(createResult.body).has.keys(["result", "success", "failed"]);
        expect(createResult.body.result).eq(true);
        expect(createResult.body.success).to.be.an("array")
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
                period: new Date().toISOString()
            });
        expect(createResult.status).to.eq(400);
        expect(createResult.body).include.keys(["result"]);
        expect(createResult.body.result).eq(false);

    })

    it("期限が今日", async()=>{
        const task = testdata.tasks.today_period;
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
            period: new Date().toISOString()
        });
        expect(createResult.status).to.eq(200);
        expect(createResult.body).has.keys(["result", "taskId"]);
        expect(createResult.body.result).eq(true);
        expect(createResult.body.taskId).is.not.undefined;

    })

    it("期限が未来", async()=>{
        const task = testdata.tasks.future_period;
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
                period: addMonths(new Date(), 1).toISOString()
            });
        expect(createResult.status).to.eq(200);
        expect(createResult.body).has.keys(["result", "taskId"]);
        expect(createResult.body.result).eq(true);
        expect(createResult.body.taskId).is.not.undefined;

    })

    it("期限が過去", async()=>{
        const task = testdata.tasks.past_period;
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
                period: subMonths(new Date(), 1).toISOString()
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

describe("タスク登録テスト（複数）", async()=>{
    const user = testdata.users.multi_correct;
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
    it("全件登録", async()=>{
        const tasks = Object.values(testdata.tasks).map((task: any) => {
            task.period = new Date().toISOString();
            if(!task.title){
                task.title = "no content"
            }
            return task;
        });

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
                tasks: tasks
            });

        expect(createResult.status).to.eq(200);
        expect(createResult.body).has.keys(["result", "success", "failed"]);
        expect(createResult.body.result).eq(true);
        expect(typeof createResult.body.success).eq("Array");
        expect(typeof createResult.body.failed).eq("Array");
        expect(createResult.body.success.length).is.eq(tasks.length);
        expect(createResult.body.failed.length).is.eq(0);
    })
    it("一部登録、一部失敗", async()=>{
        const tasks = Object.values(testdata.tasks).map((task: any, index) => {
            task.period = new Date().toISOString();
            if(index < 5){
                task.title = "";
            } else if(index >= 5 && !task.title){
                task.title = "no content"
            }
            return task;
        });

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
                tasks: tasks
            });

        expect(createResult.status).to.eq(200);
        expect(createResult.body).has.keys(["result", "success", "failed"]);
        expect(createResult.body.result).eq(false);
        expect(typeof createResult.body.success).eq("Array");
        expect(typeof createResult.body.failed).eq("Array");
        expect(createResult.body.success.length).is.eq(tasks.length-4);
        expect(createResult.body.failed.length).is.eq(4);


    })
    it("全部失敗", async()=>{
        const tasks = Object.values(testdata.tasks).map((task: any) => {
            task.period = new Date().toISOString();
            task.title = ""
            return task;
        });

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
                tasks: tasks
            });

        expect(createResult.status).to.eq(200);
        expect(createResult.body).has.keys(["result", "success", "failed"]);
        expect(createResult.body.result).eq(false);
        expect(typeof createResult.body.success).eq("Array");
        expect(typeof createResult.body.failed).eq("Array");
        expect(createResult.body.success.length).is.eq(0);
        expect(createResult.body.failed.length).is.eq(tasks.length);

    })
})