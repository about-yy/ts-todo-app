import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {path: "/", name: "index", component: ()=>import("../components/SignUpPage.vue")},
    {path: "/login", name: "login", component: ()=>import("../components/LoginPage.vue")},
    {path: "/application", name:"app", component: ()=>import("../components/App.vue")}
];
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;