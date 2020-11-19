import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/base.css"
import "@/assets/styles/el-reset.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入iconfont
import "./assets/iconFonts/iconfont.css"

//引入subMenu组件
import qfSubMenu from "qf-sub-menu"

//nprogress进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(ElementUI);
Vue.use(qfSubMenu);

// Vue.config.productionTip = false;

//路由前置钩子(路由守卫)
//to去哪里
//from从哪来
//next放行
router.beforeEach((to,from,next)=>{
  NProgress.set(.99)
  // console.log(to,from);
  //用户登录后，localstorage中有没有token
  let token = localStorage.getItem("jason-token") || null
  if(token){
    //如果是注册页面或登录页面直接放行
    if(store.state.menuList.length == 0){
      //说明没有用户路由，触发action获取用户路由
      store.dispatch('FETCH_MENULIST')
      .then(() => {
        next({path:to.path})//next里面要传的参数即要进入的页面的路由信息，因为next传参数后，当前页面进入的路由会被终止，转而进入参数对应的路由，虽然是同一个路由，这么做主要是为了确保addRoutes生效
      })
    }else{
      next()
    }
  }else{//没有token
    if(to.path === "/login"){
      next()
    }else{
      //访问的不是登录页就跳转到登录页
      next({path:"/login"})
    }
  }
})

//使用路由后置钩子处理面包屑
router.afterEach((to,from) => {
  console.log(to);
  let crumbslist = to.matched.slice(1)
  console.log(crumbslist);
  store.commit("SET_CRUMBS",crumbslist)
  NProgress.done()
})

//按需引入
// import { Carousel,CarouselItem } from "element-ui"

//注册到全局
// Vue.component("el-carousel",Carousel)
// Vue.component("el-carousel-item",CarouselItem)


import "./utils/recursionRoutes"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
