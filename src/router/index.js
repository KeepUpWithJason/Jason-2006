import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login";

Vue.use(VueRouter);

// import allRoutes from "../router/allroutes"
const routes = [{
    path: "/login",
    component: Login
  },
  // {
  //   path:"*",
  //   component:() => import("../pages/Page404")
  // }
];

const router = new VueRouter({
  routes,
});

export default router;