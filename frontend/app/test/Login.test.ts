import { render, fireEvent } from "@testing-library/vue";
import { Mocked, vi } from "vitest";
import LoginForm from "../src/views/LoginPage.vue";
import "@testing-library/jest-dom";
import axios from "axios";
vi.mock("axios");

const mockedAxios = axios as Mocked<typeof axios>;

describe("LoginForm", () => {
  beforeEach(() => {
    mockedAxios.post.mockReset();
  });

  it("フォームが空のまま送信された場合、エラーメッセージが表示される", async () => {
    const { getByRole, findByText } = render(LoginForm);
    // 空のフォームを送信
    const form = getByRole("form");
    expect(form).toBeTruthy();
    await fireEvent.submit(form);
    expect(
      await findByText(
        "メールアドレス、またはパスワードに誤りがあります。入力内容を確認してください。"
      )
    ).toBeInTheDocument();

    // フォームが実行されたことを確認
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });

  it("メールアドレスとパスワードが有効な場合、フォームが送信される", async () => {
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
  });
});
