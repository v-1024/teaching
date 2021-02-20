<template>
    <div>
        <el-card class="box-card">
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="教学检查" name="1">
                    <el-table class="table"
                              :data="tableData"
                              height="650px"
                              border
                              style="margin-bottom: 0">

                        <el-table-column
                                fixed
                                prop="t_name"
                                label="姓名" width="100px">
                        </el-table-column>
                        <el-table-column
                                fixed
                                prop="course"
                                label="课程" width="100px">
                        </el-table-column>
                        <el-table-column
                                prop="lessonplan"
                                label="授课计划" width="100px">
                        </el-table-column>
                        <el-table-column
                                prop="teachplan"
                                label="教案(有或无）" width="140px">
                        </el-table-column>
                        <el-table-column
                                prop="attendancenum"
                                label="课堂考勤(次)" width="140px">
                        </el-table-column>
                        <el-table-column
                                prop="attendancerate"
                                label="学生出勤率" width="100px">
                        </el-table-column>
                        <el-table-column
                                prop="correctinghomework"
                                label="作业批改(次)" width="140px">
                        </el-table-column>
                        <el-table-column
                                prop="answerscount"
                                label="辅导答疑(次)" width="100px">
                        </el-table-column>
                        <el-table-column
                                prop="onscheduleexperiment"
                                label="是否按计划设实验(随堂)" width="140px">
                        </el-table-column>
                        <el-table-column
                                prop="exitprogram"
                                label="教学中存在的问题"
                                width="140px">
                        </el-table-column>
                        <el-table-column
                                prop="remarks"
                                label="备注"
                                width="100px">
                        </el-table-column>
                        <el-table-column label="下载" width="140px" >
                            <template slot-scope="scope">
                                <el-dropdown @command="handleCommand">
                          <span class="el-dropdown-link">
                            文件下载<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item :command=scope.row.lessonplanpath>授课计划</el-dropdown-item>
                                        <el-dropdown-item :command=scope.row.classattendancepath>课堂考勤</el-dropdown-item>
                                        <el-dropdown-item :command=scope.row.answerpath>辅导答疑</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="教案检查" name="2">
                    <el-table  class="table"
                               :data="tableData"
                               height="650px"
                               border
                               style="margin-bottom: 0;width:100%">
                        <el-table-column prop="t_name" label="姓名" fixed>
                        </el-table-column>
                        <el-table-column prop="elecplan" label="是否是电子教案" width="100px">
                        </el-table-column>
                        <el-table-column prop="textplan" label="是否是文本文档" width="100px">
                        </el-table-column>
                        <el-table-column prop="planintegrated" label="教案是否完善" width="100px">
                        </el-table-column>
                        <el-table-column prop="attendancenum" label="考勤次数" width="100px">
                        </el-table-column>
                        <el-table-column prop="attendancerecord" label="考情是否有记录" width="100px">
                        </el-table-column>
                        <el-table-column prop="hearclass" label="听课次数" width="100px">
                        </el-table-column>
                        <el-table-column prop="assessclass" label="评课次数" width="100px">
                        </el-table-column>
                        <el-table-column prop="classrecord" label="听课是否有记录" width="100px">
                        </el-table-column>
                        <el-table-column prop="arrangehomework" label="布置作业次数" width="100px">
                        </el-table-column>
                        <el-table-column prop="correctinghomework" label="批改作业次数" width="100px">
                        </el-table-column>
                        <el-table-column prop="experimentcount" label="实验次数" width="100px">
                        </el-table-column>
                        <el-table-column prop="correctreportcount" label="批改实验报告次数" width="100px">
                        </el-table-column>
                        <el-table-column prop="homeworktype" label="电子作业/纸质作业" width="100px">
                        </el-table-column>
                        <el-table-column prop="experimenttype" label="实验类型" width="100px">
                        </el-table-column>
                        <el-table-column label="下载" width="140px">
                            <template slot-scope="scope">
                                <el-dropdown @command="handleCommand">
                          <span class="el-dropdown-link">
                            文件下载<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item :command=scope.row.teachplanpath>教案</el-dropdown-item>
                                        <el-dropdown-item :command=scope.row.homeworkpath>作业批改</el-dropdown-item>
                                        <el-dropdown-item :command=scope.row.experimentpath>实验计划</el-dropdown-item>
                                        <el-dropdown-item :command=scope.row.evaluationrecordspath>评课记录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="教研成果" name="3">
                    <el-table  class="table"
                               :data="tableData"
                               height="650px"
                               border
                               style="width:1000px;">
                        <el-table-column
                                prop="t_name"
                                label="教师姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="achievementname"
                                label="成果名称"
                                width="250">
                        </el-table-column>
                        <el-table-column
                                prop="level"
                                label="级别"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="examination"
                                label="审批部门">
                        </el-table-column>
                        <el-table-column label="下载">
                            <template slot-scope="scope">
                                <el-dropdown >
                        <span class="el-dropdown-link" @click="downLoad(scope.row.achieveprovepath)">
                            文件下载
                        </span>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="教研论文" name="4">
                    <el-table  class="table"
                               :data="tableData"
                               height="650px"
                               border
                               style="width:1000px;">
                        <el-table-column
                                prop="t_name"
                                label="教师姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="thesisname"
                                label="论文名称"
                                width="250">
                        </el-table-column>
                        <el-table-column
                                prop="publicationname"
                                label="刊物名称"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="publicationtime"
                                label="发表时间">
                        </el-table-column>
                        <el-table-column label="下载">
                            <template slot-scope="scope">
                                <el-dropdown >
                        <span class="el-dropdown-link" @click="downLoad(scope.row.thesispath)">
                            文件下载
                        </span>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="教研项目" name="5">
                    <el-table  class="table"
                               :data="tableData"
                               height="650px"
                               border
                               style="width:1100px">
                        <el-table-column
                                prop="t_name"
                                label="教师姓名" width="150">
                        </el-table-column>
                        <el-table-column
                                prop="projectname"
                                label="项目名称" width="180">
                        </el-table-column>
                        <el-table-column
                                prop="level"
                                label="级别">
                        </el-table-column>
                        <el-table-column
                                prop="projectfunds"
                                label="立项经费">
                        </el-table-column>
                        <el-table-column
                                prop="projecttime"
                                label="立项时间">
                        </el-table-column>
                        <el-table-column label="下载">
                            <template slot-scope="scope">
                                <el-dropdown >
                        <span class="el-dropdown-link" @click="downLoad(scope.row.projectpath)">
                            文件下载
                        </span>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="教师奖励" name="6">
                    <el-table  class="table"
                               :data="tableData"
                               height="650px"
                               border
                               style="width:1100px;">
                        <el-table-column
                                prop="t_name"
                                label="教师姓名">
                        </el-table-column>
                        <el-table-column
                                prop="awardname"
                                label="奖励名称">
                        </el-table-column>
                        <el-table-column
                                prop="level"
                                label="级别"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="time"
                                label="时间" width="200">
                        </el-table-column>
                        <el-table-column label="下载" width="200">
                            <template slot-scope="scope">
                                <el-dropdown >
                        <span class="el-dropdown-link" @click="downLoad(scope.row.awardprovepath)">
                            文件下载
                        </span>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="学生竞赛" name="7">
                    <el-table  class="table"
                               :data="tableData"
                               height="650px"
                               border
                               style="width:1100px;">
                        <el-table-column
                                prop="t_name"
                                label="教师姓名">
                        </el-table-column>
                        <el-table-column
                                prop="competitionname"
                                label="竞赛名称">
                        </el-table-column>
                        <el-table-column
                                prop="award"
                                label="获奖/成果"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="level"
                                label="级别"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="time"
                                label="时间" width="140">
                        </el-table-column>
                        <el-table-column label="下载" width="140">
                            <template slot-scope="scope">
                                <el-dropdown>
                          <span class="el-dropdown-link" @click="downLoad(scope.row.competitionprovepath)">
                              文件下载
                          </span>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>

                <el-tab-pane label="交流考察" name="8">
                    <el-table  class="table"
                               :data="tableData"
                               height="650px"
                               border
                               style="width:1100px;">
                        <el-table-column
                                prop="time"
                                label="时间" width="140">
                        </el-table-column>
                        <el-table-column
                                prop="content"
                                label="教学交流、考察、学习内容">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="地点" width="180">
                        </el-table-column>
                        <el-table-column
                                prop="teachername"
                                label="教师" width="120">
                        </el-table-column>
                        <el-table-column
                                prop="remarks"
                                label="备注" width="140">
                        </el-table-column>
                        <el-table-column label="下载" width="140">
                            <template slot-scope="scope">
                                <el-dropdown >
                                <span class="el-dropdown-link" @click="downLoad(scope.row.communicationpath)">
                                    文件下载
                                </span>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
    import {queryData} from "../pubRequest/queryData";

    export default {
        name: "schedule_tab" ,
        data() {
            return {
                activeName: '1' ,
                tableData: [],
            }
        } ,
        watch: {
           t_id: {
               handle(o , n) {
                   n = this.t_id;
                   if (o !== n) {
                       this.query('Teachingwork/TeachCheck_show');
                   }
               }
           }
        } ,
        props: {
            t_id: '' ,
            term: ''
        } ,
        methods: {
            handleClick(tab, event) {
                switch (this.activeName) {
                    case '1' :
                        this.query('Teachingwork/TeachCheck_show');
                        break;
                    case '2' :
                        this.query('Teachingwork/TeachPlan_show');
                        break;
                    case '3' :
                        this.query('Researchactivity/Achievement_show');
                        break;
                    case '4' :
                        this.query('Researchactivity/Thesis_show');
                        break;
                    case '5' :
                        this.query('Researchactivity/Project_show');
                        break;
                    case '6' :
                        this.query('Researchactivity/Award_show');
                        break;
                    case '7' :
                        this.query('StudentProject/StuProject_show');
                        break;
                    case '8' :
                        this.query('Communication/Communication_show');
                        break;
                }
            } ,
            query(url) {
                const data = {
                    term: this.term ,
                    t_id: this.t_id ,
                    state: '1'
                };
                queryData(url , data).then(res =>{
                    this.tableData = res.data;
                })
            } ,
            handleCommand(command) {
                if (command) {
                    let a = document.createElement("a");
                    a.href = '/api/file/down?url=' + command;
                    document.body.appendChild(a);
                    a.click()
                }
                else {
                    this.$message.error('文件下载失败，可能原因是未上传该文件')
                }
            } ,
            downLoad(command) {
                if (command) {
                    let a = document.createElement("a");
                    a.href = '/api/file/down?url=' + command;
                    document.body.appendChild(a);
                    a.click()
                }
                else {
                    this.$message.error('文件下载失败，可能原因是未上传该文件')
                }
            }
        }
    }
</script>

<style scoped>
    .box-card {
        height: 1200px;
        margin-top: -55px;
    }

    .el-tabs {
        height: 720px;
        margin: -10px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
</style>