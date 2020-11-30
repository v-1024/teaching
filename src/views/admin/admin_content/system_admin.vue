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
                            placeholder="输入学院"
                            @select="handleSelect"></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-plus" @click="col_add">确认</el-button>
            </el-form-item>
        </el-form>

        <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                >

            <!--系部信息、操作-->
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-table stripe border :data="props.row.dep">
                        <el-table-column label="系部" prop="dep_name">
                            <template scope="scope">
                                <el-input v-model="scope.row.dep_name" v-show="!scope.row.dep_edit"></el-input>
                                <span v-show="scope.row.dep_edit">{{scope.row.dep_name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态" prop="dep_state">
                            <!--作用域插槽-->
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.dep_state"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="medium"
                                        type="primary"
                                        v-show="scope.row.dep_btn"
                                        @click="dep_editor(scope.$index, scope.row)">编辑</el-button>

                                <el-button
                                        size="medium"
                                        type="primary"
                                        v-show="!scope.row.dep_btn"
                                        @click="dep_saver(scope.$index, scope.row)">保存</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>


            <!--学院信息、操作-->
            <el-table-column label="学院" prop="col_name">
                <template scope="scope">
                    <el-input v-model="scope.row.col_name" v-show="!scope.row.col_edit" style="width: 200px;"></el-input>
                    <span v-show="scope.row.col_edit">{{scope.row.col_name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" prop="col_state">
                <!--作用域插槽-->
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.col_state"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
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
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "system_admin",
        data() {
            return {
                college: [],
                formInline: {
                    term: '',
                    col_name: '',
                },
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
                                    dep_edit: true,
                                    dep_btn: true
                                },
                                {
                                    dep_name: '软件工程系',
                                    dep_state: false,
                                    dep_edit: true,
                                    dep_btn: true
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
                                    dep_edit: true,
                                    dep_btn: true
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
            loadAll() {
                return [
                    { "value": "计算机科学与工程学院"},
                    { "value": "体育学院"}
                ];
            },
            handleSelect(item) {
                console.log(item);
            } ,


            col_editor(index , row) {
                this.tableData[index].col_edit = false;
                this.tableData[index].col_btn = false
            } ,
            col_saver(index , row) {
                this.tableData[index].col_edit = true;
                this.tableData[index].col_btn = true
            } ,
            dep_editor(index , row) {
                this.dep[index].dep_edit = false;
                this.dep[index].dep_btn = false
            } ,
            dep_saver(index , row ) {
                this.dep[index].dep_edit = true;
                this.dep[index].dep_btn = true
            } ,
            term_btn() {
                this.$message({
                    message: '学期设置成功！',
                    type: 'success'
                });
            } ,
            col_add() {
                console.log(this.formInline.col_name);
            }
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

</style>