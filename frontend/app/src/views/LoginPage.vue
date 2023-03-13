<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-card-title">
        ログイン | TS TODO APP
      </h2>
      <form class="login-form">
        <div class="login-field">
          <label for="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            name="email"
          >
        </div>

        <div class="login-field">
          <label for="password">パスワード</label>
          <input
            id="password"
            type="password"
            name="password"
          >
        </div>

        <div class="login-action">
          <button
            class="login-button flat"
            type="submit"
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import AxiosUtil from "../utils/AxiosUtil";
import { useStore } from "../app/store";
import * as ActionTypes from "../app/ActionTypes";

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const loginForm = reactive({
      email: "",
      password: "",
    });
    const loginFormState = reactive({
      loading: false,
      form: false,
      isFailed: false,
    });

    const onSubmit = async () => {
      if (!loginFormState.form) return;
      loginFormState.loading = true;

      login(loginForm.email, loginForm.password)
        .then((_res) => {
          loginFormState.isFailed = false;
          moveToTaskPage();
        })
        .catch((_e) => {
          loginFormState.isFailed = true;
        })
        .finally(() => {
          loginFormState.loading = false;
        });
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
      loginForm,
      loginFormState,
      requiredValidation,
      onSubmit,
    };
  },
});
</script>
<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.login-card {
  border-radius: 1em;
  border: #ddd solid 1px;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 10%;
  padding: 1em 10% 3em 10%;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.login-field {
  margin-bottom: 16px;

  label {
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #3c4858;
    display: block;
  }

  input {
    padding: 8px 12px;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #d2d2d2;
    font-size: 1.2rem;
    color: #3c4858;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f5f5f5;

    &:focus {
      outline: none;
      border-color: #4d90fe;
      box-shadow: 0 0 0 2px rgba(77, 144, 254, 0.2);
    }
  }
}

.login-action {
  margin-top: 16px;

  .login-button.material {
    display: block;
    margin: 0 auto;
    padding: 12px 24px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    background-color: #2196f3;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    &:hover {
      background-color: #0c7cd5;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 1px 8px -2px rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
  }
  .login-button.flat {
    display: block;
    width: 200px;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #3498db;
    color: #fff;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: #2980b9;
    }
  }
}
</style>
