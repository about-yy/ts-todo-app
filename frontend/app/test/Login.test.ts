import { render, fireEvent } from "@testing-library/vue";
import { Mocked, vi } from "vitest";
import LoginForm from "../src/views/LoginPage.vue";
import "@testing-library/jest-dom";
import axios from "axios";

describe("LoginForm", () => {
  it("フォームが空のまま送信された場合、エラーメッセージが表示される", async () => {
    const { getByRole, findByText } = render(LoginForm);

    // Submit form with empty fields
    const form = getByRole("form");
    expect(form).toBeTruthy();
    await fireEvent.submit(form);
    expect(
      await findByText(
        "メールアドレス、またはパスワードに誤りがあります。入力内容を確認してください。"
      )
    ).toBeInTheDocument();
  });

  it("メールアドレスとパスワードが有効な場合、フォームが送信される", async () => {
    const { getByLabelText, getByRole } = render(LoginForm);

    // Enter email and password
    const emailInput = getByLabelText("メールアドレス");
    const passwordInput = getByLabelText("パスワード");
    await fireEvent.update(emailInput, "test@example.com");
    await fireEvent.update(passwordInput, "password");

    // Submit form
    const form = getByRole("form");
    await fireEvent.submit(form);

    // Check that form was submitted
    vi.mock("axios");
    const mockedAxios = axios as Mocked<typeof axios>;
    expect(mockedAxios.post).toHaveBeenCalledTimes(2);
  });
});
