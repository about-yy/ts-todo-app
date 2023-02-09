import { expect } from "chai";
import supertest from "supertest";
import index from "../../src/index";
import testdata from "./authLogout.testdata.json";

const app = supertest(index);
describe("ログアウト機能のテスト", async()=>{
    it("ログアウト", async()=>{
        const user = testdata.users.correct;
        const registResult = await app.post("/user/regist")
            .send({
                email: user.email,
                password: user.password,
                username: user.username
            });
        expect(registResult.status).to.eq(200);
        
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.eq(200);
        
        const isLoginedResult = await app
            .get("/auth/isLogined")
            .set("Authorization", loginResult.headers.authorization);
        expect(isLoginedResult.status).to.eq(200);

        const logoutResult = await app
            .post("/auth/logout");
        expect(logoutResult.status).to.eq(200);
        const reLoginedResult = await app
            .get("/auth/isLogined");
        expect(reLoginedResult.status).to.eq(401);



    })
})