<template>
    <div>
        <el-drawer
                :visible.sync="drawer"
                direction="rtl"
                :show-close="false"
                size="70%">

            <el-card class="box-card">
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

            </el-card>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "tab_teaching_inspection" ,
        data() {
        return {
            drawer: false ,
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