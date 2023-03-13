// import { render, fireEvent } from '@testing-library/vue'
// import LoginForm from '../src/views/LoginPage.vue'
// import {describe, expect, test} from "vitest";
// import _JestDom from "@testing-library/jest-dom";
// import vuetify from '../src/plugins/vuetify';
// import { createLocalVue } from "@vue/test-utils";

// (global as any).CSS = {supports: ()=>false};

// describe('LoginForm', () => {
//   test("sample", async()=>{
//     const localVue = createLocalVue()
//   })

//   test('renders form elements', async () => {
//     // `render`関数を使用してコンポーネントをレンダリング
//     const { getByLabelText, getByRole } = render(LoginForm, {
//       global: {
//         plugins: [vuetify]
//       }
//     })

//     // フォーム要素が存在することを確認
//     expect(getByRole('form')).toBeInTheDocument()

//     // ラベル要素が存在することを確認
//     expect(getByLabelText('メールアドレス')).toBeInTheDocument()
//     expect(getByLabelText('パスワード')).toBeInTheDocument()

//     // ボタン要素が存在することを確認
//     expect(getByRole('button', { name: 'ログイン' })).toBeInTheDocument()
//   })

//   test('submits form when button is clicked', async () => {
//     const mockOnSubmit = jest.fn()
//     const { getByLabelText, getByRole } = render(LoginForm, {
//       global: {
//         mocks: {
//           onSubmit: mockOnSubmit,
//         },
//       },
//     })

//     // 入力フォームに値を設定する
//     const emailInput = getByLabelText('メールアドレス')
//     const passwordInput = getByLabelText('パスワード')
//     await fireEvent.update(emailInput, 'test@example.com')
//     await fireEvent.update(passwordInput, 'password')

//     // フォームがサブミットされたときに、`onSubmit`関数が呼び出されることを確認する
//     const submitButton = getByRole('button', { name: 'ログイン' })
//     await fireEvent.click(submitButton)
//     expect(mockOnSubmit).toHaveBeenCalled()
//   })
// })
