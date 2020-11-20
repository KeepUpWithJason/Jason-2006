<template>
  <el-container>
    <el-aside width="200">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        :router="true"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <i
                class="iconfont icon-shouqi"
                @click="isCollapse = !isCollapse"
              ></i></div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple-light">
              千锋管理系统
            </div></el-col
          >
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-avatar
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar
              ><span>欢迎您:</span>
              <b class="nickname">{{ userInfo.nickname }}</b>
              <span class="quit" @click="quit">退出</span>
            </div></el-col
          >
        </el-row>
      </el-header>
      <!-- main内容 -->
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to={path:crumbs.path} v-for="crumb in crumbs" :key="crumb.meta.name">{{crumb.meta.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getLoginLog } from "@/api";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo", "menuList","crumbs"]),
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    quit() {
      //退出登录
      //1.清除token
      //2.跳转到登录页
      localStorage.removeItem("jason-token");
      localStorage.removeItem("jason-userInfo");
      this.$router.push("/login");
      //刷新页面
      window.location.reload();
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less">
.icon-shouqi {
  color: #fff;
  cursor: pointer;
  font-size: 1.5rem;
  position: absolute;
  left: 2rem;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header,
.el-footer {
  background: linear-gradient(135deg, #4c67ff, #5635df);
  text-align: center;
  line-height: 36px;
  color: #fff;
  position: relative;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  display: flex;
  justify-content: center;
  span {
    margin: 2px 5px;
  }
}
.row-bg {
  padding: 10px 0;
  // background-color: #f9fafc;
}

.wel {
  vertical-align: middle;
}
.quit {
  color: pink;
  cursor: pointer;
}

</style>