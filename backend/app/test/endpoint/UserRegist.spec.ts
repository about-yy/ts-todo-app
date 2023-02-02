import { expect } from "chai";
import supertest from "supertest";
import index from "../../src/index";

const app = supertest(index);
describe("ユーザ登録API", () => {
    it("登録", async () => {
        const response = await app
            .post("/user/regist")
            .send({
                email: "about-yy@gmail.com@gmail.com",
                password: "Hao8Nadew",
                username: "coder-yamada",
            });
        expect(response.status).to.equal(200);
        expect(response.body).has.key("userId");
        expect(response.body.userId).to.equal(Number(1).toLocaleString());
    })
    it("ログイン", async () => {
        const response = await app
            .post("/auth/login")
            .send({
                email: "about-yy@gmail.com@gmail.com",
                password: "Hao8Nadew"
            });

        expect(response.status).to.equal(200);
        expect(response.body).has.keys(["result", "userId", "email", "username"]);
        expect(response.body.result).to.equal(true);
        expect(response.body.email).to.equal("about-yy@gmail.com@gmail.com");
        expect(response.body.username).to.equal("coder-yamada");
        expect(response.body.userId).to.equal(Number(1).toLocaleString());
        
    })
})

