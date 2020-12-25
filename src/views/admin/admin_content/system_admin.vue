<template>
    <div class="box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="学期设置" >
                <el-input v-model="formInline.term" placeholder="示例：2020-2021-1" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-date" @click="term_btn">确认</el-button>
            </el-form-item>
            <el-form-item label="新增学院/系部">
                    <el-autocomplete
                            clearable
                            v-model="formInline.col_name"
                            :fetch-suggestions="querySearch"
                            placeholder="输入学院"></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-plus" @click="col_add()">确认</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="编辑学院/系部信息" :visible.sync="dialogFormVisible" :before-close="before_close">
            <el-form>
                <el-form-item label="学院" label-width="120px">
                    <el-input v-model="formInline.col_name" style="width: 400px" clearable></el-input>
                </el-form-item>
                <el-form-item label="系部" label-width="120px">
                    <el-input v-model="formInline.new_dep" style="width: 400px" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">确 定</el-button>
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
                :row-key='getRowKeys'
                style="width: 100%">

            <!--系部信息、操作-->
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table stripe border :data="props.row.dep">
                        <el-table-column label="系部" prop="dep_name" align="center"></el-table-column>
                        <el-table-column label="状态" prop="dep_state" align="center">
                            <!--作用域插槽-->
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.dep_state"></el-switch>
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
                <template scope="scope">
                    <div style="height: 42px ; line-height: 42px">
                        <el-input v-model="scope.row.col_name" v-show="!scope.row.col_edit" class="input"></el-input>
                        <span v-show="scope.row.col_edit">{{scope.row.col_name}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="col_state" align="center">
                <!--作用域插槽-->
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.col_state"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <div class="div">
                        <el-button
                            size="medium"
                            type="primary"
                            v-show="scope.row.col_btn"
                            @click="col_editor(scope.$index, scope.row)">编辑</el-button>

                    <el-button
                            size="medium"
                            type="primary"
                            v-show="!scope.row.col_btn"
                            @click="col_saver(scope.$index, scope.row)">保存</el-button>
                    </div>
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
                flag: '0' ,
                college: [],
                expands: [],//只展开一行放入当前行col_name
                getRowKeys(row){
                    return row.col_name
                },
                formInline: {
                    term: '',
                    col_name: '',
                    new_dep: ''
                },
                dialogFormVisible: false ,
                tableData: [
                    {
                        col_name: '计算机科学与工程学院',
                        col_state: true,
                        col_edit: true,
                        col_btn: true,
                        dep:
                            [
                                {
                                    dep_name: '网络工程系',
                                    dep_state: true,
                                },
                                {
                                    dep_name: '软件工程系',
                                    dep_state: false,
                                }
                            ]
                    },
                    {
                        col_name: '体育学院',
                        col_state: true,
                        col_edit: true,
                        col_btn: true,
                        dep:
                            [
                                {
                                    dep_name: '体育教育系',
                                    dep_state: true,
                                }
                            ]
                    }
                ]
            }
        } ,
        mounted() {
            this.college = this.loadAll();
        } ,
        methods: {
            expandChange(row , expandedRows) {     //row表示当前点击的行的信息   expandRows表示已展开的行的信息
                //只展开一行
                if (expandedRows.length) {//说明展开了
                    this.expands = [];
                    if (row) {
                        this.expands.push(row.col_name)//只展开当前行的col_name
                    }
                } else {//说明收起了
                    this.expands = []
                }
            } ,
            loadAll() {      //后端获取
                return [
                    { "value": "计算机科学与工程学院"},
                    { "value": "体育学院"}
                ];
            },
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
                this.tableData[index].col_edit = false;
                this.tableData[index].col_btn = false
            } ,
            col_saver(index , row) {     //修改后上传到数据库,未修改则不发请求
                this.tableData[index].col_edit = true;
                this.tableData[index].col_btn = true
            } ,
            dep_editor(index , row) {
                //获取父级（学院）的信息
                this.formInline.col_name = this.expands[0];
                this.formInline.new_dep = row.dep_name;
                this.flag = '0';
                this.dialogFormVisible = true;
            } ,
            term_btn() {
                if (this.formInline.term == '')
                    this.$message.warning('学期不能为空！');
                else {
                    request({
                        url: 'Manager/addTerm' ,
                        method: 'post' ,
                        params: {
                            term: this.formInline.term
                        }
                    }).then (res => {
                        if (res.data.msg == 'success')
                            this.$message.success('修改成功');
                        else
                            this.$message.error('操作失败')
                    })
                }

            } ,
            col_add() {
                this.dialogFormVisible = true;
                this.flag = '1'
            } ,
            save() {     //插入新数据或更新系部信息(修改后传给后端)
                if (this.flag === '1')
                    console.log('新增学院和系部');
                else
                    console.log('修改系部');
                this.before_close();
            } ,
            before_close() {
                this.formInline.col_name = '';
                this.formInline.new_dep =  '';
                this.dialogFormVisible = false;
            } ,
        }
    }
</script>

<style scoped>
    .box {
        margin-top: 10px;
        text-align: center;
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