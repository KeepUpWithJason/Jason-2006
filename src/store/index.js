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
  

//刷新页面会丢失用户信息
let userInfo = localStorage.getItem("jason-userInfo") || "{}"
userInfo = JSON.parse(userInfo)

export default new Vuex.Store({
  state: {
    userInfo,
    menuLsit:[] // 用户侧边栏菜单
  },
  mutations: { 
    //更改userInfo
    SET_USERINFO(state,payload){
      state.userInfo = payload
    },
    SET_MENULIST(state,payload){
      state.menuLsit = payload
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