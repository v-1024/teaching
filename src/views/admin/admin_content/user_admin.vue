<template>
    <div class="box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="教师">
                <el-input v-model="formInline.t_name" placeholder="教师" clearable></el-input>
            </el-form-item>
            <el-form-item label="教师状态">
                <el-select v-model="formInline.state" placeholder="教师状态" clearable>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位">
                <el-select v-model="formInline.role" placeholder="职位" clearable>
                    <el-option label="教师" value="教师"></el-option>
                    <el-option label="系主任" value="系主任"></el-option>
                    <el-option label="教务办" value="教务办"></el-option>
                    <el-option label="院长" value="院长"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
            </el-form-item>
        </el-form>
        <template>
            <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width: 100%">
                <el-table-column prop="t_id" label="员工号" width="100px"></el-table-column>
                <el-table-column prop="t_name" label="姓名" width="100px"></el-table-column>
                <el-table-column prop="sex" label="性别" width="80px"></el-table-column>
                <el-table-column prop="college" label="学院" width="200px"></el-table-column>
                <el-table-column prop="department" label="系部"></el-table-column>
                <el-table-column prop="role" label="职位" width="100px"></el-table-column>
                <el-table-column prop="tel" label="电话号码"></el-table-column>
                <el-table-column prop="address" label="办公地点"></el-table-column>
                <el-table-column prop="email" label="Email"></el-table-column>
                <el-table-column label="状态" width="90px">
                    <!--作用域插槽-->
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state" @change="switch_change(scope.row , $event)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="edit(scope.row)">修改信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible"
                   :before-close="before_close" width="700px">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="学院" label-width="100px">
                    <el-input v-model="dialogForm.college" style="width: 300px" clearable></el-input>
                </el-form-item>
                <el-form-item label="系部" label-width="100px">
                    <el-input v-model="dialogForm.department" style="width: 300px" clearable></el-input>
                </el-form-item>
                <el-form-item label="职位" label-width="100px">
                    <el-input v-model="dialogForm.role" style="width: 300px" clearable></el-input>
                </el-form-item>
                <el-form-item label="办公地点" label-width="100px">
                    <el-input v-model="dialogForm.address" style="width: 300px" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="warning" @click="reset_pwd()">重置密码</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../../../network/request";
    import {queryData} from "../../../pubRequest/queryData";

    export default {
        name: "user_admin" ,
        data() {
            return {
                formInline: {
                    t_id: '',
                    t_name: '' ,
                    state: '' ,
                    role: '' ,
                } ,
                dialogFormVisible: false ,
                tableData: [] ,
                dialogForm: {
                    t_id: '' ,
                    college: '' ,
                    department: '' ,
                    role: '' ,
                    address: ''
                }
            }
        } ,
        created() {
            this.requestDate();
        } ,
        methods: {
            requestDate() {
               request({
                   url: 'Manager/UserManager' ,
                   method: 'get'
               }).then(res => {
                   this.tableData = res.data;
               })
            } ,
            edit(row) {
                this.dialogForm.college = row.college;
                this.dialogForm.department = row.department;
                this.dialogForm.role = row.role;
                this.dialogForm.address = row.address;
                this.dialogForm.t_id = row.t_id;
                this.dialogFormVisible = true;
            } ,
            reset_pwd() {
                this.$confirm('确认重置该用户的密码？')
                    .then(_ => {
                        request({
                            url: 'Manager/resetpwd' ,
                            method: 'put' ,
                            params: {
                                t_id: this.dialogForm.t_id ,
                                password: this.dialogForm.t_id
                            }
                        }).then(res => {
                            if (res.data.msg === 'success')
                                this.$message.success('重置密码成功')
                        })
                    })
                    .catch(_ =>{
                    });
            } ,
            before_close() {
                this.dialogForm.college = '';
                this.dialogForm.department =  '';
                this.dialogFormVisible = false;
            } ,
            save() {
                this.$confirm('确认修改该用户的信息？')
                    .then(_=> {
                        request({
                            url: 'Manager/update' ,
                            params: {
                                t_id: this.dialogForm.t_id ,
                                college: this.dialogForm.college ,
                                department: this.dialogForm.department ,
                                role: this.dialogForm.role ,
                                address: this.dialogForm.address ,
                            } ,
                            method: 'put'
                        }).then(res => {
                            if (res.data.msg === 'success') {
                                this.$message.success('修改成功');
                                this.requestDate();
                            }
                            else
                                this.$message.error('操作失败')
                        });
                        this.dialogFormVisible = false;
                    })
                    .catch(_ => {
                    });
            } ,
            switch_change(row , event) {     //event为switch当前的状态
                request({
                    url: 'Manager/updateState' ,
                    method: 'put' ,
                    params: {
                        t_id: row.t_id ,
                        state: event
                    }
                }).then(res => {
                    if (res.data.msg === 'success')
                        this.$message.success('修改成功');
                    else
                        this.$message.error('操作失败')
                })
            } ,
            query() {
                let url = 'Manager/findByItem';
                let data = {
                    t_name: this.formInline.t_name ,
                    state: this.formInline.state ,
                    role: this.formInline.role
                };
                queryData(url , data).then(res => {
                    this.tableData = res.data
                })
            }
        }
    }
</script>

<style scoped>
    .box {
        margin-top: 10px;
        text-align: center;
    }
</style>