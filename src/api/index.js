import axios from "./config"
//登录
export const login = (username,password) => axios({
    url:"/users/login",
    method:"post",
    data:{
        username,
        password
    }
})