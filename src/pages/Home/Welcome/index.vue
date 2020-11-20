<template>
  <div class="welcome">
    <el-table :data="tableData" height="600" border style="width: 100%">
      <el-table-column prop="_id" label="ID" width="250"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="lastLogin.ip" label="ip"></el-table-column>
      <el-table-column prop="lastLogin.loginTime" label="登录时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getLoginLog } from "@/api";

export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    
  },
  mounted() {
    getLoginLog().then((res) => {
      // console.log(res.data.data);
      this.tableData = res.data.data;
    });
  },
};
</script>
