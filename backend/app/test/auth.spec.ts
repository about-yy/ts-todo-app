import { expect } from "chai";
import supertest from "supertest";
import index from "../src/index";
const app =  supertest(index);
describe("supertest sample", ()=>{
    it("get isLogined", async ()=>{
        const response = await app.get("/auth/isLogined");
        expect(response.status).to.equal(200);
        expect(response.text).to.equal("isLogined api");
    });
    it("post login", async ()=>{
        // const response = await app.post("/auth/login");
        // expect(response.status).to.equal(200);
        // expect(response.text).to.equal("login api");
    });
    it("post logout", async ()=>{
        const response = await app.post("/auth/logout");
        expect(response.status).to.equal(200);
        expect(response.text).to.equal("logout api");
    });
});