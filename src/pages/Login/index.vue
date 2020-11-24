<template>
  <div class="login">
    <div class="left"></div>
    <div class="login_page">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <h1 class="title">千锋管理系统</h1>
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" prop="yanzhengma">
          <el-input
            type="text"
            class="yanzhengma"
            v-model="loginForm.yanzhengma"
            autocomplete="off"
            @keydown.native.13="submitForm('loginForm')"
          ></el-input>
          <span class="yanzheng_svg" @click="refresh" v-html="verifyCode"></span>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <video
      class="bg_video"
      muted
      src="../../assets/video/bg_video.mp4"
      autoplay
      loop
      preload="auto"
    ></video>
  </div>
</template>

<script>
//登录逻辑的实现

//1.使用用户输入的username和password传递给后端

//2.登录通过后，将后端返回的token存到本地

//3.每次请求的时候，携带token到请求头 authorization

//4.展示token校验真确的数据

//5.校验不同过，跳转到登录页

import { login, getCode, refreshCode, verifyCode } from "@/api";
import { mapMutations } from "vuex";
export default {
  data() {
    // 校验用户名
    var validateUsername = (rule, value, callback) => {
      var uPattern = /^[a-zA-Z0-9_-]{3,16}$/;
      if (!uPattern.test(value)) {
        callback("4到16位(字母、数字、下划线、减号)");
      } else {
        callback();
      }
    };

    //校验用户密码
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };

    //校验验证码
    var validateYanzhengma = (rule, value, callback) => {
      if (value === "" || value.length != "5") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      verifyCode: "",
      loginForm: {
        username: "",
        password: "",
        yanzhengma: "",
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        yanzhengma: [{ validator: validateYanzhengma, trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.set_code();
  },
  methods: {
    //刷新验证码
    refresh(){
      this.set_code()
    },
    //验证码
    set_code() {
      getCode().then((res) => {
        this.verifyCode = res.data.img;
      });
    },
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      console.log(this.$refs["loginForm"]);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          //本地校验通过
          //先验证验证码是否加载正确再发送登陆请求
          let verifyRes = await verifyCode(this.loginForm.yanzhengma);
          // console.log(verifyRes);
          if (!verifyRes.data.state) {
            //验证码不正确
            this.$message.error("验证码输入错误,请重新输入");
            this.refresh()
            return;
          }
          //打开本地加载动画
          const loading = this.$loading({
            lock: true,
            text: "正在登陆",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          setTimeout(() => {
            loading.close();
          }, 2000);
          let { username, password } = this.loginForm;
          login(username, password)
            .then((res) => {
              console.log(res);
              //服务器响应，关闭loading动画
              loading.close();
              if (res.data.state) {
                this.$message.success("登陆成功");
                //用户名密码正确
                localStorage.setItem("jason-token", res.data.token);
                localStorage.setItem(
                  "jason-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                //更改vuex中stateuserInfo的值
                this.SET_USERINFO(res.data.userInfo);
                this.$router.push("/Welcome");
              } else {
                //用户名或者密码错误
                this.$message.error("用户名或密码错误");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="less">
/* 表单样式 */
.el-form {
  width: 400px;
}

.login {
  height: 100%;
  width: 100%;
  background: url("../../assets/imgs/bg.jpg");
  overflow: hidden;
}

.left {
  width: 50%;
  height: 100%;
  background-image: url("../../assets/imgs/bg2.png");
  background-repeat: no-repeat;
  background-size: 50%;
  position: absolute;
  opacity: 0.7;
  background-position: 60% 65%;
}

.login_page {
  position: relative;
  z-index: 9;
  width: 25rem;
  height: 30.47619048rem;
  position: absolute;
  top: 50%;
  left: 75%;
  /* -webkit-transform: translate(-50%, -50%); */
  transform: translate(-50%, -50%);
  border-radius: 11px;
  background: rgba(83, 107, 182, 0.46);
  background: rgba(0, 0, 0, 0.2);
  .title {
    color: #fff;
    margin-top: 100px;
    margin-bottom: 50px;
    text-align: center;
  }

  .el-button.el-button--primary {
    width: 100%;
    background: linear-gradient(90deg, #1596fb, #002dff);
    position: absolute;
    right: 45px;
    top: 40px;
  }
  .bg_video {
    display: block;
    margin: auto;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
  }
}

// 验证码样式
.yanzhengma {
  width: 40% !important;
  float: left !important;
}

.yanzheng_svg {
  background: #fff;
  display: inline-block;
  height: 40px;
  width: 140px;
  border-radius: 5px;
  cursor: pointer;
}
</style>