import { mount } from '@vue/test-utils';
import { describe, expect } from 'vitest'
import LoginPage from '../src/views/LoginPage.vue';

describe('ログインページ', () => {
  const wrapper = mount(LoginPage)

  // フォームが存在することを確認
  expect(wrapper.find('form').exists()).toBe(true)

  // フォームに値を設定
  wrapper.find('#username').setValue('username')
  wrapper.find('#password').setValue('password')

  // ログインボタンをクリック
  wrapper.find('button[type="submit"]').trigger('click')

  // ログインに成功したことを確認
  expect(wrapper.text()).toContain('ログインに成功しました')
})
