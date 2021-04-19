<template>
    <div id="sys">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" id="quireForm2">
            <el-form-item label="学期设置" class="top_form">
                <el-input v-model="formInline.term" placeholder="示例：2020-2021-1" clearable></el-input>
            </el-form-item>
            <el-form-item class="top_btn">
                <el-button style="width: 160px ; height: 40px" type="primary" icon="el-icon-date" @click="term_btn">确认</el-button>
            </el-form-item>
            <el-form-item label="新增学院/系部" class="top_form">
                <el-autocomplete
                        clearable
                        v-model="formInline.col_name"
                        :fetch-suggestions="querySearch"
                        placeholder="输入学院"></el-autocomplete>
            </el-form-item>
            <el-form-item class="top_btn">
                <el-button style="width: 160px ; height: 40px" type="primary" icon="el-icon-plus" @click="col_add()">确认</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="新增学院/系部" :visible.sync="dialogFormVisible" :before-close="before_close">
            <el-form>
                <el-form-item label="学院id" label-width="120px">
                    <el-input v-model="formInline.col_id" style="width: 400px" clearable></el-input>
                </el-form-item>
                <el-form-item label="学院名称" label-width="120px">
                    <el-input v-model="formInline.col_name" style="width: 400px" clearable></el-input>
                </el-form-item>
                <el-form-item label="系部id" label-width="120px">
                    <el-input v-model="formInline.dep_id" style="width: 400px" clearable></el-input>
                </el-form-item>
                <el-form-item label="系部名称" label-width="120px">
                    <el-input v-model="formInline.new_dep" style="width: 400px" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑学院/系部信息" :visible.sync="edit_show" :before-close="before_close">
            <el-form>
                <el-form-item label="学院名称" label-width="120px" v-if="edit === '1'">
                    <el-input v-model="formInline.col_name" style="width: 400px" clearable></el-input>
                </el-form-item>
                <el-form-item label="系部名称" label-width="120px" v-if="edit === '0'">
                    <el-input v-model="formInline.new_dep" style="width: 400px" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="edit_show = false">取 消</el-button>
                <el-button type="primary" @click="edit_save">确 定</el-button>
            </div>
        </el-dialog>

        <!-- row-key：指定每行的key值-->
        <!--@expand-change：当行展开或收起时触发-->
        <!--expand-row-keys：展开行的key值，是一个数组类型-->
        <el-table
                :data="tableData"
                stripe
                @expand-change="expandChange"
                :expand-row-keys="expands"
                :row-key="getRowKeys"
                style="width: 100%">

            <!--系部信息、操作-->
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table stripe border :data="props.row.dep">
                        <el-table-column label="系部" prop="dep_name" align="center"></el-table-column>
                        <el-table-column label="状态" prop="dep_state" align="center">
                            <!--作用域插槽-->
                            <template slot-scope="scope">
                                <el-switch @change="dep_switch(scope.row , $event)" v-model="scope.row.dep_state" ></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button
                                        size="medium"
                                        type="primary"
                                        @click="dep_editor(scope.$index, scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>


            <!--学院信息、操作-->
            <el-table-column label="学院" prop="col_name" align="center">
                <!--<template slot-scope="scope">
                    <div style="height: 42px ; line-height: 42px">
                        &lt;!&ndash;<el-input v-model="scope.row.col_name" v-show="!scope.row.col_edit" class="input"></el-input>&ndash;&gt;
                        <span>{{scope.row.col_name}}</span>
                    </div>
                </template>-->
            </el-table-column>
            <el-table-column label="状态" prop="col_state" align="center">
                <!--作用域插槽-->
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.col_state" @change="col_switch(scope.row , $event)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="medium"
                        type="primary"
                        @click="col_editor(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {request} from "../../../network/request";

    export default {
        name: "system_admin",
        data() {
            return {
                flag: '1' ,
                college: [],
                expands: [],		//只展开一行放入当前行col_name
                getRowKeys(row){     //返回该行的key值
                    return row.col_name
                },
                formInline: {
                    term: '',
                    col_name: '',
                    col_id: '' ,
                    new_dep: '' ,
                    dep_id: ''
                },
                sel_college: '' ,
                dialogFormVisible: false ,
                edit_show: false ,
                edit: '1' ,
                tableData: []
            }
        } ,
        created() {
            this.requestData();
        } ,
        methods: {
            requestData() {
                let college = [];
                request({
                    url: 'Manager/showCollege' ,
                    method: 'get'
                }).then(res => {
                    console.log(res.data);
                    this.tableData = res.data;
                    for (let i in res.data) {            //新增学院输入框的提示内容
                        college.push({
                            "value" : res.data[i].col_name
                        })
                    }
                    this.college = college;
                })
            } ,
            //row表示当前点击的行的信息   expandRows表示已展开的行的信息
            expandChange(row , expandedRows) {
                //只展开一行
                if (expandedRows.length) {//说明展开了
                    this.expands = [];
                    if (row) {
                        this.expands.push(row.col_name);  //只展开当前行的col_name
                        this.sel_college = row.col_name
                    }
                } else {//说明收起了
                    this.expands = [];
                    this.sel_college = ''
                }
            } ,
            querySearch(queryString, cb) {
                const col = this.college;
                const results = queryString ? col.filter(this.createFilter(queryString)) : col;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (college) => {
                    return (college.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            col_editor(index , row) {
                this.formInline.col_name = row.col_name;
                this.formInline.col_id = row.c_id;
                this.edit = '1';
                this.edit_show = true;
            } ,
            /*col_saver(index , row) {     //修改后上传到数据库,未修改则不发请求
                this.tableData[index].col_edit = true;
                this.tableData[index].col_btn = true
            } ,*/
            dep_editor(index , row) {
                //获取父级（学院）的信息
                this.formInline.col_name = this.expands[0];
                this.formInline.new_dep = row.dep_name;
                this.formInline.dep_id = row.d_id;
                this.edit = '0';
                this.edit_show = true;
            } ,
            edit_save() {
                if (this.edit === '1') {
                    request({
                        url: 'Manager/modifyCollegeName' ,
                        method: 'put' ,
                        params: {
                            c_id: this.formInline.col_id ,
                            college: this.formInline.col_name
                        }
                    }).then(res => {
                        if (res.data.msg === 'success') {
                            this.$message.success('编辑学院信息成功');
                            this.requestData();
                        }
                    })
                }
                else {
                    request({
                        url: 'Manager/modifyDepName' ,
                        method: 'put' ,
                        params: {
                            d_id: this.formInline.dep_id ,
                            department: this.formInline.new_dep ,
                            college: this.formInline.col_name
                        }
                    }).then(res => {
                        if (res.data.msg === 'success') {
                            this.$message.success('编辑系部信息成功');
                            this.requestData();
                        }
                    })
                }
                this.edit_show = false;
            } ,
            term_btn() {
                if (this.formInline.term === '')
                    this.$message.warning('学期不能为空！');
                else {
                    request({
                        url: 'Manager/addTerm' ,
                        method: 'post' ,
                        params: {
                            term: this.formInline.term
                        }
                    }).then (res => {
                        if (res.data.msg === 'success')
                            this.$message.success('修改成功');
                        else
                            this.$message.error('操作失败')
                    })
                }

            } ,
            col_add() {
                for (let i in this.tableData) {
                    if (this.tableData[i].col_name === this.formInline.col_name) {
                        this.formInline.col_id = this.tableData[i].c_id;
                        this.flag = '0'
                    }
                }
                this.dialogFormVisible = true;
            } ,
            save() {     //插入新数据或更新系部信息(修改后传给后端)
                if (this.formInline.col_id !== '' && this.formInline.col_name !== '' &&
                    this.formInline.dep_id !== '' && this.formInline.new_dep !== '') {
                    if (this.flag === '1') {
                        request({
                            url: 'Manager/College' ,
                            method: 'post' ,
                            params: {
                                c_id: this.formInline.col_id,
                                college: this.formInline.col_name,
                                d_id: this.formInline.dep_id,
                                d_name: this.formInline.new_dep
                            }
                        }).then(res => {
                            if (res.data.msg === 'success') {
                                this.requestData();
                                this.$message.success('新增学院和系部成功');
                            }
                        });
                    }
                    else {
                        request({
                            url: 'Manager/raeseDept' ,
                            method: 'post' ,
                            params: {
                                c_id: this.formInline.col_id,
                                college: this.formInline.col_name,
                                d_id: this.formInline.dep_id,
                                d_name: this.formInline.new_dep
                            }
                        }).then(res => {
                            if (res.data.msg === 'success') {
                                this.requestData();
                                this.$message.success('新增系部成功');
                                this.flag = '1'
                            }
                        });
                    }
                }
                this.before_close();
            } ,
            before_close() {
                this.formInline.col_name = '';
                this.formInline.new_dep =  '';
                this.formInline.col_id =  '';
                this.formInline.dep_id =  '';
                this.dialogFormVisible = false;
                this.edit_show = false;
            } ,
            col_switch(row , event) {
                request({
                    url: 'Manager/updateCollegeState' ,
                    method: 'put' ,
                    params: {
                        c_id: row.c_id ,
                        state: event
                    }
                }).then(res => {
                    if (res.data.msg === 'success')
                        this.$message.success('修改学院状态成功');
                })
            } ,

            dep_switch(row , event) {
                request({
                    url: 'Manager/updateDeptState' ,
                    method: 'put' ,
                    params: {
                        college: this.sel_college ,
                        d_id: row.d_id ,
                        state: event
                    }
                }).then(res => {
                    if (res.data.msg === 'success')
                        this.$message.success('修改系部状态成功');
                })
            }
        }
    }
</script>

<style>
    #sys {
        margin-top: 10px;
        text-align: center;
    }
    #quireForm2 .top_form {
        width: 30%;
        margin-top: 10px;
    }

    #quireForm2 .top_btn {
        width: 15%;
        margin-top: 10px;
    }

    #quireForm2 .el-input__inner {
        width: 300px;
    }

    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .input {
        height: 40px;
        width: 200px;
    }

    .div {
        height: 42px;
        line-height: 42px;
        position: absolute ;
        bottom: 12px;
        right:210px;
    }
</style>