<template>
    <v-card class="signup-form" title="ユーザ登録|TS TODO APP">
        <v-container>
            <v-text-field id="email" clearable class="text-input" label="メールアドレス"></v-text-field>
            <v-text-field id="username" clearable class="text-input" label="ユーザー名"></v-text-field>
            <v-text-field id="password" clearable class="text-input" label="パスワード"></v-text-field>
            <v-text-field id="password_confirm" clearable class="text-input" label="パスワード（確認用）"></v-text-field>
        </v-container>
        <v-btn type="submit" class="submit-btn" variant="flat" color="primary">登録</v-btn>
    </v-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
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
