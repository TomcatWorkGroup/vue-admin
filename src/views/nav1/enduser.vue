<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="终端用户名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="filterEndUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="endusers" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="endUserName" label="终端用户名称">
			</el-table-column>
			<el-table-column prop="enterpriseId" label="所属企业" :formatter="formatEnterprise">
			</el-table-column>
			<el-table-column prop="customerId" label="所属客户" :formatter="formatCustomer">
			</el-table-column>
			<el-table-column prop="status" label="状态" width="100" :formatter="formatStatus">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button type="danger" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑终端用户" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="所属企业" prop="enterpriseId">
					<el-select v-model="editForm.enterpriseId"
					filterable
					placeholder="请选择"
					@change="selectChange">
    					<el-option
      						v-for="item in enterprises"
      						:key="item.id"
      						:label="item.enterpriseName"
      						:value="item.id">
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item label="所属客户" prop="customerId">
					<el-select v-model="editForm.customerId"
					filterable
					placeholder="请选择">
    					<el-option
      						v-for="item in customers"
      						:key="item.id"
      						:label="item.customerName"
      						:value="item.id">
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item label="名称" prop="endUserName">
					<el-input v-model="editForm.endUserName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="editForm.status">
						<el-radio class="radio" :label="1">启动</el-radio>
						<el-radio class="radio" :label="0">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增终端用户" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="所属企业" prop="enterpriseId">
					<el-select v-model="addForm.enterpriseId"
					value-key="id"
					filterable
					placeholder="请选择"
					@change="selectChange">
    					<el-option
      						v-for="item in enterprises"
      						:key="item.id"
      						:label="item.enterpriseName"
      						:value="item.id">
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item label="所属客户" prop="customerId">
					<el-select v-model="addForm.customerId"
					filterable
					placeholder="请选择">
    					<el-option
      						v-for="item in customers"
      						:key="item.id"
      						:label="item.customerName"
      						:value="item.id">
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item label="名称" prop="endUserName">
					<el-input v-model="addForm.endUserName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="addForm.status">
						<el-radio class="radio" :label="1">启用</el-radio>
						<el-radio class="radio" :label="0">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import * as enduserAPI from "../../api/enduser";
import * as customerAPI from "../../api/customer";
import * as enterpriseAPI from "../../api/enterprise";
import { removeCustomer } from "../../api/customer";

export default {
  data() {
    return {
      filters: {
        name: ""
      },
      sourceData: {
        endusers: []
      },
      endusers: [],
      customers: [],
      enterprises: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        customerName: [
          { required: true, message: "请输终端用户名称", trigger: "blur" }
        ]
      },
      //编辑界面数据
      editForm: {
        id: 0,
        endUserName: "",
        customerId: 0,
        enterpriseId: 0,
        status: -1
      },

      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      addFormRules: {
        customerName: [
          { required: true, message: "请输终端用户名称", trigger: "blur" }
        ]
      },
      //新增界面数据
      addForm: {
        id: 0,
        endUserName: "",
        customerId: "",
        enterpriseId: "",
        status: -1
      }
    };
  },
  methods: {
    selectChange: function(v) {
      // this.customers = this.customers.filters(c=>{
      // 	//if(c.enterpriseId === v) return true;
      // 	return false;
      // });
    },
    formatStatus: function(row, column) {
      return row.status == 1 ? "启用" : "禁用";
    },
    formatEnterprise: function(row, column) {
      let eps = this.enterprises.find((value, index, arr) => {
        if (row.enterpriseId === value.id) return true;
      });
      return undefined == eps ? "未知" : eps.enterpriseName;
    },
    formatCustomer: function(row, column) {
      let cus = this.customers.find((value, index, arr) => {
        if (row.customerId === value.id) return true;
      });
      return undefined == cus ? "未知" : cus.customerName;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getEndUsers();
    },
    //获取公司列表
    getEndUsers() {
      let para = {
        page: this.page,
        endUserName: this.filters.name
      };
      this.listLoading = true;
      return enduserAPI.getEndUserList(para).then(res => {
        this.sourceData.endusers = res.data;
        this.endusers = this.sourceData.endusers;
        this.total = this.endusers.length;
        this.listLoading = false;
      });
    },
    filterEndUsers() {
      let name = this.filters.name;
      this.endusers = this.sourceData.endusers.filter(item => {
        if (name && -1 === item.endUserName.indexOf(name)) return false;
        return true;
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        endUserName: "",
        enterpriseId: "",
        customerId: "",
        status: -1
      };
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.editForm);
            console.log(para);

            enduserAPI.editEndUser(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getEndUsers().then();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            console.log(para);

            enduserAPI.addEndUser(para).then(res => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getEndUsers();
            });
          });
        }
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  mounted() {
    let para = { status: enterpriseAPI.EnterpriseStatus_Enable };
    enterpriseAPI.getEnterpriseListByStatus(para).then(res => {
      this.enterprises = res.data;
    });
    customerAPI.getCustomerList().then(res => {
      this.customers = res.data;
    });
    this.getEndUsers();
  }
};
</script>

<style scoped>

</style>