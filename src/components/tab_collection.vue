<template>
    <div>
        <!--1.听课统计表-->
        <el-card class="box-card" v-if="index === 1">
            <div slot="header" style="text-align: center">
                <span class="title">{{term}}计算机学院各系部听课评课次数统计表</span>
            </div>
            <div class="body">
                <span class="item">{{department}}系</span>
                <span class="item">统计时间：{{time}}</span>

            </div>

            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        height="550px"
                        style="width: 100%">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="listen_times" label="听课次数"></el-table-column>
                    <el-table-column prop="assessment_times" label="评课次数"></el-table-column>
                    <el-table-column prop="lesson_record" label="是否有记录"></el-table-column>
                    <el-table-column prop="remarks" label="备注"></el-table-column>
                </el-table>
            </div>

        </el-card>

        <!--2.教师教学检查表-->
        <el-card class="box-card" v-if="index === 2">
                <div slot="header" style="text-align: center">
                    <span class="title">{{college}}教师教学检查表</span>
                </div>
                <div class="body">
                    <span class="item">系部：{{department}}</span>
                    <span class="item">学期：{{term}}</span>
                    <span class="item">时间：{{time}}</span>
                    <span class="item">系主任：{{dep_head}}</span>
                </div>

                <div class="table">
                    <el-table
                            :data="tableData"
                            border
                            height="550px"
                            style="width: 100%">
                        <el-table-column prop="date" label="姓名"></el-table-column>
                        <el-table-column prop="name" label="课程"></el-table-column>
                        <el-table-column prop="address" label="授课计划"></el-table-column>
                        <el-table-column prop="date" label="教案"></el-table-column>
                        <el-table-column prop="name" label="课堂考勤"></el-table-column>
                        <el-table-column prop="address" label="学生出勤率"></el-table-column>
                        <el-table-column prop="date" label="作业批改"></el-table-column>
                        <el-table-column prop="name" label="辅导答疑"></el-table-column>
                        <el-table-column prop="address" label="是否按计划设实验（随堂）"></el-table-column>
                        <el-table-column prop="address" label="教学过程中存在的问题"></el-table-column>
                        <el-table-column prop="address" label="备注"></el-table-column>
                    </el-table>
                </div>

            </el-card >

        <!--3.期中教学检查基本数据统计表-->

        <!--4.系部教案检查登记表-->
        <el-card class="box-card" v-if="index === 4">
            <div slot="header" style="text-align: center">
                <span class="title">{{term}}计算机学院各系部教案检查登记表</span>
            </div>
            <div class="body">
                <span class="item">{{department}}系</span>
                <span class="item">统计时间：{{time}}</span>

            </div>

            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        height="550px"
                        style="width: 100%">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="plan" label="是否是电子教案"></el-table-column>
                    <el-table-column prop="word" label="是否是文本文档"></el-table-column>
                    <el-table-column prop="complete" label="教案是否完整"></el-table-column>
                </el-table>
            </div>

        </el-card>

        <!--5.系部考勤统计表-->
        <el-card class="box-card" v-if="index === 5">
            <div slot="header" style="text-align: center">
                <span class="title">{{term}}计算机学院各系部考勤统计表</span>
            </div>
            <div class="body">
                <span class="item">{{department}}系</span>
                <span class="item">统计时间：{{time}}</span>

            </div>

            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        height="550px"
                        style="width: 100%">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="times" label="考勤次数"></el-table-column>
                    <el-table-column prop="record" label="是否有记录"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                </el-table>
            </div>

        </el-card>

        <!--6.系部实验报告检查登记表-->
        <el-card class="box-card" v-if="index === 6">
            <div slot="header" style="text-align: center">
                <span class="title">{{term}}计算机学院各系部实验报告检查登记表</span>
            </div>
            <div class="body">
                <span class="item">{{department}}系</span>
                <span class="item">统计时间：{{time}}</span>

            </div>

            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        height="550px"
                        style="width: 100%">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="test_times" label="实验次数"></el-table-column>
                    <el-table-column prop="correct_times" label="批改报告次数"></el-table-column>
                    <el-table-column prop="type" label="电子作业/纸质作业"></el-table-column>
                </el-table>
            </div>

        </el-card>

        <!--7.系部作业检查登记表-->
        <el-card class="box-card" v-if="index === 7">
            <div slot="header" style="text-align: center">
                <span class="title">{{term}}计算机学院各系部作业检查登记表</span>
            </div>
            <div class="body">
                <span class="item">{{department}}系</span>
                <span class="item">统计时间：{{time}}</span>

            </div>

            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        height="550px"
                        style="width: 100%">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="work_times" label="布置作业次数"></el-table-column>
                    <el-table-column prop="correct_times" label="批改作业次数"></el-table-column>
                    <el-table-column prop="type" label="电子作业/纸质作业"></el-table-column>
                </el-table>
            </div>

        </el-card>

        <!--8.教师对外交流情况一览表-->
        <el-card class="box-card" v-if="index === 8">
            <div slot="header" style="text-align: center">
                <span class="title">{{term}}计算机科学与工程学院教师对外交流情况一览表</span>
            </div>
            <div class="body">
                <span class="item">{{department}}系</span>
                <span class="item">统计时间：{{time}}</span>

            </div>

            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        height="550px"
                        style="width: 100%">
                    <el-table-column prop="time" label="时间"></el-table-column>
                    <el-table-column prop="meeting" label="教学交流主题或会议名称"></el-table-column>
                    <el-table-column prop="place" label="地点"></el-table-column>
                    <el-table-column prop="attendant" label="参加人员"></el-table-column>
                    <el-table-column prop="remarks" label="备注"></el-table-column>
                </el-table>
            </div>

        </el-card>

        <!--9.教师奖励一览表-->
        <el-card class="box-card" v-if="index === 9">
            <div slot="header" style="text-align: center">
                <span class="title">{{term}}计算机科学与工程学院教师奖励一览表</span>
            </div>
            <div class="body">
                <span class="item">{{department}}系</span>
                <span class="item">统计时间：{{time}}</span>

            </div>

            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        height="550px"
                        style="width: 100%">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="meeting" label="奖励名称"></el-table-column>
                    <el-table-column prop="place" label="级别"></el-table-column>
                    <el-table-column prop="attendant" label="时间"></el-table-column>
                </el-table>
            </div>

        </el-card>

        <!--10.教研项目一览表-->
        <el-card class="box-card" v-if="index === 10">
            <div slot="header" style="text-align: center">
                <span class="title">{{term}}计算机科学与工程学院教研项目一览表</span>
            </div>
            <div class="body">
                <span class="item">{{department}}系</span>
                <span class="item">统计时间：{{time}}</span>

            </div>

            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        height="550px"
                        style="width: 100%">
                    <el-table-column prop="name" label="项目负责人"></el-table-column>
                    <el-table-column prop="meeting" label="项目名称"></el-table-column>
                    <el-table-column prop="place" label="项目级别"></el-table-column>
                    <el-table-column prop="attendant" label="立项经费"></el-table-column>
                    <el-table-column prop="attendant" label="起止时间"></el-table-column>
                </el-table>
            </div>

        </el-card>

        <!--11.计划与总结-->



    </div>
</template>

<script>
    export default {
        name: "tab_collection" ,
        data() {
            return {
                college: '计算机科学与工程学院' ,
                department: '网络工程系' ,
                term: '2019-2020-2' ,
                time: '2020.5.20' ,
                dep_head: '张三' ,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        } ,
        props: {
            index: ''
        }
    }
</script>

<style scoped>
    .title {
        font-size: 20px;
    }

    .body {
        text-align: center;
    }

    .item {
        margin: 60px;
    }

    .table {
        margin-top: 20px;
    }

    .box-card {
        height: 1200px;
        margin-top: -50px;
    }
</style>