<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               ref="crud"
               v-model="form"
               :permission="permissionList"
               :page="page"
               @row-del="rowDel"
               @row-update="rowUpdate"
               @row-save="rowSave"
               :before-open="beforeOpen"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   v-if="permission.code_delete"
                   plain
                   @click="handleDelete">删 除
        </el-button>
        
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text"
                   size="small"
                   icon="el-icon-document-copy"
                   v-if="permission.code_edit"
                   plain
                   class="none-border"
                   @click.stop="handleCopy(scope.row)">复制
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, remove, add, update} from "@/api/class/androidversion";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        form: {},
        selectionList: [],
        loading: true,
        query: {},
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        option: {
          dialogWidth: 400,
          dialogHeight: 500,
          tip: false,
          border: true,
          index: true,
          selection: true,
          labelWidth: 120,
          viewBtn: true,
          column: [
            {
              label: "版本号",
              prop: "appVersion",
              search: true,
              rules: [{
                required: true,
                message: "请输入版本号",
                trigger: "blur"
              }]
            },
            {
              label: "应用名称",
              prop: "appName",
              rules: [{
                required: true,
                message: "请输入应用名称",
                trigger: "blur"
              }]
            },
            {
              label: "应用类型",
              prop: "appType",
              rules: [{
                required: true,
                message: "请输入应用类型",
                trigger: "blur"
              }]
            },
            {
              label: "下载地址",
              prop: "downloadUrl",
              rules: [{
                required: true,
                message: "请输入下载地址",
                trigger: "blur"
              }]
            },
            // {
            //   label: "更新类型",
            //   prop: "updateType",
            //   rules: [{
            //     required: true,
            //     message: "请输入0：强制更新 1：一般更新 2：静默更新 3：可忽略更新 4：静默可忽略更新 ",
            //     trigger: "blur"
            //   }]
            // },
            // {
            //   label: "更新描述",
            //   prop: "versionDescription",
            //   rules: [{
            //     required: true,
            //     message: "请输入更新描述",
            //     trigger: "blur"
            //   }]
            // },
            // {
            //   label: "允许最低版本",
            //   prop: "allowLowestVersion",
            //   rules: [{
            //     required: true,
            //     message: "请输入允许最低版本（低于这个要强制更新）",
            //     trigger: "blur"
            //   }]
            // },
            // {
            //   label: "上下架",
            //   prop: "status",
            //   rules: [{
            //     required: true,
            //     message: "请输入发布状态（0-未上架；1-已上架）",
            //     trigger: "blur"
            //   }]
            // },
            // {
            //   label: "灰度发布",
            //   prop: "grayReleased",
            //   rules: [{
            //     required: true,
            //     message: "请输入灰度发布（0-无；1-白名单发布；2-IP发布）",
            //     trigger: "blur"
            //   }]
            // },
            
            {
              label: "创建时间",
              prop: "createTime",
              rules: [{
                required: true,
                message: "请输入创建时间",
                trigger: "blur"
              }]
            }
            // ,
            // {
            //   label: "创建人",
            //   prop: "createUser",
            //   rules: [{
            //     required: true,
            //     message: "请输入创建人",
            //     trigger: "blur"
            //   }]
            // }
            
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.code_add, false),
          viewBtn: this.vaildData(this.permission.code_view, false),
          delBtn: this.vaildData(this.permission.code_delete, false),
          editBtn: this.vaildData(this.permission.code_edit, false)
        };
      },
      ids() {
        let ids = [];
        this.selectionList.forEach(ele => {
          ids.push(ele.id);
        });
        return ids.join(",");
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
      handleBuild() {
        if (this.selectionList.length === 0) {
          this.$message.warning("请选择至少一条数据");
          return;
        }
        this.$confirm("是否生成选中模块的代码?", {
          title: "代码生成确认",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
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
 
      
      currentChange(currentPage) {
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize) {
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
      }
    }
  };
</script>

<style>
  .none-border {
    border: 0;
    background-color: transparent !important;
  }
</style>
