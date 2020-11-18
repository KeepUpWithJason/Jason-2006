import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login";
import Home from "../pages/Home"

Vue.use(VueRouter);

import allRoutes from "../router/allroutes"
const routes = [{
    path: "/login",
    component: Login
  },
  {
    path: "/",
    component:Home,
    children: allRoutes
  }
];

const router = new VueRouter({
  routes
});

export default router;