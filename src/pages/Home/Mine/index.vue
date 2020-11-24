<template>
  <div class="mine">
    <!-- 表单 -->
    <el-form ref="form" :model="form" label-width="100px">
      <!-- 头像上传 -->
      <el-form-item label="活动名称">
        <el-upload
          class="avatar-uploader"
          action="http://www.chst.vip/students/uploadStuAvatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          name="headimgurl"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 文本 -->
      <el-form-item label="昵称" >
        <el-input v-model="form.name">{{userInfo.nickname}}</el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio border label="男" value="男"></el-radio >
          <el-radio border label="女" value="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="form.city" placeholder="请选择城市">
          <el-option label="北京" value="北京"></el-option>
          <el-option label="上海" value="上海"></el-option>
          <el-option label="广州" value="广州"></el-option>
          <el-option label="深圳" value="深圳"></el-option>
          <el-option label="南京" value="南京"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item> -->
      <!-- <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item> -->

      <el-form-item label="个人简介">
        <el-input
          type="textarea"
          v-model="form.desc"
          placeholder="这个人很懒,什么都留下了..."
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      imageUrl:"",
      form: {
        headimgurl:"",
        name: "",
        password:"123456",
        gender:"男",
        city: "南京",
        desc: "这个人很懒，什么都留下了...",
      },
      labelWidth:"200px"
    };
  },
  computed:{
    ...mapState(['userInfo',"nickName"]),
  },
  methods: {
    //   上传头像
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = res.headimgurl
    },
    // 提交
    onSubmit() {
      this.$message({
        type:"success",
        message:"修改成功"
      })
      this.$store.state.userImg = this.imageUrl
      this.$store.state.userInfo.nickname = this.form.name
    },
  },
  mounted(){
    this.form.name = this.nickName
    this.imageUrl = this.$store.state.userImg
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>