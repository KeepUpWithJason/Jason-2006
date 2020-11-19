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


//获取登入日志
/**
 * 
 * @param {Object} _this 一个组件实例 
 */
export const getLoginLog = () => axios.get("/getloginlog")

//获取用户菜单
export const getMenuList = () => axios.get("/permission/getMenuList")

//获取学员信息
export const getStudents = () => axios.get("/students/getstulist")
