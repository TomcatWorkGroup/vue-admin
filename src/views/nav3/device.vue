<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="企业" prop="enterpriseId">
					<el-select v-model="filters.enterpriseId"
					value-key="id"
					filterable
					placeholder="请选择"
					@change="enterprisesSelectChange">
    					<el-option
      						v-for="item in enterprises"
      						:key="item.id"
      						:label="item.enterpriseName"
      						:value="item.id">
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item label="厂商" prop="manufacturerId">
				<el-select v-model="filters.manufacturerId"
					value-key="id"
					filterable
					placeholder="请选择"
					@change="manufacturerSelectChange">
    					<el-option
      						v-for="item in manufacturers"
      						:key="item.id"
      						:label="item.manufacturerName"
      						:value="item.id">
    					</el-option>
  					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="searchDevice">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="devices" highlight-current-row v-loading="uiAttr.listTable.listLoading" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="deviceNo" label="设备编号">
			</el-table-column>
			<el-table-column prop="nickName" label="设备昵称">
			</el-table-column>
			<el-table-column prop="status" label="销售状态" :formatter="formatStatus">
			</el-table-column>
			<el-table-column prop="runStatus" label="运行状态" :formatter="formatRunStatus">
			</el-table-column>
			<el-table-column prop="importDatetime" label="导入时间" :formatter="formatDatetime">
			</el-table-column>
			<el-table-column label="操作"  width="150">
				<template scope="scope">
					<el-button type="danger" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button type="primary" size="small" @click="handleManage(scope.$index, scope.row)">监管</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="uiAttr.editDlg.visable" :close-on-click-modal="false">
			<el-form :model="deviceEntity" label-width="80px" :rules="editDeviceFormRules" ref="editDeviceForm">
				<el-form-item label="企业">
					{{deviceEntity.enterpriseName}}
				</el-form-item>
				<el-form-item label="厂商">
					{{deviceEntity.manufacturerName}}
				</el-form-item>
				<el-form-item label="设备编号" prop="deviceNo">
					<el-input v-model="deviceEntity.deviceNo" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="设备昵称" prop="nickName">
					<el-input v-model="deviceEntity.nickName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="deviceEntity.status">
						<el-radio class="radio" :label="0">未售出</el-radio>
						<el-radio class="radio" :label="1">已售出</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="运行状态">
					<el-radio-group v-model="deviceEntity.runStatus">
						<el-radio class="radio" :label="0">待定</el-radio>
					</el-radio-group>
				</el-form-item>
				</el-form>			
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="uiAttr.editDlg.visable = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="uiAttr.editDlg.loading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="uiAttr.addDlg.visable" :close-on-click-modal="false">
			<el-form :model="deviceEntity" label-width="80px" :rules="addDeviceFormRules" ref="addDeviceForm">
				<el-form-item label="企业">
					{{deviceEntity.enterpriseName}}
				</el-form-item>
				<el-form-item label="厂商">
					{{deviceEntity.manufacturerName}}
				</el-form-item>
				<el-form-item label="设备编号" prop="deviceNo">
					<el-input v-model="deviceEntity.deviceNo" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="设备昵称" prop="nickName">
					<el-input v-model="deviceEntity.nickName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="deviceEntity.status">
						<el-radio class="radio" :label="0">未售出</el-radio>
						<el-radio class="radio" :label="1">已售出</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="运行状态">
					<el-radio-group v-model="deviceEntity.runStatus">
						<el-radio class="radio" :label="0">待定</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="uiAttr.addDlg.visable = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="uiAttr.addDlg.loading">提交</el-button>
			</div>
		</el-dialog>

    <!--监管界面-->
		<el-dialog title="设备监管" v-model="uiAttr.manageDlg.visable" :close-on-click-modal="false">
      <div  style="width: 80%; margin:auto auto">
        <el-transfer
        :titles="manageMapData.titles"
        v-model="manageMapData.mapItems"
        :props="{
          key: 'key',
          label: 'label'
        }"
        :data="manageMapData.noMapEmployees"
        @change="transferChange"
        >
        </el-transfer>
      </div>
		</el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import * as manufacturerAPI from "../../api/manufacturer";
