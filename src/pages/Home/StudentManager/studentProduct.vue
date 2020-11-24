<template>
  <div class="table">
    <el-row>
      <div style="margin-top: 15px">
        <el-input
          placeholder="请输入学员姓名"
          v-model="input3"
          class="input-with-select"
        >
          <el-select
            v-model="select"
            slot="prepend"
            placeholder="请选择"
            style="width: 100px"
          >
            <el-option label="姓名" value="1"></el-option>
            <el-option label="班级" value="2"></el-option>
            <el-option label="年龄" value="3"></el-option>
            <el-option label="城市" value="4"></el-option>
            <el-option label="学历" value="5"></el-option>
          </el-select>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchStu"
          ></el-button>
        </el-input>
        <el-button type="primary" plain @click="addStudent" class="addStu"
          >添加学员</el-button
        >
      </div>
    </el-row>

    <!-- 添加/修改学员弹出表单 -->
    <el-dialog title="添加/修改学员" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!-- 头像上传部分 -->
        <el-form-item label="头像" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://www.chst.vip/students/uploadStuAvatar"
            :show-file-list="false"
            :on-success="imgSuccess"
            :limit="1"
            :multiple="false"
            name="headimgurl"
            :on-remove="imgRemove"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 文字输入部分 -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <el-input v-model="form.class"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="form.age"></el-input>
        </el-form-item>
        <el-form-item label="项目地址" prop="productUrl">
          <el-input v-model.number="form.productUrl"></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-radio-group v-model="form.degree" size="medium">
            <el-radio border label="高中"></el-radio>
            <el-radio border label="专科"></el-radio>
            <el-radio border label="本科"></el-radio>
            <el-radio border label="985/211"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="城市" prop="region">
          <el-select v-model="form.city" placeholder="请选择所在城市">
            <el-option label="南京" value="南京"></el-option>
            <el-option label="上海" value="上海"></el-option>
            <el-option label="北京" value="北京"></el-option>
            <el-option label="深圳" value="深圳"></el-option>
            <el-option label="合肥" value="合肥"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自我介绍" prop="description">
          <el-input
            type="textarea"
            v-model="form.description"
            height="300px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" height="500" border style="width: 100%">
      <el-table-column prop="headimgurl" label="头像" width="100">
        <!-- 图片的显示 -->
        <template slot-scope="scope">
          <el-avatar
            shape="circle"
            :size="50"
            :src="scope.row.headimgurl"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150"></el-table-column>
      <el-table-column prop="class" label="班级" width="150"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="150"></el-table-column>
      <el-table-column prop="city" label="城市" width="150"> </el-table-column>
      <el-table-column prop="degree" label="学历" width="150">
      </el-table-column>
      <el-table-column prop="description" label="介绍" width="150">
      </el-table-column>
      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-view"
            @click="look(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="open(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
        background
        hide-on-single-page
        layout="prev, pager, next"
        @current-change="pageChange"
        :total="total"
        :page-size="dataCount"
        :page-count="pages"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getStudents,
  deleteStudents,
  add,
  search,
  change,
  uploadImg,
} from "@/api";

export default {
  data() {
    return {
      tableData: [],
      totalData:[],
      dialogTableVisible: false,
      dialogFormVisible: false,
      imageUrl: "",
      input1: "",
      input2: "",
      input3: "",
      select: "",
      form: {
        headimgurl: "",
      },
      row: {},
      resImg: {},
      formLabelWidth: "200px",

      total:0,
      pages:0,
      dataCount:5,
      currentPage:1
    };
  },
  watch: {
    input3(val) {
      search(val).then((res) => {
        this.tableData = res.data.data;
      });
    },
  },
  methods: {
    //切换分页
    pageChange(p){
      console.log(p);
      // 根据页码展示该页数据
      console.log(this.totalData.slice((p-1)*5,p * 5));
      this.tableData =  this.totalData.slice((p-1)*5,p * 5)
      // 记录当前页
      this.currentPage = p
    },
    //查看学员信息
    look(index, row) {
      // console.log(row);
      console.log("row", row);
      this.$router.push({ name: "studentProfile", params: { row } });
    },
    //搜索学员信息
    searchStu() {
      search(this.input3).then((res) => {
        this.tableData = res.data.data;
      });
    },
    //图片上传成功
    imgSuccess(res) {
      // 上传成功 给formheadimgurl的属性
      console.log(res);
      this.resImg = res.headimgurl;
      this.imageUrl = res.headimgurl;
      console.log("上传成功", this.imageUrl);
    },
    // 图片移动
    imgRemove(file, fileList) {
      console.log(file, fileList);
    },
    //点击添加弹出
    addStudent() {
      this.form = {};
      this.row = {};
      this.form.headimgurl = "";
      this.imageUrl = "";
      this.dialogFormVisible = true;
    },

    //修改
    edit(index, row) {
      this.form = row;
      this.row = row;
      this.form.headimgurl = row.headimgurl;
      this.imageUrl = row.headimgurl;
      this.dialogFormVisible = true;
    },

    //确认按钮添加/修改
    confirm() {
      if (JSON.stringify(this.row) !== "{}") {
        //对话框中有数据-----修改
        this.form.headimgurl = this.resImg;
        console.log("发送修改的数据", this.form);
        change(this.form).then((res) => {
          console.log("修改成功返回的数据", res);
          this.$message({
            type: "success",
            message: "更改成功!",
          });
          this.dialogFormVisible = false;
          this.form = {};
        });
      } else {
        this.form.headimgurl = this.resImg;
        //对话框中无数据-----添加
        let obj = this.form;
        add(obj).then((res) => {
          getStudents().then((res) => {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
            this.tableData = res.data.data.slice(0,5);
            console.log("添加", res);
            this.dialogFormVisible = false;
            this.form = {};
          });
        });
      }
    },

    //删除按钮弹出显示是否删除
    open(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          console.log("要删除的该项",row);
          deleteStudents(row.sId).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            getStudents().then((res) => {
              console.log("获取当前页码",this.currentPage);
              this.tableData = res.data.data.slice((this.currentPage - 1) * 5,this.currentPage * 5);
              console.log("获取当前页码所展示的数据",this.tableData);
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
  mounted(){
    getStudents().then((res) => {
      console.log(res.data.data);
      // 总条目数
      this.total = res.data.data.length
      // 页码数----每页五条数据
      this.pages = (res.data.data.length) / this.dataCount
      // 让每页显示五条数据
      this.totalData =  res.data.data
      this.tableData = res.data.data.slice(0,5)
      // this.tableData = res.data.data;
    });
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 1rem;
}
.input-with-select {
  width: 500px;
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

.addStu {
  margin-left: 20px;
}

.pagination{
  display: flex;
  justify-content: center;
}
</style>