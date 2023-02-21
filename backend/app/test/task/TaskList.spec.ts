import supertest from "supertest";
import index from "../../src/index";
import testdata from "./taskList.testdata.json";
import randomWords from "random-words";
import { expect } from "chai";

const app = supertest(index);
describe("タスク全件取得のテスト", async()=>{
    const users = testdata.users;
    const words = randomWords(120);
    const tasks = words.map(word=>{
        return {
            title: word,
            period: new Date().toISOString()
        }
    });

    before(async()=>{
        // ユーザ登録
        await app
            .post("/user/regist")
            .send({
                email: users.get_all_0.email,
                password: users.get_all_0.password,
                username: users.get_all_0.username
            });
        
        await app
            .post("/user/regist")
            .send({
                email: users.get_all_1.email,
                password: users.get_all_1.password,
                username: users.get_all_1.username
            });

        await app
            .post("/user/regist")
            .send({
                email: users.get_all_2.email,
                password: users.get_all_2.password,
                username: users.get_all_2.username
            });

        await app
            .post("/user/regist")
            .send({
                email: users.get_all_100.email,
                password: users.get_all_100.password,
                username: users.get_all_100.username
            });
        
    })

    it("登録済みタスクがない", async()=>{
        const user = users.get_all_0;
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        const getResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        expect(getResult.status).to.eq(200);
        expect(getResult.body).has.keys(["tasks"]);
        expect(getResult.body.tasks).to.be.an("array")
        expect(getResult.body.tasks.length).eq(0);
    });


    it("登録タスク: 1, 取得結果: 1", async()=>{
        const user = users.get_all_1;
        const taskList = tasks.slice(0,1);
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        const registResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                tasks: taskList
            });
        expect(registResult.status).to.eq(200);
        expect(registResult.body.success.length).to.eq(1);

        const getResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        expect(getResult.status).to.eq(200);
        expect(getResult.body).has.keys(["tasks"]);
        expect(getResult.body.tasks).to.be.an("array")
        expect(getResult.body.tasks[0]).has.keys(["task_id", "title", "period"]);
        expect(getResult.body.tasks.length).eq(1);

    });

    it("登録タスク: 2, 取得結果: 2", async()=>{
        const user = users.get_all_2;
        const taskList = tasks.slice(1,2);
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        const registResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                tasks: taskList
            });
        expect(registResult.status).to.eq(200);
        expect(registResult.body.success.length).to.eq(1);

        const getResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        expect(getResult.status).to.eq(200);
        expect(getResult.body).has.keys(["tasks"]);
        expect(getResult.body.tasks).to.be.an("array")
        expect(getResult.body.tasks.length).eq(2);

    });

    it("登録タスク: 120, 取得結果: 100", async()=>{
        const user = users.get_all_100;

        const taskList = tasks.slice(2);
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        const registResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                tasks: taskList
            });
        expect(registResult.status).to.eq(200);
        expect(registResult.body.success.length).to.eq(118);

        const getResult = await app
            .get("/task/list")
            .set("Authorization", loginResult.headers.authorization);
        expect(getResult.status).to.eq(200);
        expect(getResult.body).has.keys(["tasks"]);
        expect(getResult.body.tasks).to.be.an("array")
        expect(getResult.body.tasks.length).eq(100);

    });

});

describe("タスク件数制限取得のテスト", async()=>{
    const user = testdata.users.get_limit;
    const words = randomWords(120);
    const tasks = words.map(word=>{
        return {
            title: word,
            period: new Date().toISOString()
        }
    });
    before(async()=>{
        // ユーザ登録
        const regsitResult = await app
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
        expect(loginResult.status).to.eq(200);
        
        // タスクを登録
        const registResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                tasks: tasks
            });
        expect(registResult.status).to.eq(200);
        expect(registResult.body.success.length).to.eq(120);
        
    })

    it("登録タスク: 120, 取得結果: 1", async()=>{
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        const registResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                tasks: tasks
            });
        expect(registResult.status).to.eq(200);
        expect(registResult.body.success.length).to.eq(120);

        const getResult = await app
            .get("/task/list")
            .send({
                limit: 1
            })
            .set("Authorization", loginResult.headers.authorization);
        expect(getResult.status).to.eq(200);
        expect(getResult.body).has.keys(["tasks"]);
        expect(getResult.body.tasks).to.be.an("array")
        expect(getResult.body.tasks.length).eq(1);
    });
    it("登録タスク: 120, 取得結果: 2", async()=>{
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        const registResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                tasks: tasks
            });
        expect(registResult.status).to.eq(200);
        expect(registResult.body.success.length).to.eq(120);

        const getResult = await app
            .get("/task/list")
            .send({
                limit: 2
            })
            .set("Authorization", loginResult.headers.authorization);
        expect(getResult.status).to.eq(200);
        expect(getResult.body).has.keys(["tasks"]);
        expect(getResult.body.tasks).to.be.an("array")
        expect(getResult.body.tasks.length).eq(2);
    });
    it("登録タスク: 120, 取得結果: 100", async()=>{
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        const registResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                tasks: tasks
            });
        expect(registResult.status).to.eq(200);
        expect(registResult.body.success.length).to.eq(120);

        const getResult = await app
            .get("/task/list")
            .send({
                limit: 100
            })
            .set("Authorization", loginResult.headers.authorization);
        expect(getResult.status).to.eq(200);
        expect(getResult.body).has.keys(["tasks"]);
        expect(getResult.body.tasks).to.be.an("array")
        expect(getResult.body.tasks.length).eq(100);
    });

})

describe("タスク取得失敗のテスト", async()=>{
    const user = testdata.users.invalid;
    const words = randomWords(120);
    const tasks = words.map(word=>{
        return {
            title: word,
            period: new Date().toISOString()
        }
    });
    before(async()=>{
        // ユーザ登録
        const regsitResult = await app
            .post("/user/regist")
            .send({
                email: user.email,
                password: user.password,
                username: user.username
            });
    })

    it("limit 0 は不正な引数", async()=>{
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        const registResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                tasks: tasks
            });
        expect(registResult.status).to.eq(200);
        expect(registResult.body.success.length).to.eq(120);

        const getResult = await app
            .get("/task/list")
            .send({
                limit: 0
            })
            .set("Authorization", loginResult.headers.authorization);
        expect(getResult.status).to.eq(400);
        expect(getResult.body).include.keys("result");
        expect(getResult.body.result).eq(false);
    });

    it("不正な引数", async()=>{
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);

        const registResult = await app
            .post("/task/create")
            .set("Authorization", loginResult.headers.authorization)
            .send({
                tasks: tasks
            });
        expect(registResult.status).to.eq(200);
        expect(registResult.body.success.length).to.eq(120);

        const getResult = await app
            .get("/task/list")
            .send({
                limit: "order by taskId" 
            })
            .set("Authorization", loginResult.headers.authorization);
        expect(getResult.status).to.eq(400);
        expect(getResult.body).include.keys("result");
        expect(getResult.body.result).eq(false);
    });

});
