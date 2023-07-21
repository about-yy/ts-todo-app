/**
 * ログインページのテスト
 */
import { render, fireEvent } from "@testing-library/vue";
import LoginPage from "../src/views/LoginPage.vue";
import axios from "axios";
import { Mocked } from "vitest";
vi.mock("axios");

const mockedAxios = axios as Mocked<typeof axios>;

describe("ログインページ", () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
  });

  /**
   * 画面表示のテスト
   */
  describe("画面表示", async () => {
    it("ログインフォームが表示されている", async () => {
      const screen = render(LoginPage);
      expect(screen.getByRole("form")).toBeTruthy();
    });
    it("メールアドレスの入力欄が表示されている", async () => {
      const screen = render(LoginPage);
      expect(screen.getByLabelText("メールアドレス")).toBeTruthy();
    });
    it("パスワードの入力欄が表示されている", async () => {
      const screen = render(LoginPage);
      expect(screen.getByLabelText("パスワード")).toBeTruthy();
    });
    it("ログインボタンが表示されている", async () => {
      const screen = render(LoginPage);
      expect(screen.getByRole("button", { name: "ログイン" })).toBeTruthy();
    });
    it("ユーザ登録ページへのリンクが表示されている", async () => {
      const screen = render(LoginPage);
      expect(
        screen.getByText("ユーザ登録", { selector: "router-link" })
      ).toBeTruthy();
    });
    it("ログインページへのリンクが表示されている", async () => {
      const screen = render(LoginPage);
      expect(
        screen.getByText("ログイン", { selector: "router-link" })
      ).toBeTruthy();
    });
  });

  /**
   * 機能テスト
   */
  describe("ログインできるパターン", async () => {
    it("ログインできる", async () => {
      const { getByLabelText, getByRole } = render(LoginPage);

      // メールアドレスとパスワードを入力
      const emailInput = getByLabelText("メールアドレス");
      const passwordInput = getByLabelText("パスワード");
      await fireEvent.update(emailInput, "test@example.com");
      await fireEvent.update(passwordInput, "password");

      // フォームを送信
      const form = getByRole("form");
      await fireEvent.submit(form);

      // フォームが実行されたことを確認
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.VITE_BACKEND_DOMAIN}/auth/login`,
        { email: "test@example.com", password: "password" },
        undefined
      );
    });
  });

  describe("ログインできないパターン", async () => {
    it("フォームが空の場合、ログインできない", async () => {
      const { getByRole, findByText } = render(LoginPage);

      // フォームを送信
      const form = getByRole("form");
      await fireEvent.submit(form);

      // フォームが実行されたことを確認
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.VITE_BACKEND_DOMAIN}/auth/login`,
        { email: "", password: "" },
        undefined
      );
      // エラーメッセージが表示されることを確認
      expect(
        await findByText(
          "メールアドレス、またはパスワードに誤りがあります。入力内容を確認してください。"
        )
      ).toBeInTheDocument();
    });

    it("フォームに不正な値が入力されている場合、ログインできない", async () => {
      const { getByLabelText, getByRole, findByText } = render(LoginPage);

      // メールアドレスとパスワードを入力
      const emailInput = getByLabelText("メールアドレス");
      const passwordInput = getByLabelText("パスワード");
      await fireEvent.update(emailInput, "example.com");
      await fireEvent.update(passwordInput, "password");

      // フォームを送信
      const form = getByRole("form");
      await fireEvent.submit(form);

      // フォームが実行されたことを確認
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${process.env.VITE_BACKEND_DOMAIN}/auth/login`,
        { email: "example.com", password: "password" },
        undefined
      );
      // エラーメッセージが表示されることを確認
      expect(
        await findByText(
          "メールアドレス、またはパスワードに誤りがあります。入力内容を確認してください。"
        )
      ).toBeInTheDocument();
    });
  });
});
