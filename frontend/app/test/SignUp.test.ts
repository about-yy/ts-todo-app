import { render } from "@testing-library/vue";
import SignUpPageVue from "../src/views/SignUpPage.vue";

describe("LoginForm", () => {
  describe("画面表示", async () => {
    it("会員登録フォームが表示されている", async () => {
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
    // it("会員登録ボタンが表示されている");
    // it("会員登録ページへのリンクが表示されている");
    // it("ログインページへのリンクが表示されている");
  });

  // describe("会員登録できるパターン", async () => {
  //   const screen = render(SignUpPageVue);
  //   it("全ての入力欄が正常");
  // });

  // describe("会員登録できないパターン", async () => {
  //   it("値が空の場合、会員登録できない");
  //   it("確認用パスワードが異なる場合、APIが実行されない");
  //   it("不正な値が入力されている場合、会員登録できない");
  // });
});
