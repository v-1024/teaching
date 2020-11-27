<template>
    <div class="box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="学年">
                <!--v-model:默认选中当前学年-->
                <el-select placeholder="学年" v-model="formInline.def_term" clearable>
                    <el-option :label="item" :value="item" v-for="item in formInline.term">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="员工号">
                <el-input v-model="formInline.t_id" placeholder="员工号" clearable></el-input>
            </el-form-item>
            <el-form-item label="教师">
                <el-input v-model="formInline.t_name" placeholder="教师" clearable></el-input>
            </el-form-item>
            <el-form-item label="教师是否确认">
                <el-select v-model="formInline.confirm" placeholder="教师是否确认" clearable>
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="" icon="el-icon-search">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
                border
                stripe
                :data="tableData"
                height="600px"
                style="width: 100%">
            <el-table-column
                    prop="t_name"
                    label="姓名">
            </el-table-column>
            <el-table-column
                    prop="t_id"
                    label="员工号">
            </el-table-column>
            <el-table-column label="教学活动">
                <el-table-column
                        prop="activity"
                        label="教学检查">
                </el-table-column>
                <el-table-column
                        prop="check"
                        label="教案检查">
                </el-table-column>
            </el-table-column>
            <el-table-column label="教研活动">
                <el-table-column
                        prop="achievement"
                        label="教研成果">
                </el-table-column>
                <el-table-column
                        prop="project"
                        label="教研项目">
                </el-table-column>
                <el-table-column
                        prop="award"
                        label="教师奖励">
                </el-table-column>
            </el-table-column>
            <el-table-column label="学生培养">
                <el-table-column
                        prop="competition"
                        label="学生竞赛">
                </el-table-column>
            </el-table-column>
            <el-table-column label="对外交流">
                <el-table-column
                        prop="exchange"
                        label="交流考察">
                </el-table-column>
            </el-table-column>
            <el-table-column label="备注">
                <el-table-column
                        prop="confirm"
                        label="教师是否确认">
                </el-table-column>
            </el-table-column>
            <el-table-column label="是否通过" width="190px">
                <template slot-scope="scope">
                    <el-tooltip content="查看教师提交材料的详细内容" placement="left-start" effect="light">
                        <el-button
                                size="mini"
                                type="primary"
                                @click="details(scope.$index, scope.row)">审核</el-button>
                    </el-tooltip>

                    <el-button
                            size="mini"
                            type="danger"
                            @click="reject(scope.$index)">不通过</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "schedule" ,
        data() {
            return {
                formInline: {
                    t_id: '',
                    t_name: '' ,
                    confirm: '' ,
                    def_term: '2020-2021-1' ,  //当前学年（后端获取）：默认选中
                    term:         //学年从后端获取
                        [
                            '2020-2021-1' ,
                            '2019-2020-2'
                        ]
                } ,
                tableData: [
                    {
                        t_name: '张三',
                        t_id: '150222' ,
                        activity: '已完成',
                        check: '已完成',
                        achievement: '已完成',
                        project: '已完成' ,
                        award: '已完成' ,
                        competition: '已完成' ,
                        exchange: '已完成' ,
                        confirm: '是' ,
                    } ,
                    {
                        t_name: '李四',
                        t_id: '150220' ,
                        activity: '已完成',
                        check: '已完成',
                        achievement: '已完成',
                        project: '已完成' ,
                        award: '已完成' ,
                        competition: '已完成' ,
                        exchange: '已完成' ,
                        confirm: '是' ,
                    } ,
                    {
                        t_name: '王五',
                        t_id: '150221' ,
                        activity: '已完成',
                        check: '已完成',
                        achievement: '已完成',
                        project: '已完成' ,
                        award: '已完成' ,
                        competition: '已完成' ,
                        exchange: '无' ,
                        confirm: '否' ,
                    } ,
                    ]
            }
        } ,
    methods: {
        details (index , row) {
            //转到该教师提交的材料的详情页
            this.$message({
                type: 'success',
                message: '操作成功!'
            });
        },
        reject(index) {
            this.$confirm('是否驳回该教师提交的材料？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消驳回'
                });
            });
        } ,
    }
    }
</script>

<style scoped>
    .box {
        margin-top: 10px;
        text-align: center;
    }

    .el-table .warning-row {
        background: oldlace;
    }
</style>