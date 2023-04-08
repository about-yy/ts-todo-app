import { expect } from "chai";
import supertest from "supertest";
import index from "../../src/index";
import testdata from "./authIsLogined.testdata.json";

const app = supertest(index);
describe("ログインチェック機能のテスト", async () => {
  it("正常処理", async () => {
    const user = testdata.users.correct_token;
    const registResult = await app.post("/user/regist").send({
      email: user.email,
      password: user.password,
      username: user.username,
    });
    expect(registResult.status).to.eq(200);

    const loginResult = await app.post("/auth/login").send({
      email: user.email,
      password: user.password,
    });
    expect(loginResult.status).to.eq(200);

    const isLoginResult = await app
      .get("/auth/isLogined")
      .set("authorization", loginResult.headers.authorization);
    expect(isLoginResult.status).to.eq(200);
    expect(isLoginResult.body).has.keys(["result"]);
    expect(isLoginResult.body.result).to.eq(true);
  });

  it("トークン無し", async () => {
    const user = testdata.users.no_token;
    const registResult = await app.post("/user/regist").send({
      email: user.email,
      password: user.password,
      username: user.username,
    });
    expect(registResult.status).to.eq(200);

    const loginResult = await app.post("/auth/login").send({
      email: user.email,
      password: user.password,
    });
    expect(loginResult.status).to.eq(200);

    const isLoginResult = await app.get("/auth/isLogined");

    expect(isLoginResult.status).to.eq(401);
    expect(isLoginResult.body).include.keys(["result"]);
    expect(isLoginResult.body.result).to.eq(false);
  });

  it("不正なトークン", async () => {
    const user = testdata.users.invalid_token;
    const registResult = await app.post("/user/regist").send({
      email: user.email,
      password: user.password,
      username: user.username,
    });
    expect(registResult.status).to.eq(200);

    const loginResult = await app.post("/auth/login").send({
      email: user.email,
      password: user.password,
    });
    expect(loginResult.status).to.eq(200);

    const isLoginResult = await app
      .get("/auth/isLogined")
      .set(
        "authorization",
        loginResult.headers.authorization.split("").reverse().join("")
      );

    expect(isLoginResult.status).to.eq(401);
    expect(isLoginResult.body).include.keys(["result"]);
    expect(isLoginResult.body.result).to.eq(false);
  });

  // it("トークンの期限切れ", async (){
  //     @todo
  // });
});
