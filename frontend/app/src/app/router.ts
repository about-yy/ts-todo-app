import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {path: "/", name: "index", component: ()=>import("../views/SignUpPage.vue")},
    {path: "/login", name: "login", component: ()=>import("../views/LoginPage.vue")},
    {path: "/application", name:"app", component: ()=>import("../views/TaskPage.vue")}
];
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;