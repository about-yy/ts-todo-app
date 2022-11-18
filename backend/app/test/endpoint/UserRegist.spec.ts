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
                name: "coder-yamada",
            });
        expect(response.status).to.equal(200);
        expect(response.body).has.key("id");
        expect({id: "111"}).has.key("id");
    })
    it("ログイン", async () => {
        const response = await app
            .post("/auth/login")
            .send({
                email: "about-yy@gmail.com@gmail.com",
                password: "Hao8Nadew"
            });

        expect(response.status).to.equal(200);
        expect(response.body).has.key("result");
        expect(response.body.result).to.equal(true);

        expect(response.body).has.key("id");
        expect(response.body).has.key("name");
        expect(response.body.name).to.be("coder-yamada");
        expect(typeof response.body.id).to.equal(Number);
        
    })
})

