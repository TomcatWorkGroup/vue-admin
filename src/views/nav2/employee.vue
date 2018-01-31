<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
					<el-form-item label="公司">
					<el-select v-model="org.orgIds.companyId"
					value-key="id"
					filterable clearable 
					placeholder="请选择"
					@change="selectCompanyChange"
					@clear="clear">
    					<el-option
      						v-for="item in companies"
      						:key="item.id"
      						:label="item.companyName"
      						:value="item.id">
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item label="企业">
					<el-select v-model="org.orgIds.enterpriseId"
					value-key="id"
					filterable clearable 
					placeholder="请选择"
					@change="selectEnterpriseChange"
					@clear="clear">
    					<el-option
      						v-for="item in enterprises"
      						:key="item.id"
      						:label="item.enterpriseName"
      						:value="item.id">
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item label="客户">
					<el-select v-model="org.orgIds.customerId"
					value-key="id"
					filterable clearable 
					placeholder="请选择"
					@change="selectCustomerChange"
					@clear="clear">
    					<el-option
      						v-for="item in customers"
      						:key="item.id"
      						:label="item.customerName"
      						:value="item.id">
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchEmployees">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="confirmDlgAttr.visable=true">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="employees" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="realName" label="真实姓名">
			</el-table-column>
			<el-table-column prop="mobile" label="手机">
			</el-table-column>
			<el-table-column prop="orgType" label="组织类型" :formatter="formatOrgType">
			</el-table-column>
			<el-table-column prop="orgId" label="组织名称" width="100" :formatter="formatOrgId">
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
<!--添加对话框-->
<el-dialog width="30%" top="25%" title="新增？" center :visible.sync="confirmDlgAttr.visable">
  <span slot="footer" class="dialog-footer">
		<el-button type="primary" @click="showAddCompanyEmployeeDlg">公司员工</el-button>
		<el-button type="success" @click="showAddEnterpriseEmployeeDlg">企业员工</el-button>
  </span>
</el-dialog>

		<!--编辑界面-->
		<el-dialog :title="employeeFormAttr.title" v-model="employeeFormAttr.editVisable" :close-on-click-modal="false">
			<el-form :model="employeeEntityForm" label-width="80px" :rules="editEmployeeEntityFormRules" ref="editEmployeeEntityForm">
				<el-form-item label="真实姓名" prop="realName">
					<el-input v-model="employeeEntityForm.realName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="employeeEntityForm.password" auto-complete="off"></el-input>
				</el-form-item>

				<el-form-item label="状态">
					<el-radio-group v-model="employeeEntityForm.status">
						<el-radio class="radio" :label="1">启动</el-radio>
						<el-radio class="radio" :label="0">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="employeeFormAttr.editVisable = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog :title="employeeFormAttr.title" v-model="employeeFormAttr.addVisable" :close-on-click-modal="false">
			<el-form :model="employeeEntityForm" label-width="80px" :rules="addEmployeeEntityFormRules" ref="addEmployeeEntityForm">
				<el-form-item :label="employeeFormAttr.orgTitle" prop="orgId">
					<el-select v-model="employeeEntityForm.orgId"
					value-key="id"
					filterable
					placeholder="请选择">
    					<el-option
      						v-for="item in orgs"
      						:key="item.id"
      						:label="item.orgname"
      						:value="item.id">
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input v-model="employeeEntityForm.mobile" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="电子邮箱" prop="email">
					<el-input v-model="employeeEntityForm.email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="登录密码" prop="password">
					<el-input v-model="employeeEntityForm.password" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="真实姓名" prop="realName">
					<el-input v-model="employeeEntityForm.realName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="employeeEntityForm.status">
						<el-radio class="radio" :label="1">启用</el-radio>
						<el-radio class="radio" :label="0">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="employeeFormAttr.addVisable = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import * as companyAPI from "../../api/company";
import * as enterpriseAPI from "../../api/enterprise";
import * as customerAPI from "../../api/customer";
import * as employeeAPI from "../../api/employee";
import { removeCustomer } from "../../api/customer";

