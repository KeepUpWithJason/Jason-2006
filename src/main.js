import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/base.css"
import "@/assets/styles/el-reset.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// Vue.config.productionTip = false;

//路由前置钩子(路由守卫)
//to去哪里
//from从哪来
//next放行
router.beforeEach((to,from,next)=>{
  // console.log(to,from);
  //用户登录后，localstorage中有没有token
  let token = localStorage.getItem("jason-token")
  if(token){
    //如果是注册页面或登录页面直接放行
    next()
  }else{//没有token
    if(to.path === "/login"){
      next()
    }else{
      //访问的不是登录页就跳转到登录页
      next({path:"/login"})
    }
  }
})

//按需引入
// import { Carousel,CarouselItem } from "element-ui"

//注册到全局
// Vue.component("el-carousel",Carousel)
// Vue.component("el-carousel-item",CarouselItem)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
