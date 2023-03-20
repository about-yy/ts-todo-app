<template>
  <div class="signup-container">
    <div class="signup-card">
      <h2 class="signup-card-title">ログイン | TS TODO APP</h2>
      <div class="navigation">
        <router-link to="/"> ユーザ登録 </router-link> /
        <router-link :is="'span'" to="/signup"> ログイン </router-link>
      </div>
      <ErrorMessage
        v-if="signupFormState.isFailed"
        message="ユーザ登録に失敗しました。入力内容を確認してください。"
      />
      <form class="signup-form" role="form" @submit.prevent="onSubmit">
        <div class="signup-field">
          <label for="email">メールアドレス</label>
          <input
            id="email"
            v-model="signupForm.email"
            :readonly="signupFormState.loading"
            required
            type="email"
            name="email"
          />
        </div>
        <div class="signup-field">
          <label for="username">ユーザー名</label>
          <input
            id="username"
            v-model="signupForm.username"
            :readonly="signupFormState.loading"
            required
            type="username"
            name="username"
          />
        </div>

        <div class="signup-field">
          <label for="password">パスワード</label>
          <input
            id="password"
            v-model="signupForm.password"
            :readonly="signupFormState.loading"
            required
            type="password"
            name="password"
            placeholder=""
          />
        </div>

        <div class="signup-field">
          <label for="password_confirm">パスワード（確認用）</label>
          <input
            id="password_confirm"
            v-model="signupForm.password_confirm"
            :readonly="signupFormState.loading"
            required
            type="password"
            name="password_confirm"
            placeholder=""
          />
        </div>

        <div class="signup-action">
          <button class="signup-button flat" type="submit">登録</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import AxiosUtil from "../utils/AxiosUtil";
import ErrorMessage from "../components/ErrorMessage.vue";
import { useStore } from "../app/store";
import * as ActionTypes from "../app/ActionTypes";

export default defineComponent({
  components: {
    ErrorMessage,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const signupForm = reactive({
      email: "",
      username: "",
      password: "",
      password_confirm: "",
    });
    const signupFormState = reactive({
      loading: false,
      isFailed: false,
    });

    const onSubmit = async () => {
      if (signupForm.password !== signupForm.password_confirm) return;
      signupFormState.loading = true;

      signup(signupForm.email, signupForm.username, signupForm.password)
        .then((_res) => login(signupForm.email, signupForm.password))
        .then((_res) => {
          signupFormState.isFailed = false;
          moveToTaskPage();
        })
        .catch((_e) => {
          signupFormState.isFailed = true;
        })
        .finally(() => {
          signupFormState.loading = false;
        });
    };
    const signup = async (
      email: string,
      username: string,
      password: string
    ) => {
      const result = await AxiosUtil.post("/user/regist", {
        email: email,
        username: username,
        password: password,
      });
      return result;
    };

    const login = async (email: string, password: string) => {
      const result = await AxiosUtil.post("/auth/login", {
        email: email,
        password: password,
      }).then((res) => {
        store.dispatch(ActionTypes.SET_ACCESS_TOKEN, res.headers.authorization);
      });
      return result;
    };

    const moveToTaskPage = () => {
      router.push({ name: "app" });
    };
    const requiredValidation = (value: any) => {
      return !!value || "required";
    };
    return {
      signupForm,
      signupFormState,
      requiredValidation,
      onSubmit,
    };
  },
});
</script>
<style lang="scss" scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.signup-card {
  position: relative;
  border-radius: 1em;
  border: #ddd solid 1px;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 10%;
  padding: 1em 10% 3em 10%;
}

.signup-form {
  display: flex;
  flex-direction: column;
}

.signup-field {
  margin-bottom: 16px;

  label {
    margin-bottom: 8px;
    font-size: 14px;
    color: $text-color;
    display: block;
  }

  input {
    padding: 8px 12px;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #d2d2d2;
    font-size: 1.2rem;
    color: $text-color;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f5f5f5;

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 2px rgba(77, 144, 254, 0.2);
    }
  }
}

.signup-action {
  margin-top: 16px;
  margin: auto;

  .signup-button.material {
    display: block;
    margin: 0 auto;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: $button-text-color;
    background-color: $primary-color;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    &:hover {
      background-color: lighten($primary-color, 10);
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 8px -2px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }
  .signup-button.flat {
    display: block;
    width: 200px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: $primary-color;
    color: $button-text-color;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    &:hover,
    &:focus {
      background-color: lighten($color: $primary-color, $amount: 10);
      outline: none;
    }

    &:active {
      background-color: darken($color: $primary-color, $amount: 10);
    }
  }
}

.navigation {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-block;
}
</style>
