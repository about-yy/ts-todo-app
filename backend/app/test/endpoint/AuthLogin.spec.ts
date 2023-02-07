import { expect } from "chai";
import supertest from "supertest";
import index from "../../src/index";
import testdata from "./auth.testdata.json";

const app = supertest(index);
describe("ログイン機能のテスト", async()=>{
    it("存在するユーザ", async()=>{
        const user = testdata.users.correct;
        // ユーザ登録
        const regsitResult = await app
            .post("/user/regist")
            .send({
                email: user.email,
                password: user.password,
                username: user.username
            });
        
        expect(regsitResult.status).to.eq(200);
        expect(regsitResult.body).has.keys(["userId"]);

        // ログイン
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        
        expect(loginResult.status).to.eq(200);
        expect(loginResult.body).has.keys(["result", "userId", "email", "username", "token"]);
        expect(loginResult.body.result).eq(true);
        
        // ログイン状態になったかどうかの確認
        const isLoginResult = await app
            .get("/auth/isLogined")
            .set("Authorization", loginResult.body.token);
        expect(isLoginResult.status).to.eq(200);
        expect(isLoginResult.body).has.keys(["result"]);
        expect(isLoginResult.body.result).eq(true);

    });

    it("存在しないユーザ", async()=>{
        const user = testdata.users.undefined_user;
        // ログイン => 登録していないため、失敗する
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        
        expect(loginResult.status).to.eq(400);
        expect(loginResult.body).include.keys(["result"]);
        expect(loginResult.body.result).to.eq(false);
        
        // ログイン状態になったかどうかの確認
        const isLoginResult = await app
            .get("/auth/isLogined");
        expect(isLoginResult.status).to.eq(200);
        expect(isLoginResult.body).include.keys(["result"]);
        expect(isLoginResult.body.result).eq(false);
    })

    it("パスワードが異なるユーザ", async()=>{
        const user = testdata.users.incorrect_password;

        // ユーザ登録
        const regsitResult = await app
            .post("/user/regist")
            .send({
                email: user.email,
                password: user.password,
                username: user.username
            });
        
        expect(regsitResult.status).to.eq(200);
        expect(regsitResult.body).has.keys(["userId"]);

        // ログイン
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password:  user.password.split("").reverse().join("")
            });
        expect(loginResult.status).to.eq(401);
        expect(loginResult.body).include.keys(["result"]);
        expect(loginResult.body.result).to.eq(false);
        
        // ログイン状態になったかどうかの確認
        const isLoginResult = await app
            .get("/auth/isLogined");
        expect(isLoginResult.status).to.eq(200);
        expect(isLoginResult.body).include.keys(["result"]);
        expect(isLoginResult.body.result).eq(false);
        
    })
})


