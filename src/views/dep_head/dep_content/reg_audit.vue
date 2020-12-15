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
            <el-table-column prop="college_name" label="学院"></el-table-column>
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

    export default {
        name: "reg_audit" ,
        data() {
            return {
                tableData: [
                    // {
                    //     date: '2016-05-02',
                    //     t_id: '150111' ,
                    //     t_name: '张三',
                    //     col_name: '计算机科学与工程学院' ,
                    //     dep_name: '网络工程系' ,
                    //     t_tel: '12345678911' ,
                    // } ,
                    // {
                    //     date: '2016-05-01',
                    //     t_id: '150110' ,
                    //     t_name: '李四',
                    //     col_name: '计算机科学与工程学院' ,
                    //     dep_name: '软件工程系' ,
                    //     t_tel: '12345678921' ,
                    // }
                ]
            }
        } ,
        created() {
            request({
                url: "HandOfDept/checkregister"
            }).then(res => {
                console.log(res.data);
                this.tableData.push(res.data[0])
            })
        } ,
        methods: {
            pass (index , row) {
                //更新数据库，将通过的教师信息插入数据库（插入成功后给出成功提示信息并移除该条申请，反之..）
                request({
                    url: "HandOfDept/checkregisterupdate" ,
                    method: "post" ,
                    data: {
                        t_id: row.t_id
                    }
                }).then(res => {
                    if (res.message === 'success') {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.tableData.splice(index - 1, 1);
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