<template>
  <div class="table">
    <el-row>
      <el-button type="primary" plain @click="addStudent">添加学员</el-button>
    </el-row>

    <!-- 添加学员弹出表单 -->
    <el-dialog title="添加学员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!-- 头像上传部分 -->
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://www.chst.vip/students/uploadStuAvatar/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 文字输入部分 -->
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-input v-model="form.class" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth">
          <el-input v-model="form.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学历" :label-width="formLabelWidth">
          <el-input v-model="form.degree" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评价" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目地址" :label-width="formLabelWidth">
          <el-input v-model="form.productUrl" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" height="540" border style="width: 100%">
      <el-table-column prop="headimgurl" label="头像" width="100">
        <!-- 图片的显示 -->
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            :size="50"
            :src="scope.row.headimgurl"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="200"></el-table-column>
      <el-table-column prop="class" label="班级" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="180"></el-table-column>
      <el-table-column prop="city" label="城市" width="180"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="changeVisible = true"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="open(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStudents } from "@/api";
import { deleteStudents } from "@/api";
import { add } from "@/api";

export default {
  data() {
    return {
      tableData: [],
      search: "",
      dialogTableVisible: false,
      dialogFormVisible: false,

      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      changeVisible: false,

      imageUrl: "",
      form: {
        name: "",
        class: "",
        age: "",
        city: "",
        degree:"",
        productUrl:"",
        description:""
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    //
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log("this.imageUrl",this.imageUrl);
    },
    //图片上传后判断是否符合要求
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addStudent() {
      this.dialogFormVisible = true;
    },
    confirm() {
      let obj = {
        class:this.form.class,
        name:this.form.name,
        age:this.form.age,
        city:this.form.city,
        degree:this.form.degree,
        productUrl:this.form.productUrl,
        description:this.form.description,
        headimgurl:this.imageUrl
      }
      add(obj).then(res=>{
        console.log(res);
      })
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    open(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          console.log(row.sId);
          deleteStudents(row.sId).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            getStudents().then((res) => {
              this.tableData = res.data.data;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  computed: {},
  created() {
    getStudents().then((res) => {
      this.tableData = res.data.data;
    });
  },
};
</script>

<style scoped>
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