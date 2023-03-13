<template>
  <v-card class="signup-form" title="ユーザ登録 | TS TODO APP">
    <div class="navigation">
      <router-link to="/"> ユーザ登録 </router-link> /
      <router-link :is="'span'" to="/login"> ログイン </router-link>
    </div>
    <v-container>
      <ErrorMessage
        v-if="signupFormState.isFailed"
        message="ユーザ登録に失敗しました。入力内容を確認してください。"
      />
      <v-form v-model="signupFormState.form" @submit.prevent="onSubmit">
        <v-text-field
          id="email"
          v-model="signupForm.email"
          label="メールアドレス"
          :readonly="signupFormState.loading"
          :rules="[requiredValidation]"
          clearable
          class="text-input"
        />
        <v-text-field
          id="username"
          v-model="signupForm.username"
          label="ユーザー名"
          :readonly="signupFormState.loading"
          :rules="[requiredValidation]"
          clearable
          class="text-input"
        />
        <v-text-field
          id="password"
          v-model="signupForm.password"
          label="パスワード"
          :readonly="signupFormState.loading"
          :rules="[requiredValidation]"
          clearable
          type="password"
          class="text-input"
        />
        <v-text-field
          id="password_confirm"
          v-model="signupForm.password_confirm"
          label="パスワード（確認用）"
          :readonly="signupFormState.loading"
          :rules="[requiredValidation]"
          clearable
          type="password"
          class="text-input"
        />
        <v-btn
          type="submit"
          class="submit-btn"
          :loading="signupFormState.loading"
          :disabled="!signupFormState.form"
          variant="flat"
          color="primary"
        >
          登録
        </v-btn>
      </v-form>
    </v-container>
  </v-card>
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
      form: false,
      isFailed: false,
    });

    const onSubmit = async () => {
      if (!signupFormState.form) return;
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
<style scoped>
.signup-form {
  margin: 20px;
  padding: 40px;
}
.signup-form .submit-btn {
  display: block;
  margin: auto;
}
.navigation {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-block;
}
</style>