export default {
  data() {
    return {
      confirmDlgAttr: {
        visable: false
      },
      employeeFormAttr: {
        addVisable: false,
        editVisable: false,
        title: "",
        orgTitle: ""
      },
      org: {
        orgType: "",
        orgId: "",
        orgIds: {
          companyId: "",
          enterpriseId: "",
          customerId: ""
        }
      },
      orgTypes: [
        { typeId: 0, label: "系统" },
        { typeId: 1, label: "公司" },
        { typeId: 2, label: "企业" },
        { typeId: 4, label: "客户" }
      ],
      companies: [],
      enterprises: [],
      customers: [],
      employees: [],
      orgs: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], //列表选中列
      editLoading: false,
      editEmployeeEntityFormRules: {
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ]
      },
      addLoading: false,
      addEmployeeEntityFormRules: {
        realName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ]
      },
      //员工数据
      employeeEntityForm: {
        id: 0,
        orgType: 0,
        orgId: 0,
        password: "",
        mobile: "",
        email: "",
        realName: "",
        status: -1
      }
    };
  },
  methods: {
    selectCompanyChange(v) {
      if ("" === v) return;
      this.org.orgIds.enterpriseId = "";
      this.org.orgIds.customerId = "";
      this.org.orgType = 1;
      this.org.orgId = v;
    },
    selectEnterpriseChange(v) {
      if ("" === v) return;
      this.org.orgIds.companyId = "";
      this.org.orgIds.customerId = "";
      this.org.orgType = 2;
      this.org.orgId = v;
    },
    selectCustomerChange(v) {
      if ("" === v) return;
      this.org.orgIds.companyId = "";
      this.org.orgIds.enterpriseId = "";
      this.org.orgType = 4;
      this.org.orgId = v;
    },
    clear() {
      this.org.orgType = "";
      this.org.orgId = "";
    },
    formatCompany(value) {
      let cp = this.companies.find((item, index, arr) => {
        if (item.id === value) return true;
      });
      return undefined == cp ? "未知" : cp.companyName;
    },
    formatEnterprise: function(value) {
      let eps = this.enterprises.find((item, index, arr) => {
        if (item.id === value) return true;
      });
      return undefined == eps ? "未知" : eps.enterpriseName;
    },
    formatCustomer: function(value) {
      let cus = this.customers.find((item, index, arr) => {
        if (item.id === value) return true;
      });
      return undefined == cus ? "未知" : cus.customerName;
    },
    formatOrgType(row, column) {
      let t = "";
      switch (row.orgType) {
        case 0:
          t = "系统";
          break;
        case 1:
          t = "公司";
          break;
        case 2:
          t = "企业";
          break;
        case 4:
          t = "客户";
          break;
      }
      return t;
    },
    formatOrgId(row, column) {
      if (0 === row.orgType) {
        return "系统";
      } else if (1 === row.orgType) {
        return this.formatCompany(row.orgId);
      } else if (2 === row.orgType) {
        return this.formatEnterprise(row.orgId);
      } else if (4 === row.orgType) {
        return this.formatCustomer(row.orgId);
      }
    },
    formatStatus: function(row, column) {
      return row.status == 1 ? "启用" : "禁用";
    },
    handleCurrentChange(val) {
      // this.page = val;
      // this.getEmployees();
    },
    showAddCompanyEmployeeDlg() {
      this.employeeEntityForm.orgType = 1;
      this.employeeEntityForm.orgId = "";
      this.orgs = this.companies.map(item => {
        return { id: item.id, orgname: item.companyName };
      });

      this.employeeFormAttr.title = "添加公司员工";
      this.employeeFormAttr.orgTitle = "所属公司";
      this.employeeFormAttr.addVisable = true;
      this.confirmDlgAttr.visable = false;
    },
    showAddEnterpriseEmployeeDlg() {
      this.employeeEntityForm.orgType = 2;
      this.employeeEntityForm.orgId = "";
      this.orgs = this.enterprises.map(item => {
        return { id: item.id, orgname: item.enterpriseName };
      });

      this.employeeFormAttr.title = "添加企业员工";
      this.employeeFormAttr.orgTitle = "所属企业";
      this.employeeFormAttr.addVisable = true;
      this.confirmDlgAttr.visable = false;
    },
    //获取公司列表
    getEmployees() {
      let para = {};
      this.listLoading = true;
      return employeeAPI.getEmployeeList(para).then(res => {
        this.employees = res.data;
        this.total = this.employees.length;
        this.listLoading = false;
      });
    },
    searchEmployees() {
      if (this.org.orgId > 0) {
        let para = { orgtype: this.org.orgType, orgid: this.org.orgId };
        this.listLoading = true;
        return employeeAPI.searchEmployee(para).then(res => {
          this.employees = res.data;
          this.total = this.employees.length;
          this.listLoading = false;
        });
      } else {
        this.$message.error("请选择公司、企业或客户后，再次尝试查询");
      }
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.employeeEntityForm = Object.assign({}, row);
      if (1 === this.employeeEntityForm.orgType) {
        //this.orgs = this.companies.map(item => {return {id:item.id,orgname:item.companyName};});
        this.employeeFormAttr.title = "修改公司员工";
      } else if (2 === this.employeeEntityForm.orgType) {
        //this.orgs = this.enterprises.map(item => {return {id:item.id,orgname:item.enterpriseName};});
        this.employeeFormAttr.title = "修改企业员工";
      }
      this.employeeFormAttr.editVisable = true;
    },
    //编辑
    editSubmit: function() {
      this.$refs.editEmployeeEntityForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.employeeEntityForm);
            console.log(para);

            employeeAPI.editEmployee(para).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editEmployeeEntityForm"].resetFields();
              this.employeeFormAttr.editVisable = false;
              this.searchEmployees();
            });
          });
        }
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addEmployeeEntityForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.employeeEntityForm);
            console.log(para);

            employeeAPI.addEmployee(para).then(res => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["addEmployeeEntityForm"].resetFields();
              this.employeeFormAttr.addVisable = false;
              this.searchEmployees();
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
    this.listLoading = true;
    employeeAPI
      .all([
        companyAPI.getCompanyList(),
        enterpriseAPI.getEnterpriseList(),
        customerAPI.getCustomerList()
      ])
      .then(res => {
        this.companies = res[0].data;
        this.enterprises = res[1].data;
        this.customers = res[2].data;
        this.listLoading = false;
      });
  }
};
</script>

<style scoped>

</style>