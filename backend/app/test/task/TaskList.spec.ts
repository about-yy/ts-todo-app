import supertest from "supertest";
import index from "../../src/index";
import testdata from "./taskList.testdata.json";

const app = supertest(index);
describe("タスク全件取得のテスト", async()=>{
    const user = testdata.users.get_all;
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
    it("登録タスク: 1, 取得結果: 1");
    it("登録タスク: 2, 取得結果: 2");
    it("登録タスク: 120, 取得結果: 100");

});

describe("タスク件数制限取得のテスト", async()=>{
    const user = testdata.users.get_limit;
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
    it("登録タスク: 120, 取得結果: 0");
    it("登録タスク: 120, 取得結果: 1");
    it("登録タスク: 120, 取得結果: 2");
    it("登録タスク: 120, 取得結果: 100");

})

describe("タスク取得失敗のテスト", async()=>{
    const user = testdata.users.invalid;
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

    it("登録済みタスクがない");
    it("limit 0 は不正な引数");
    it("不正な引数");

});
