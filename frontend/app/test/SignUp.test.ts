import { render } from "@testing-library/vue";
import SignUpPageVue from "../src/views/SignUpPage.vue";

describe("LoginForm", () => {
  describe("画面表示", async () => {
    it("ユーザ登録フォームが表示されている", async () => {
      const { getByRole } = render(SignUpPageVue);
      expect(getByRole("form")).toBeTruthy();
    });
    it("メールアドレスの入力欄が表示されている", async () => {
      const { getByLabelText } = render(SignUpPageVue);
      expect(getByLabelText("メールアドレス")).toBeTruthy();
    });
    it("ユーザー名の入力欄が表示されている", async () => {
      const { getByLabelText } = render(SignUpPageVue);
      expect(getByLabelText("ユーザー名")).toBeTruthy();
    });
    it("パスワードの入力欄が表示されている", async () => {
      const { getByLabelText } = render(SignUpPageVue);
      expect(getByLabelText("パスワード")).toBeTruthy();
    });
    it("パスワード（確認用）の入力欄が表示されている", async () => {
      const { getByLabelText } = render(SignUpPageVue);
      expect(getByLabelText("パスワード（確認用）")).toBeTruthy();
    });
    it("ユーザ登録ボタンが表示されている", async () => {
      const screen = render(SignUpPageVue);
      expect(screen.getByRole("button", { name: "ユーザ登録" })).toBeTruthy();
    });
    it("ユーザ登録ページへのリンクが表示されている", async () => {
      const screen = render(SignUpPageVue);
      expect(
        screen.getByText("ユーザ登録", { selector: "router-link" })
      ).toBeTruthy();
    });
    it("ログインページへのリンクが表示されている", async () => {
      const screen = render(SignUpPageVue);
      expect(
        screen.getByText("ログイン", { selector: "router-link" })
      ).toBeTruthy();
    });
  });

  // describe("ユーザ登録できるパターン", async () => {
  //   const screen = render(SignUpPageVue);
  //   it("全ての入力欄が正常");
  // });

  // describe("ユーザ登録できないパターン", async () => {
  //   it("値が空の場合、ユーザ登録できない");
  //   it("確認用パスワードが異なる場合、APIが実行されない");
  //   it("不正な値が入力されている場合、ユーザ登録できない");
  // });
});
