/*
 * @Date: 2021-01-13 11:27:42
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login/login.vue";
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/market",
    name: "Market",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/market/market.vue")
  },
  {
    path: "/center",
    name: "Center",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/center/center.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
