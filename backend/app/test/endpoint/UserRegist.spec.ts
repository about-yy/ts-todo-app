// ユーザ登録テスト
import testdata from "./user.testdata.json";
import index from "../../src/index";
import supertest from "supertest";
import { expect } from "chai";

const app = supertest(index);
describe("ユーザ登録テスト", async ()=>{
    it("新規登録", async()=>{
        const user = testdata.users.new;
        // ユーザ登録
        const registResult = await app
            .post("/user/regist")
            .send({
                email: user.email,
                password: user.password,
                username: user.username
            });
        expect(registResult.status).to.equal(200)
        expect(registResult.body).has.key("userId")

        // ログインして存在確認
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.equal(200);
        expect(loginResult.body).has.keys(["result", "userId", "email", "username"])
        expect(loginResult.body.result).to.equal(true);
        expect(loginResult.body.email).to.equal(user.email)
        expect(loginResult.body.username).to.equal(user.username)
        expect(loginResult.body.userId).to.equal(registResult.body.userId)

        // // 不要なので削除
        // const deleteResult = await app
        //     .post("/user/delete")
        //     .send({
        //         email: user.email,
        //         password: user.password,
        //         confirm: true
        //     });
        // expect(deleteResult.status).to.equal(200);
        // expect(deleteResult.body.result).to.equal(true);
    })
    it("二重登録", async()=>{
        const user = testdata.users.duplicate;
        // ユーザ登録
        const registResult = await app
        .post("/user/regist")
        .send({
            email: user.email,
            password: user.password,
            username: user.username
        });
        expect(registResult.status).to.equal(200)
        expect(registResult.body).has.key("userId")

        // ログインして存在確認
        const loginResult = await app
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password
            });
        expect(loginResult.status).to.equal(200);
        expect(loginResult.body).has.keys(["result", "userId", "email", "username"])
        expect(loginResult.body.result).to.equal(true);
        expect(loginResult.body.email).to.equal(user.email)
        expect(loginResult.body.username).to.equal(user.username)
        expect(loginResult.body.userId).to.equal(registResult.body.userId)

        // ユーザ登録（失敗する）
        const reRegistResult = await app
        .post("/user/regist")
        .send({
            email: user.email,
            password: user.password,
            username: user.username
        });
        expect(reRegistResult.status).to.equal(409) // conflict
        expect(reRegistResult.body).has.not.key("userId")
    })

    // it("削除済みユーザ再登録", async()=>{ // 新しいIDになること
    //     const user = testdata.users.deleted;
    //     // ユーザ登録
    //     const registResult = await app
    //     .post("/user/regist")
    //     .send({
    //         email: user.email,
    //         password: user.password,
    //         username: user.username
    //     });
    //     expect(registResult.status).to.equal(200)
    //     expect(registResult.body).has.key("userId")

    //     // ログインして存在確認
    //     const loginResult = await app
    //         .post("/auth/login")
    //         .send({
    //             email: user.email,
    //             password: user.password
    //         });
    //     expect(loginResult.status).to.equal(200);
    //     expect(loginResult.body).has.keys(["result", "userId", "email", "username"])
    //     expect(loginResult.body.result).to.equal(true);
    //     expect(loginResult.body.email).to.equal(user.email)
    //     expect(loginResult.body.username).to.equal(user.username)
    //     expect(loginResult.body.userId).to.equal(registResult.body.userId)

    //     // 一度削除する
    //     const deleteResult = await app
    //         .post("/user/delete")
    //         .send({
    //             email: user.email,
    //             password: user.password,
    //             confirm: true
    //         });
    //     expect(deleteResult.status).to.equal(200);
    //     expect(deleteResult.body.result).to.equal(true);

    //     // 削除後のログインはできない
    //     const deletedLoginResult = await app
    //         .post("/auth/login")
    //         .send({
    //             email: user.email,
    //             password: user.password
    //         });
    //     expect(deletedLoginResult.status).to.equal(404);
    //     expect(deletedLoginResult.body).has.keys(["result"]);
    //     expect(deletedLoginResult.body.result).to.equal(false);

    //     // ユーザ登録 (削除後)
    //     const reRegistResult = await app
    //     .post("/user/regist")
    //     .send({
    //         email: user.email,
    //         password: user.password,
    //         username: user.username
    //     });
    //     expect(reRegistResult.status).to.equal(200);
    //     expect(reRegistResult.body).has.key("userId");

    //     // ログインして存在確認 => 新しいIDになっている
    //     const reLoginResult = await app
    //         .post("/auth/login")
    //         .send({
    //             email: user.email,
    //             password: user.password
    //         });
    //     expect(reLoginResult.status).to.equal(200);
    //     expect(reLoginResult.body).has.keys(["result", "userId", "email", "username"]);
    //     expect(reLoginResult.body.result).to.equal(true);
    //     expect(reLoginResult.body.email).to.equal(user.email);
    //     expect(reLoginResult.body.username).to.equal(user.username);
    //     expect(reLoginResult.body.userId).to.equal(registResult.body.userId);

    //     expect(loginResult.body.userId).not.equal(reLoginResult.body.userId);

    // })
    it("不正な入力値", async()=>{
        const user = testdata.users.invalid;
        // ユーザ登録
        const registResult = await app
        .post("/user/regist")
        .send({
        });
        expect(registResult.status).to.equal(400)
    })
})