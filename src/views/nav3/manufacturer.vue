<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="厂商名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="filterManufacturers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="manufacturerFilters" highlight-current-row v-loading="uiAttr.listTable.listLoading" style="width: 100%;">
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="manufacturerCode" label="厂商编码">
			</el-table-column>
			<el-table-column prop="manufacturerName" label="厂商名称">
			</el-table-column>
			<el-table-column label="操作"  width="150">
				<template scope="scope">
					<el-button type="danger" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="uiAttr.editDlg.visable" :close-on-click-modal="false">
			<el-form :model="manufacturerEntity" label-width="80px" :rules="editManufacturerFormRules" ref="editManufacturerForm">
				<el-form-item label="厂商编码" prop="manufacturerCode">
					<el-input v-model="manufacturerEntity.manufacturerCode" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="厂商名称" prop="manufacturerName">
					<el-input v-model="manufacturerEntity.manufacturerName" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="uiAttr.editDlg.visable = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="uiAttr.editDlg.loading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="uiAttr.addDlg.visable" :close-on-click-modal="false">
			<el-form :model="manufacturerEntity" label-width="80px" :rules="addManufacturerFormRules" ref="addManufacturerForm">
				<el-form-item label="厂商编码" prop="manufacturerCode">
					<el-input v-model="manufacturerEntity.manufacturerCode" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="厂商名称" prop="manufacturerName">
					<el-input v-model="manufacturerEntity.manufacturerName" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="uiAttr.addDlg.visable = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="uiAttr.addDlg.loading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
import util from "../../common/js/util";
//import NProgress from 'nprogress'
import * as manufacturerAPI from "../../api/manufacturer";

export default {
  data() {
    return {
	  filters:{name:''},
	  manufacturers: [],
	  manufacturerFilters:[],
      uiAttr: {
		
        editDlg: { visable: false,loading:false },
		addDlg: { visable: false,loading:false },
		listTable:{listLoading:false},
	  },
	  manufacturerEntity:{
		  id:0,
		  manufacturerCode:'',
		  manufacturerName:''
	  },
	  addManufacturerFormRules:{},
	  editManufacturerFormRules:{},
    };
  },
  methods: {
	  filterManufacturers(){
		this.uiAttr.listTable.loading = true;
		this.manufacturerFilters = this.manufacturers.filter(item=>{
			if(this.filters.name && item.manufacturerName.indexOf(this.filters.name)==-1)
				return false;
			return true;
		});
		this.uiAttr.listTable.loading = false;
	  },
	  getManufacturers(){
		this.uiAttr.listTable.listLoading = true;
	  	manufacturerAPI.getManufacturerList().then(res=>{
		  this.manufacturers = res.data;
		  this.manufacturerFilters = this.manufacturers;
		  this.uiAttr.listTable.listLoading = false;
	  	});
	  },
	  handleAdd(){
		  this.manufacturerEntity={};
		  this.uiAttr.addDlg.visable = true;
	  },
	  handleEdit(index,row){
		  this.manufacturerEntity = Object.assign({},row);
		  this.uiAttr.editDlg.visable = true;
	  },
	  addSubmit(){
		  this.$refs.addManufacturerForm.validate(valid=>{
			  if(valid){
				  this.$confirm("确认要提交吗？","提示",{}).then(()=>{
					  this.uiAttr.addDlg.loading = true;
					  let para = Object.assign({},this.manufacturerEntity);
					  manufacturerAPI.addManufacturer(para).then(res=>{
						  this.uiAttr.addDlg.loading = false;
						  this.$message({message:"提交成功",type:"success"});
						  this.$refs.addManufacturerForm.resetFields();
						  this.uiAttr.addDlg.visable = false;
						  this.getManufacturers();
					  });
				  });
			  }
		  });
	  },
	  editSubmit(){
		  this.$refs.editManufacturerForm.validate(valid=>{
			  if(valid){
				  this.$confirm("确认提交吗？","提示",{}).then(()=>{
					  this.uiAttr.editDlg.loading = true;
					  let para = Object.assign({},this.manufacturerEntity);
					  manufacturerAPI.editManufacturer(para).then(res=>{
						  this.uiAttr.editDlg.loading = false;
						  this.$message({message:'提交成功',type:'success'});
						  this.$refs.editManufacturerForm.resetFields();
						  this.uiAttr.editDlg.visable = false;
						  this.getManufacturers();
					  });
				  });
			  }
		  });
	  },
  },
  mounted() {
	  this.getManufacturers();
  }
};
</script>

<style scoped>

</style>