<template>
  <el-container>
    <el-aside width="200">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        :router="true"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/student">学员信息</el-menu-item>
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
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getLoginLog } from "@/api";
import { mapState } from "vuex";
export default {
  mounted() {
    getLoginLog().then((res) => {
      console.log(res);
    }); 
  },
  computed: {
    ...mapState(["userInfo"]),
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
  transform: translateX(-12rem);
  font-size: 1.5rem;
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
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
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