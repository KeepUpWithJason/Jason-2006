<template>
  <el-table :data="tableData" height="600" border style="width: 100%">
    <el-table-column prop="name" label="姓名" width="250"></el-table-column>
    <el-table-column prop="class" label="班级" width="180"> </el-table-column>
    <el-table-column prop="age" label="年龄"></el-table-column>
    <el-table-column prop="city" label="城市">
    </el-table-column>
  </el-table>
</template>

<script>
import { getStudents } from "@/api"

export default {
  data() {
    return {
      tableData: [],
    };
  },
  computed: {

  },
  created(){
      getStudents()
      .then(res=>{
          console.log(res.data.data);
          this.tableData = res.data.data
      })
  }
};
</script>