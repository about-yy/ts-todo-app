import { fireEvent, render } from "@testing-library/vue";
import axios from "axios";
import { Mocked } from "vitest";
import SignUpPageVue from "../src/views/SignUpPage.vue";

const mockedAxios = axios as Mocked<typeof axios>;
vi.mock("axios");

describe("ユーザ登録ページ", () => {
  beforeEach(async () => {
    vi.resetAllMocks();
  });
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
      expect(screen.getByRole("button", { name: "登録" })).toBeTruthy();
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

  describe("ユーザ登録できるパターン", async () => {
    it("全ての入力欄が正常", async () => {
      const inputs = {
        email: "yamada@google.com.com",
        username: "username",
        password: "password",
        password_check: "password",
      };

      const screen = render(SignUpPageVue);

      // メールアドレスとパスワードを入力
      const emailInput = screen.getByLabelText("メールアドレス");
      const usernameInput = screen.getByLabelText("ユーザー名");
      const passwordInput = screen.getByLabelText("パスワード");
      const passwordCheckInput = screen.getByLabelText("パスワード（確認用）");
      await fireEvent.update(emailInput, inputs.email);
      await fireEvent.update(usernameInput, inputs.username);
      await fireEvent.update(passwordInput, inputs.password);
      await fireEvent.update(passwordCheckInput, inputs.password_check);
      expect(emailInput).toHaveValue(inputs.email);
      expect(usernameInput).toHaveValue(inputs.username);
      expect(passwordInput).toHaveValue(inputs.password);
      expect(passwordCheckInput).toHaveValue(inputs.password_check);
      // フォームを送信
      const form = screen.getByRole("form");
      await fireEvent.submit(form);

      // フォームが実行されたことを確認
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.VITE_BACKEND_DOMAIN}/user/regist`,
        {
          email: inputs.email,
          username: inputs.username,
          password: inputs.password,
        },
        undefined
      );
    });
  });

  describe("ユーザ登録できないパターン", async () => {
    it("値が空の場合、ユーザ登録できない", async () => {
      const screen = render(SignUpPageVue);
      // メールアドレスとパスワードを入力
      const emailInput = screen.getByLabelText("メールアドレス");
      const usernameInput = screen.getByLabelText("ユーザー名");
      const passwordInput = screen.getByLabelText("パスワード");
      const passwordCheckInput = screen.getByLabelText("パスワード（確認用）");
      expect(emailInput).toHaveValue("");
      expect(usernameInput).toHaveValue("");
      expect(passwordInput).toHaveValue("");
      expect(passwordCheckInput).toHaveValue("");
      // フォームを送信
      const form = screen.getByRole("form");
      await fireEvent.submit(form);

      // フォームが実行されたことを確認
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.VITE_BACKEND_DOMAIN}/user/regist`,
        {
          email: "",
          username: "",
          password: "",
        },
        undefined
      );
      expect(
        await screen
          .findByText("ユーザ登録に失敗しました。入力内容を確認してください。")
          .then(() => true)
          .catch(() => false)
      ).eq(true);
    });
    it("確認用パスワードが異なる場合、APIが実行されない");
    it("不正な値が入力されている場合、ユーザ登録できない");
  });
});
