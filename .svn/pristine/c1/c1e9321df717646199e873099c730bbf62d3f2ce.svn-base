<template>
  <basic-container>
    <avue-crud :option="option"
               :data="data"
               ref="crud"
               v-model="form"
               :page="page"
               :permission="permissionList"
               @row-del="rowDel"
               @row-update="rowUpdate"
               @row-save="rowSave"
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
                   v-if="permission.param_delete"
                   plain
                   @click="handleDelete">删 除
        </el-button>
      </template>
      <template slot-scope="scope" slot="schoolBindForm">
        <el-select
            v-model="scope.row.schoolBind"
            value-key="name"
            filterable
            remote
            placeholder="请输入关键词"
            @change="change"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item">
            </el-option>
          </el-select>
    </template>
    </avue-crud>
  </basic-container>
</template>

<script>
  import {getList, remove, update, add} from "@/api/ea/room/classmember";
  import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        options: [],
        loading: false,
        form: {},
        selectionList: [],
        query: {},
        school: {},
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        option: {
          tip: false,
          border: true,
          index: true,
          selection: true,
          viewBtn: true,
          column: [
            {
              label: "班级房间",
              prop: "classRoomId",
              span: 24,
              rules: [{
                required: true,
                message: "请输入班级房间",
                trigger: "blur"
              }]
            },
            {
              label: "会员",
              prop: "memberId",
              rules: [{
                required: true,
                message: "请输入会员",
                trigger: "blur"
              }]
            },
            {
              label: "会员角色",
              prop: "memberRole",
              search: true,
              type: "select",
              row: true,
              dicUrl: "/api/crazy-system/dict/dictionary?code=member_role",
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              rules: [{
                required: true,
                message: "请输入会员角色（1:班主任,2:老师,3:学生,4:家长）",
                trigger: "blur"
              }]
            },
            {
              label: "是否通过",
              prop: "isPass",
              type: "radio",
              value: "1",
              dicData: [
                {
                  label: "否",
                  value: "0"
                },
                {
                  label: "是",
                  value: "1"
                },
              ],
              hide: true
            }
          ]
        },
        data: []
      };
    },
    computed: {
      ...mapGetters(["permission"]),
      permissionList() {
        return {
          addBtn: this.vaildData(this.permission.param_add, false),
          viewBtn: this.vaildData(this.permission.param_view, false),
          delBtn: this.vaildData(this.permission.param_delete, false),
          editBtn: this.vaildData(this.permission.param_edit, false)
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
        row.schoolBind = this.school.name;
        row.schoolId = this.school.id;
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
        row.schoolBind = this.school.name;
        row.schoolId = this.school.id;
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
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      onLoad(page, params = {}) {
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
        });
      }
    }
  };
</script>

<style>
</style>
