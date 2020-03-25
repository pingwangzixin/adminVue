<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="primary"
                    size="small"
                   icon="el-icon-upload"
                   @click.native="addTeaMember">添加
        </el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text" size="small" @click.native="updateState(scope.row)" >{{scope.row.status==0?'禁用':'启用'}}</el-button>
      </template>

    </avue-crud>
    <el-dialog title="导入" :visible.sync="dialogFormVisible">
      <el-upload
          class="upload-demo"
          action="/api/ea/memberteacher/importExcel"
          multiple
          :headers="headers"
          :limit="1"
          :before-upload="handleBeforeUpload"
          :on-exceed="handleExceed"
          :on-success="success"
          :on-error="error"
          :show-file-list="false">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
        </el-upload>
        <el-link type="primary" href="/memberTeacher.xlsx" >下载模板</el-link>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>
  import {getToken} from '@/util/auth'
  import {getList, getDetail, add, update, remove,addClassRoomMember,memberList} from "@/api/ea/member/memberteacher";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        memberList:[],
        fileList: [],
        dialogFormVisible: false,
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          tip: false,
          border: true,
          addBtn: false,
          index: false,
          selection: true,
          selectable:(row)=>{
            let flag = true;
            for(var i=0;i<this.memberList.length;i++){
              if(this.memberList[i].memberId === row.id){
                flag = false;
                break;
              }
            }
            return flag;
          },
          menu: false,
          column: [
            {
              label: "编号",
              prop: "id",
              editDisplay: false,
              addDisplay: false,
              viewDisplay: false,
              rules: [{
                required: true,
                message: "请输入编号",
                trigger: "blur"
              }]
            },
            {
              label: "手机号码",
              prop: "phone",
              search: true,
              rules: [{
                required: true,
                message: "请输入正确的手机号码",
                trigger: "blur"
              }]
            },
            {
              label: "登录密码",
              prop: "password",
              type: "password",
              hide: true,
              editDisplay: false,
              viewDisplay: false,
              rules: [{
                required: true,
                message: "请输入登录密码",
                trigger: "blur"
              }]
            },
            {
              label: "真实姓名",
              prop: "realName",
              search: true,
              rules: [{
                required: true,
                message: "请输入真实姓名",
                trigger: "blur"
              }]
            },
            {
              label: "头像",
              prop: "avatarImg",
              type:"upload",
              action: '/api/common/upload',
              listType: 'picture-img',
              propsHttp: {
                res: 'data'
              },
              tip: '请上传宽高为： 500*500 的图片',
              span: 24,
              rules: [{
                required: true,
                message: "请上传头像",
                trigger: "blur"
              }]
            },
            {
              label: "性别",
              prop: "sex",
              type: "select",
              value: 1,
              row: true,
              dicUrl: "/api/crazy-system/dict/dictionary?code=sex",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              search: true,
              rules: [{
                required: true,
                message: "请输入性别",
                trigger: "blur"
              }]
            },
            {
              label: "学科",
              prop: "subjectArr",
              type: "checkbox",
              row: true,
              dicUrl: "/api/crazy-system/dict/dictionary?code=subject",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请选择学科",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "createTime",
              editDisplay: false,
              addDisplay: false,
              rules: [{
                required: true,
                message: "请输入创建时间",
                trigger: "blur"
              }]
            },
            {
              label: "更新日期",
              prop: "updateTime",
              editDisplay: false,
              addDisplay: false,
              rules: [{
                required: true,
                message: "请输入更新日期",
                trigger: "blur"
              }]
            },
            {
              label: "状态",
              prop: "status",
              type: "select",
              search: true,
              span: 24,
              value: 0,
              dicData:[{
                  label:'正常',
                  value:0
              },{
                  label:'禁用',
                  value:1
              }],
              rules: [{
                required: true,
                message: "请输入状态",
                trigger: "blur"
              }]
            },
            {
              label: "备注",
              type: "textarea",
              prop: "remark",
              span: 24
            }
          ]
        },
        data: []
      };
    },
    props:{
      classId: Number
    },
    watch: {
      classId: {
        deep: true,
        handler(newVal){
          memberList(newVal).then(res => {
            this.memberList = res.data.data;
          });
          this.onLoad(this.page);
        }
      }
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.memberteacher_add, false),
          viewBtn: this.vaildData(this.permission.memberteacher_view, false),
          delBtn: this.vaildData(this.permission.memberteacher_delete, false),
          editBtn: this.vaildData(this.permission.memberteacher_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
      },
      headers(){
        return {
          "Crazy-Auth": 'bearer ' + getToken()
        }
      }
    },
    methods: {
      rowSave(row, loading, done) {
        add(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowUpdate(row, index, loading, done) {
        update(row).then(() => {
          loading();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          done();
          console.log(error);
        });
      },
      rowDel(row) {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(row.id);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
      },
      handleDelete() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            return remove(this.ids);
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
      beforeOpen(done, type) {
        if (["edit", "view"].includes(type)) {
          getDetail(this.form.id).then(res => {
            this.form = res.data.data;
          });
        }
        done();
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params) {
        this.query = params;
        this.onLoad(this.page, params);
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      },
      handleExceed() {
        this.$message.warning(`只可选择一个文件`);
      },
      handleBeforeUpload(files) {
        if(!(this.getFileExt(files.name) == "xls" || this.getFileExt(files.name) == "xlsx")){
          this.$message.warning(`只可上传excel文件`);
          return false;
        }
      },
      success(){
        this.dialogFormVisible = false;
        this.onLoad(this.page);
      },
      error(err){
        this.$message.error(`上传失败`+err);
      },
      getFileExt(fileName){
        return fileName.substring(fileName.lastIndexOf(".") + 1,fileName.length);
      },
      updateState(row){
        if(row.status == "0"){
          row.status = 1;
        }else{
          row.status = 0;
        }
        update(row).then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }, error => {
          console.log(error);
        });
      },
      addTeaMember() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("确定要添加数据吗?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            addClassRoomMember(this.ids,this.classId,"1").then(res => {
              for(var j = 0,len=res.data.data.length; j < len; j++) {
                  this.memberList.push(res.data.data[j]);
              }
              console.log(this.memberList)
               return true;
            });
            
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.$refs.crud.toggleSelection();
          });
      },
    },
    created: function() {
     memberList(this.classId).then(res => {
        this.memberList = res.data.data;
      });
    },
  };
</script>

<style>
</style>
