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
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="qurey">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
                border
                stripe
                :data="tableData"
                height="600px"
                style="width: 100%"
                :cell-style="setCellStyle">
            <el-table-column prop="t_id" label="员工号"></el-table-column>
            <el-table-column prop="t_name" label="姓名"></el-table-column>
            <el-table-column label="教学活动">
                <el-table-column prop="teachcheck_state" label="教学检查"></el-table-column>
                <el-table-column prop="teachplancheck_state" label="教案检查"></el-table-column>
            </el-table-column>
            <el-table-column label="教研活动">
                <el-table-column prop="achievement_state" label="教研成果"></el-table-column>
                <el-table-column prop="project_state" label="教研项目"></el-table-column>
                <el-table-column prop="award_state" label="教师奖励"></el-table-column>
                <el-table-column prop="thesis_state" label="教研论文"></el-table-column>
            </el-table-column>
            <el-table-column label="学生培养">
                <el-table-column prop="studentcompetition_state" label="学生竞赛"></el-table-column>
            </el-table-column>
            <el-table-column label="对外交流">
                <el-table-column prop="communication_state" label="交流考察"></el-table-column>
            </el-table-column>
            <el-table-column prop="teachercommit_state" label="教师是否确认"></el-table-column>
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
                        @click="reject(scope.$index, scope.row)">不通过</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-drawer
                :visible.sync="drawer"
                direction="rtl"
                :show-close="false"
                size="70%">
                <schedule_tab :term="formInline.def_term" :t_id="c_t_id"></schedule_tab>
        </el-drawer>
    </div>
</template>

<script>
    import {request} from "../../../network/request";
    import {queryTerm} from "../../../pubRequest/queryTerm";
    import {queryTermLast} from "../../../pubRequest/queryTerm";
    import {queryData} from "../../../pubRequest/queryData";
    import Schedule_tab from "../../../components/schedule_tab";

    export default {
        name: "schedule" ,
        components: {Schedule_tab},
        data() {
            return {
                formInline: {
                    t_id: '',
                    t_name: '' ,
                    confirm: '' ,
                    def_term: '' ,  //当前学年（后端获取）：默认选中
                    term: []       //学年从后端获取
                } ,
                tableData: [] ,
                drawer: false ,
                c_t_id: ''
            }
        } ,
        created() {
            this.requestDate();
            queryTerm().then(res => {
                for (let i = 0 ; i < res.data.length ; i ++)
                    this.formInline.term.push(res.data[i].term);
            });
            queryTermLast().then(res =>{
                this.formInline.def_term = res.data[0].term;
            })
        } ,
        methods: {
            requestDate() {
                const url = 'HandOfDept/teachercommitspeed';
                const data = {
                    college: sessionStorage.getItem('college') ,                  //登录信息中获得
                    department: sessionStorage.getItem('department')
                };
                queryData(url , data).then(res =>{
                    this.tableData = res.data;
                })
            } ,
            details (index , row) {
                //转到该教师提交的材料的详情页
                this.c_t_id = row.t_id;
                this.drawer = true;
            },
            reject(index , row) {
                console.log(row);
                this.$confirm('是否驳回该教师提交的材料？', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    request({
                        url: 'HandOfDept/teachercommit' ,
                        method: 'post' ,
                        params: {
                            t_id: row.t_id ,
                            term: this.formInline.def_term
                        }
                    }).then(res => {
                        if (res.data.msg === 'success') {
                            this.requestDate();
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消驳回'
                    });
                });
            } ,
            qurey() {
                const url = 'HandOfDept/teachercommitspeed';
                const data = {
                    term: this.formInline.def_term ,
                    t_id: this.formInline.t_id ,
                    t_name: this.formInline.t_name ,
                    college: sessionStorage.getItem('college') ,                  //登录信息中获得
                    department: sessionStorage.getItem('department')
                };
                queryData(url , data).then(res =>{
                    this.tableData = res.data;
                })
            } ,
            setCellStyle({row, column, rowIndex, columnIndex}) {
                if (row.teachcheck_state === '已提交' && columnIndex === 2) {
                    return 'color: #409EFF'
                } else if (row.teachcheck_state === '未提交' && columnIndex === 2) {
                    return 'color: #F56C6C'
                }if (row.teachplancheck_state === '已提交' && columnIndex === 3) {
                    return 'color: #409EFF'
                } else if (row.teachplancheck_state === '未提交' && columnIndex === 3) {
                    return 'color: #F56C6C'
                }if (row.achievement_state === '已提交' && columnIndex === 4) {
                    return 'color: #409EFF'
                } else if (row.achievement_state === '未提交' && columnIndex === 4) {
                    return 'color: #F56C6C'
                }if (row.project_state === '已提交' && columnIndex === 5) {
                    return 'color: #409EFF'
                } else if (row.project_state === '未提交' && columnIndex === 5) {
                    return 'color: #F56C6C'
                }if (row.award_state === '已提交' && columnIndex === 6) {
                    return 'color: #409EFF'
                } else if (row.award_state === '未提交' && columnIndex === 6) {
                    return 'color: #F56C6C'
                }if (row.thesis_state === '已提交' && columnIndex === 7) {
                    return 'color: #409EFF'
                } else if (row.thesis_state === '未提交' && columnIndex === 7) {
                    return 'color: #F56C6C'
                }if (row.studentcompetition_state === '已提交' && columnIndex === 8) {
                    return 'color: #409EFF'
                } else if (row.studentcompetition_state === '未提交' && columnIndex === 8) {
                    return 'color: #F56C6C'
                }if (row.communication_state === '已提交' && columnIndex === 9) {
                    return 'color: #409EFF'
                } else if (row.communication_state === '未提交' && columnIndex === 9) {
                    return 'color: #F56C6C'
                }if (row.teachercommit_state === '已确认' && columnIndex === 10) {
                    return 'color: #409EFF'
                } else if (row.teachercommit_state === '未确认' && columnIndex === 10) {
                    return 'color: #F56C6C'
                }
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