import * as enterpriseAPI from "../../api/enterprise";
import * as deviceAPI from "../../api/device";
import * as deviceEmployeeMapAPI from "../../api/deviceEmployeeMap";
import * as employeeAPI from "../../api/employee";

export default {
  data() {
    return {
      filters: {
        manufacturerId: "",
        enterpriseId: ""
      },
      enterprises: [],
      manufacturers: [],
      devices: [],
      deviceFilters: [],
      uiAttr: {
        editDlg: { visable: false, loading: false },
        addDlg: { visable: false, loading: false },
        manageDlg: { visable: false },
        listTable: { listLoading: false }
      },
      manageMapData: {
        enterpriseId: 0,
        deviceId: 0,
        titles: ["可用员工", "已参与监管员工"],
        actions: { ADD: "right", SUB: "left" },
        mapItems: [],
        noMapEmployees: [],
        employees: []
      },
      deviceEntity: {
        id: 0,
        enterpriseId: "",
        enterpriseName: "",
        deviceNo: "",
        manufacturerId: "",
        manufacturerName: "",
        status: -1,
        runStatus: -1,
        nickName: ""
      },
      addDeviceFormRules: {},
      editDeviceFormRules: {}
    };
  },
  methods: {
    formatStatus(row, column) {
      let txt = "未知";
      switch (row.status) {
        case 0:
          txt = "未售出";
          break;
        case 1:
          txt = "已售出";
          break;
      }
      return txt;
    },
    formatRunStatus(row, column) {
      let txt = "后续设置";
      return txt;
    },
    formatDatetime(row, column) {
      return util.formatDate.format(
        new Date(row.importDatetime),
        "yyyy-MM-dd hh:mm:ss"
      );
    },
    searchDevice() {
      if (this.filters.enterpriseId > 0 && this.filters.manufacturerId > 0) {
        this.uiAttr.listTable.listLoading = true;

        let para = Object.assign({}, this.filters);
        deviceAPI.searchDevice(para).then(res => {
          this.devices = res.data;
          this.uiAttr.listTable.listLoading = false;
        });
      } else {
        this.$message.error("请选择企业与厂商后，再次尝试查询");
      }
    },
    enterprisesSelectChange(value) {
      let eps = this.enterprises.find((item, index, arr) => {
        if (value === item.id) return true;
      });
      if (undefined != eps) {
        this.deviceEntity.enterpriseName = eps.enterpriseName;
        this.deviceEntity.enterpriseId = eps.id;
      }
    },
    manufacturerSelectChange(value) {
      let man = this.manufacturers.find((item, index, arr) => {
        if (this.filters.manufacturerId === item.id) {
          return true;
        }
      });
      if (undefined != man) {
        this.deviceEntity.manufacturerName = man.manufacturerName;
        this.deviceEntity.manufacturerId = man.id;
      }
    },
    handleAdd() {
      if (this.filters.enterpriseId > 0 && this.filters.manufacturerId > 0) {
        this.uiAttr.addDlg.visable = true;
      } else {
        this.$message.error("请先选择企业与厂商！");
      }
    },
    handleEdit(index, row) {
      this.deviceEntity.id = row.id;
      this.deviceEntity.enterpriseId = row.enterpriseId;
      this.deviceEntity.deviceNo = row.deviceNo;
      this.deviceEntity.manufacturerId = row.manufacturerId;
      this.deviceEntity.status = row.status;
      this.deviceEntity.runStatus = row.runStatus;
      this.deviceEntity.nickName = row.nickName;
      this.uiAttr.editDlg.visable = true;
    },
    filterNoMapEmployeeForDevice() {
      let x = this.manageMapData.employees
        .filter(item => {
          let e = this.manageMapData.mapItems.find((v, i, a) => {
            if (v.empanyeeId === item.id) return true;
          });
          if (undefined == e) return true;
        })
        .map((v, i, a) => {
          return { label: v.realName, key: v.id, disable: v.status > 0 };
        });
      //console.log(x);
      return x;
    },
    filterEnterpriseMapEmployeeForDevice(data) {
      let x = data
        .filter(item => {
          if (
            item.orgType === 2 &&
            item.orgId === this.manageMapData.enterpriseId
          )
            return true;
        })
        .map((v, i, a) => {
          //return { label: v.realName, key: v.employeeId };
          return v.employeeId;
        });

      //console.log(x);
      return x;
    },
    handleManage(index, row) {
      this.uiAttr.manageDlg.visable = true;
      if (
        this.manageMapData.enterpriseId == row.enterpriseId &&
        this.manageMapData.deviceId == row.id
      ) {
        console.log("***************不请求数据*****************");
        return;
      } else if (
        this.manageMapData.enterpriseId == row.enterpriseId &&
        this.manageMapData.deviceId != row.id
      ) {
        this.manageMapData.deviceId = row.id;
        deviceEmployeeMapAPI.searchByDevice({ deviceId: row.id }).then(res => {
          this.manageMapData.mapItems = this.filterEnterpriseMapEmployeeForDevice(
            res.data
          );
          console.log("***************ajax请求Map种数据*****************");
        });
        this.manageMapData.noMapEmployees = this.filterNoMapEmployeeForDevice();
      } else {
        console.log(
          "device->" + row.id + "  enterpriseId->" + row.enterpriseId
        );

        this.manageMapData.deviceId = row.id;
        this.manageMapData.enterpriseId = row.enterpriseId;

        deviceAPI
          .all([
            deviceEmployeeMapAPI.searchByDevice({ deviceId: row.id }),
            employeeAPI.searchEmployee({ orgType: 2, orgId: row.enterpriseId })
          ])
          .then(res => {
            console.log(res[0].data);
            console.log(res[1].data);

            this.manageMapData.mapItems = this.filterEnterpriseMapEmployeeForDevice(
              res[0].data
            );
            console.log("***************ajax请求2种数据*****************");
            //console.log(this.manageMapData.mapItems);

            this.manageMapData.employees = res[1].data;
            this.manageMapData.noMapEmployees = this.filterNoMapEmployeeForDevice();
          });
      }
    },
    addSubmit() {
      this.$refs.addDeviceForm.validate(valid => {
        if (valid) {
          this.$confirm("确认要提交吗？", "提示", {}).then(() => {
            this.uiAttr.addDlg.loading = true;
            let para = Object.assign({}, this.deviceEntity);
            deviceAPI.addDevice(para).then(res => {
              this.uiAttr.addDlg.loading = false;
              this.$message({ message: "提交成功", type: "success" });
              this.$refs.addDeviceForm.resetFields();
              this.uiAttr.addDlg.visable = false;
              this.searchDevice();
            });
          });
        }
      });
    },
    editSubmit() {
      this.$refs.editDeviceForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.uiAttr.editDlg.loading = true;
            let para = Object.assign({}, this.deviceEntity);
            //console.log(para);

            deviceAPI.editDevice(para).then(res => {
              this.uiAttr.editDlg.loading = false;
              this.$message({ message: "提交成功", type: "success" });
              this.$refs.editDeviceForm.resetFields();
              this.uiAttr.editDlg.visable = false;
              this.searchDevice();
            });
          });
        }
      });
    },
    transferChange(p1, action, item) {
      if (action === this.manageMapData.actions.ADD) {
        let para = {
          employeeId: item[0],
          deviceId: this.manageMapData.deviceId
        };
        deviceEmployeeMapAPI.addMap(para).catch(error => {
          let index = this.manageMapData.mapItems.indexOf(item[0]);
          this.manageMapData.mapItems.splice(index, 1);
          this.$message.error("添加用户监管失败");
        });
      } else {
        let para = {
          employeeId: item[0],
          deviceId: this.manageMapData.deviceId
        };
        deviceEmployeeMapAPI.deleteMap(para).catch(error => {
          this.manageMapData.mapItems.push(item[0]);
          this.$message.error("删除用户监管失败");
        });
      }
      // console.log(p1);
      // console.log(action);
      // console.log(item.label);
      // console.log(this.manageMapData.noMapEmployees);
    }
  },
  mounted() {
    deviceAPI
      .all([
        manufacturerAPI.getManufacturerList(),
        enterpriseAPI.getEnterpriseList()
      ])
      .then(res => {
        this.manufacturers = res[0].data;
        this.enterprises = res[1].data;
      });
  }
};
</script>

<style scoped>

</style>