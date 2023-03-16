import { render, fireEvent } from "@testing-library/vue";
import { expect, Mocked, vi } from "vitest";
import LoginForm from "../src/views/LoginPage.vue";
import "@testing-library/jest-dom";
import axios from "axios";
vi.mock("axios");

const mockedAxios = axios as Mocked<typeof axios>;

describe("LoginForm", () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
  });

  it("ログインできる", async () => {
    const { getByLabelText, getByRole } = render(LoginForm);

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

  it("フォームが空の場合、ログインできない", async () => {
    const { getByRole, findByText } = render(LoginForm);

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
    const { getByLabelText, getByRole, findByText } = render(LoginForm);

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
