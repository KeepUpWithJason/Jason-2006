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

//删除学员信息
export const deleteStudents = (sId) => axios.get(`/students/delstu?sId=${sId}`)

//添加学员
export const add = (obj) => axios.post("/students/addstu",{
    class:obj.class,
    name:obj.name,
    age:obj.age,
    city:obj.city,
    degree:obj.degree,
    description:obj.description,
    productUrl:obj.productUrl,
    headimgurl:obj.headimgurl
})

