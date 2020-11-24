<template>
  <div class="profile">
    <el-row>
      <el-col :span="12">
        <div class="img">
          <img :src="stu.headimgurl" alt="" />
        </div>
      </el-col>
      <el-col :span="12">
        <p>
          姓名:<span>{{ stu.name }}</span>
        </p>
        <p>
          年龄:<span>{{ stu.age }}</span>
        </p>
        <p>
          班级:<span>{{ stu.class }}</span>
        </p>
        <p>
          学历:<span>{{ stu.degree }}</span>
        </p>
        <p>
          城市:<span>{{ stu.city }}</span>
        </p>
        <p>
          项目地址:<span>{{ stu.productUrl }}</span>
        </p>
        <p>
          自我介绍:<span>{{ stu.description }}</span>
        </p>
        <p>
          注册时间:<span>{{ stu.cTime }}</span>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stu: {},
    };
  },
  methods: {
    getStuProfile() {
      let stuPro = this.$route.params.row;
      console.log(stuPro);
      this.stu = stuPro;
    },
  },
  mounted() {
    this.getStuProfile();
  },
};
</script>

<style scoped lang="less">
.el-row{
  display: flex;
  align-items: center;
}
p {
  margin: 0;
}
.profile {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 80px auto;
}
.img {
  border: 1px solid black;
  width: 200px;
  height: 200px;
  img {
    width: 200px;
    height: 200px;
  }
}
</style>