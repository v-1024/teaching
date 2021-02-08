<template>
    <div class="box">
        <el-table
                :data="tableData"
                border
                stripe
                :default-sort = "{prop: 'date', order: 'ascending'}"
                height="600px"
                style="width: 100%">
            <el-table-column prop="registertime" label="申请日期" sortable></el-table-column>
            <el-table-column prop="t_id" label="员工号"></el-table-column>
            <el-table-column prop="t_name" label="姓名"></el-table-column>
            <el-table-column prop="college" label="学院"></el-table-column>
            <el-table-column prop="department" label="系部"></el-table-column>
            <el-table-column prop="tel" label="电话号码"></el-table-column>
            <el-table-column label="是否通过">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="pass(scope.$index, scope.row)">通过</el-button>

                    <el-button
                            size="mini"
                            type="danger"
                            @click="remove(scope.$index)">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {request} from "../../../network/request";
    import {queryData} from "../../../pubRequest/queryData";

    export default {
        name: "reg_audit" ,
        data() {
            return {
                tableData: []
            }
        } ,
        created() {
            this.showData();
        } ,
        methods: {
            showData() {
                const url = 'HandOfDept/checkregister' ;
                const data = {
                    college: sessionStorage.getItem('college') ,
                    department: sessionStorage.getItem('department')
                };
                queryData(url , data).then(res => {
                    this.tableData = res.data;
                })
            } ,
            pass (index , row) {
                //更新数据库，将通过的教师信息插入数据库（插入成功后给出成功提示信息并移除该条申请，反之..）
                request({
                    url: "HandOfDept/checkregisterupdate" ,
                    method: "post" ,
                    params: {
                        t_id: row.t_id
                    }
                }).then(res => {
                    if (res.data.msg === 'success') {
                        this.showData();
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                    }
                })
            },
            remove(index) {
                this.$confirm('是否移除此条申请？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '移除成功!'
                    });
                    this.tableData.splice(index-1 , 1);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消移除'
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>