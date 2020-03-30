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
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.sendanswer_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/class/send/sendanswer";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
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
          index: true,
          viewBtn: true,
          selection: true,
          column: [
            {
              label: "编号",
              prop: "id",
              rules: [{
                required: true,
                message: "请输入编号",
                trigger: "blur"
              }]
            },
            {
              label: "课堂记录id",
              prop: "rId",
              rules: [{
                required: true,
                message: "请输入课堂记录id",
                trigger: "blur"
              }]
            },
            {
              label: "课堂下发记录id",
              prop: "sId",
              rules: [{
                required: true,
                message: "请输入课堂下发记录id",
                trigger: "blur"
              }]
            },
            {
              label: "试卷id",
              prop: "eId",
              rules: [{
                required: true,
                message: "请输入试卷id",
                trigger: "blur"
              }]
            },
            {
              label: "设备id",
              prop: "deviceId",
              rules: [{
                required: true,
                message: "请输入设备id",
                trigger: "blur"
              }]
            },
            {
              label: "题型 1判断 2单选 4多选",
              prop: "qusType",
              rules: [{
                required: true,
                message: "请输入题型 1判断 2单选 4多选",
                trigger: "blur"
              }]
            },
            {
              label: "试题id",
              prop: "qId",
              rules: [{
                required: true,
                message: "请输入试题id",
                trigger: "blur"
              }]
            },
            {
              label: "题号",
              prop: "qusNum",
              rules: [{
                required: true,
                message: "请输入题号",
                trigger: "blur"
              }]
            },
            {
              label: "正确答案",
              prop: "rightAnswer",
              rules: [{
                required: true,
                message: "请输入正确答案",
                trigger: "blur"
              }]
            },
            {
              label: "学生答案",
              prop: "answer",
              rules: [{
                required: true,
                message: "请输入学生答案",
                trigger: "blur"
              }]
            },
            {
              label: "是否正确",
              prop: "resultType",
              rules: [{
                required: true,
                message: "请输入是否正确",
                trigger: "blur"
              }]
            },
            {
              label: "分数",
              prop: "score",
              rules: [{
                required: true,
                message: "请输入分数",
                trigger: "blur"
              }]
            },
            {
              label: "创建人",
              prop: "createBy",
              rules: [{
                required: true,
                message: "请输入创建人",
                trigger: "blur"
              }]
            },
            {
              label: "创建时间",
              prop: "createTime",
              rules: [{
                required: true,
                message: "请输入创建时间",
                trigger: "blur"
              }]
            },
            {
              label: "选项个数",
              prop: "optionNum",
              rules: [{
                required: true,
                message: "请输入选项个数",
                trigger: "blur"
              }]
            },
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.sendanswer_add, false),
          viewBtn: this.vaildData(this.permission.sendanswer_view, false),
          delBtn: this.vaildData(this.permission.sendanswer_delete, false),
          editBtn: this.vaildData(this.permission.sendanswer_edit, false)
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
      }
    }
  };
</script>

<style>
</style>
