import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import {getMenuList} from "@/api" 

//引入allroutes
import allRoutes from "../router/allroutes"
//引入递归函数
import recursionRoutes from "../utils/recursionRoutes"
//引入动态路由
import dynamicRoutes from "../utils/dynamicRoutes"

//引入router
import router from "../router"

//刷新页面会丢失用户信息
let userInfo = localStorage.getItem("jason-userInfo") || "{}"
userInfo = JSON.parse(userInfo)

export default new Vuex.Store({
  state: {
    userInfo,
    menuList:[], // 用户侧边栏菜单
    crumbs:[]
  },
  mutations: { 
    //更改userInfo
    SET_USERINFO(state,payload){
      state.userInfo = payload
    },
    //获取登录的用户的菜单列表
    SET_MENULIST(state,payload){
      state.menuList = payload
      //动态的将路由添加到routes中，核心方法，router.addRoutes(复合路由配置规则的数据)
      //1.将menuList赋值给dynamicRoutes的children
      let target = dynamicRoutes.find(item => item.path === "/")
      target.children = [...state.menuList]
      //2.动态添加配置到router/routes中
      router.addRoutes(dynamicRoutes)
    },

    //设置面包屑
     SET_CRUMBS(state,payload){
      state.crumbs = payload  
     }
  },
  actions: {
    //1.发送请求，获取用户菜单数据
     async FETCH_MENULIST({commit}){
       //2.通过allRoutes和请求回来的用户菜单数据进行对比，将结果提交给mutation
      let userMenu = await getMenuList()
      console.log(userMenu);
      let sideMenu = recursionRoutes(allRoutes,userMenu.data.menuList)
      // console.log(sideMenu);
      commit('SET_MENULIST',sideMenu)
    }
  },
  modules: {}
});