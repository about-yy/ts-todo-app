<template>
    <v-card class="signup-form" title="ユーザ登録 | TS TODO APP">
        <v-container>
            <ErrorMessage v-if="loginFormState.isFailed" message="ユーザ登録に失敗しました。入力内容を確認してください。"></ErrorMessage>
            <v-form v-model="loginFormState.form" @submit.prevent="onSubmit">
                <v-text-field label="メールアドレス" v-model="loginForm.email" id="email" :readonly="loginFormState.loading" :rules="[requiredValidation]" clearable class="text-input" ></v-text-field>
                <v-text-field label="ユーザー名" v-model="loginForm.username" id="username" :readonly="loginFormState.loading" :rules="[requiredValidation]" clearable class="text-input" ></v-text-field>
                <v-text-field label="パスワード" v-model="loginForm.password" id="password" :readonly="loginFormState.loading" :rules="[requiredValidation]" clearable type="password" class="text-input" ></v-text-field>
                <v-text-field label="パスワード（確認用）" v-model="loginForm.password_confirm" id="password_confirm" :readonly="loginFormState.loading" :rules="[requiredValidation]" clearable type="password" class="text-input" ></v-text-field>
                <v-btn type="submit" class="submit-btn" :loading="loginFormState.loading" :disabled="!loginFormState.form" variant="flat" color="primary" >登録</v-btn>
            </v-form>
        </v-container>
    </v-card>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router';
import AxiosUtil from '../utils/AxiosUtil';
import ErrorMessage from '../components/ErrorMessage.vue';

export default defineComponent({
    components: {
        ErrorMessage
    },  
    setup() {
        const router = useRouter();

        const loginForm = reactive({
            email: "",
            username: "",
            password: "",
            password_confirm: "",
        });
        const loginFormState = reactive({
            loading: false,
            form: false,
            isFailed: false,
        });
        const onSubmit = async ()=>{
            if(!loginFormState.form) return;
            if(loginForm.password !== loginForm.password_confirm) return;
            loginFormState.loading = true;

            const result = AxiosUtil.post("/user/regist", {
                email: loginForm.email,
                username: loginForm.username,
                password: loginForm.password
            }).then((res)=>{
                // タスクページへ遷移
                if(res.status === 200){
                    loginFormState.isFailed = false;
                    moveToTaskPage();
                } else {
                    // エラーメッセージを表示
                    loginFormState.isFailed = true;
                }
            }).catch(error=>{
                // エラーメッセージを表示
                loginFormState.isFailed = true;
            }).finally(()=>{
                // 状態を初期化
                loginFormState.loading = false;
            })

        }
        const moveToTaskPage = ()=>{
            router.push({name: "app"});
        }
        const requiredValidation = (value: any)=>{
            return !!value||"required";
        }
        return {
            loginForm,
            loginFormState,
            requiredValidation,
            onSubmit
        }
    },
})
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
</style>
