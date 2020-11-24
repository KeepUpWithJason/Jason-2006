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

//搜索学员姓名
export const search = (key) => axios.get(`/students/searchstu?key=${key}`)

//修改学员信息
export const change = (obj) => axios.post(`/students/updatestu`,obj)

//上传头像
export const uploadImg = (img) => axios({
    url:"/students/uploadStuAvatar",
    method:"post",
    data:img,
    header:{"content-type": "multipart/form-data"}
})



//获取验证码
export const getCode = () => axios.get("/users/getCaptcha")

//刷新验证码
export const refreshCode = () => axios.get("/users/refreshCaptcha")

//校验验证码
export const verifyCode = (code) => axios.get(`/users/verifyCaptcha?captcha=${code}`)


