import axios from "axios";

import router  from "../router";

import ElementUi from "element-ui";

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : "http://www.chst.vip"

axios.defaults.withCredentials = true; //允许请求携带认证


//创建请求拦截器，可以给每个请求都携带想要传递的内容
axios.interceptors.request.use(config => {
    console.log(config);
    if (config.url == "/users/login") {
        //不需要携带token
        return config
    } else {
        //登录和注册是不需要携带token的
        let token = localStorage.getItem("jason-token")
        //每一个请求对象
        config.headers['authorization'] = token
        //放行
        return config
    }
})

//响应拦截
axios.interceptors.response.use(config=>{
    console.log(config);
    // console.log(router);
    let { data } = config
    if( data.code == "1004" ){
        //在当前的后台api中1004代表token校验失败，提示错误，并且让页面跳转到登录页
        // alert()
        ElementUi.Message.error("登录信息失效,请重新登录")
        router.push("/login")
    }
    return config
})

axios.create({
    timeout: 4000,
})

export default axios