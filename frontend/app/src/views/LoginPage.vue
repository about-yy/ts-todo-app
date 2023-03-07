<template>
    <v-card class="login-form" title="ログイン | TS TODO APP">
        <div class="navigation">
            <router-link to="/">ユーザ登録</router-link> / <router-link :is="'span'" to="/login">ログイン</router-link>
         </div>
        <v-container>
            <ErrorMessage v-if="loginFormState.isFailed" message="メールアドレス、またはパスワードに誤りがあります。入力内容を確認してください。"></ErrorMessage>
            <v-form v-model="loginFormState.form" @submit.prevent="onSubmit">
                <v-text-field label="メールアドレス" v-model="loginForm.email" id="email" :readonly="loginFormState.loading" :rules="[requiredValidation]" clearable class="text-input" ></v-text-field>
                <v-text-field label="パスワード" v-model="loginForm.password" id="password" :readonly="loginFormState.loading" :rules="[requiredValidation]" clearable type="password" class="text-input" ></v-text-field>
                <v-btn type="submit" class="submit-btn" :loading="loginFormState.loading" :disabled="!loginFormState.form" variant="flat" color="primary" >ログイン</v-btn>
            </v-form>
        </v-container>
    </v-card>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router';
import AxiosUtil from '../utils/AxiosUtil';
import ErrorMessage from '../components/ErrorMessage.vue';
import { useStore } from '../app/store';
import * as ActionTypes from '../app/ActionTypes';

export default defineComponent({
    components: {
        ErrorMessage
    },  
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

        const onSubmit = async ()=>{
            if(!loginFormState.form) return;
            loginFormState.loading = true;

            login(loginForm.email, loginForm.password)
                .then((res)=>{
                    loginFormState.isFailed = false
                    moveToTaskPage();
                })
                .catch((e)=>{loginFormState.isFailed = true})
                .finally(()=>{loginFormState.loading = false});
        
        }

        const login = async(email: string, password: string)=>{
            const result = await AxiosUtil.post("/auth/login", {
                email: email,
                password: password
            }).then((res)=>{
                store.dispatch(ActionTypes.SET_ACCESS_TOKEN, res.headers.authorization);
            })
            return result;
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
<style lang="scss" scoped>
.login-form {
    margin: 20px;
    padding: 40px;
    color: $color_text;
}
.login-form .submit-btn {
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
