<template>
    <div class="content">
<<<<<<< HEAD
        <span style="margin-top: 30px; margin-left: 250px">年份选择</span>
        <el-select class="select" v-model="value" placeholder="2020-2021第一学期">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button slot="reference" style="margin-left: 100px" @click="add_line">添加行</el-button>
        <el-table  class="table"
                   :data="tableData"
                   height=""
                   border
                   style="margin-bottom: 0;width:100%">
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="teaching_plan"
                    label="是否是电子教案"
                    width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.teaching_plan"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.teaching_plan}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="txt"
                    label="是否是文本文档"
                    width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.txt"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.txt}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="plan_over"
                    label="教案是否完善"
                    width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.plan_over"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.plan_over}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="attendance_times"
                    label="考勤次数"
                    width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.attendance_times"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendance_times}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="attendance"
                    label="考情是否有记录"
                    width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.attendance"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendance}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="times"
                    label="听课次数"
                    width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.times"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.times}}</span>
                </template>
=======
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="学年">
                <!--v-model:默认选中当前学年-->
                <el-select placeholder="学年" v-model="formInline.def_term" clearable>
                    <el-option :label="item" :value="item" v-for="item in formInline.term">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button  icon="el-icon-plus" @click="add_line">添加行</el-button>
            </el-form-item>
        </el-form>

        <el-table  class="table"
                   :data="tableData"
                   height="220px"
                   border
                   style="margin-bottom: 0;width:100%">
            <el-table-column prop="name" label="姓名" width="80">

            </el-table-column>
            <el-table-column prop="teaching_plan" label="是否是电子教案" width="80">

            </el-table-column>
            <el-table-column prop="txt" label="是否是文本文档" width="80">

            </el-table-column>
            <el-table-column prop="plan_over" label="教案是否完善" width="80">

            </el-table-column>
            <el-table-column prop="attendance_times" label="考勤次数" width="80">

            </el-table-column>
            <el-table-column prop="attendance" label="考情是否有记录" width="80">

            </el-table-column>
            <el-table-column prop="times" label="听课次数" width="80">

            </el-table-column>
            <el-table-column prop="lesson_assessment" label="评课次数" width="80">

            </el-table-column>
            <el-table-column prop="lesson_record" label="听课是否有记录" width="80">

>>>>>>> 7077a86c99d48213fb7eaa429b7e5613918a518b
            </el-table-column>
            <el-table-column prop="assign_works_times" label="布置作业次数" width="80">

<<<<<<< HEAD
        <el-table-column
                prop="lesson_assessment"
                label="评课次数"
                width="80">
            <template slot-scope="scope">
                <el-input  v-show="scope.row.show" v-model="scope.row.lesson_assessment"></el-input>
                <span v-show="!scope.row.show">{{scope.row.lesson_assessment}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="lesson_record"
                label="听课是否有记录"
                width="80">
            <template slot-scope="scope">
                <el-input  v-show="scope.row.show" v-model="scope.row.lesson_record"></el-input>
                <span v-show="!scope.row.show">{{scope.row.lesson_record}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="assign_works_times"
                label="布置作业次数"
                width="80">
            <template slot-scope="scope">
                <el-input  v-show="scope.row.show" v-model="scope.row.assign_works_times"></el-input>
                <span v-show="!scope.row.show">{{scope.row.assign_works_times}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="check_works_times"
                label="批改作业次数"
                width="80">
            <template slot-scope="scope">
                <el-input  v-show="scope.row.show" v-model="scope.row.check_works_times"></el-input>
                <span v-show="!scope.row.show">{{scope.row.check_works_times}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="test_times"
                label="实验次数"
                width="80">
            <template slot-scope="scope">
                <el-input  v-show="scope.row.show" v-model="scope.row.test_times"></el-input>
                <span v-show="!scope.row.show">{{scope.row.test_times}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="test_report_times"
                label="批改实验报告次数"
                width="80">
            <template slot-scope="scope">
                <el-input  v-show="scope.row.show" v-model="scope.row.test_report_times"></el-input>
                <span v-show="!scope.row.show">{{scope.row.test_report_times}}</span>
            </template>
        </el-table-column>
        <el-table-column
                prop="ele_paper"
                label="电子作业/纸质作业"
                width="85">
            <template slot-scope="scope">
                <el-input  v-show="scope.row.show" v-model="scope.row.ele_paper"></el-input>
                <span v-show="!scope.row.show">{{scope.row.ele_paper}}</span>
            </template>
        </el-table-column>
=======
            </el-table-column>
            <el-table-column prop="check_works_times" label="批改作业次数" width="80">

            </el-table-column>
            <el-table-column prop="test_times" label="实验次数" width="80">

            </el-table-column>
            <el-table-column prop="test_report_times" label="批改实验报告次数" width="80">

            </el-table-column>
            <el-table-column prop="ele_paper" label="电子作业/纸质作业" width="85">

            </el-table-column>
>>>>>>> 7077a86c99d48213fb7eaa429b7e5613918a518b
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button @click="scope.row.show =true">编辑</el-button>
                    <el-button @click="scope.row.show =false">保存</el-button>
                </template>
            </el-table-column>
    </el-table>

        <div class="upload_1">
            <div style="margin-left: 50px">
                <span style="float: left;margin: 5px 10px">授课计划</span>
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="5"
                        :on-exceed="handleExceed">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </div>
            <div style="float: left;margin-left: 100px">
                <span style="float: left;margin: 5px 10px">课堂考勤</span>
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="5"
                        :on-exceed="handleExceed">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </div>
            <div style="float: left;margin-left: 100px">
                <span style="float: left;margin: 5px 10px">辅导答疑</span>
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="5"
                        :on-exceed="handleExceed">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </div>
        </div>
        <el-button slot="reference" style="margin:40px 500px">提交</el-button>
    </div>



</template>

<script>
    export default {
        name: "plans_inspection",
        data() {
            return {
<<<<<<< HEAD
                options: [{
                    value: '选项1',
                    label: '2020-2021第一学期'
                }],
                tableData: [],

                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
            };
=======
                formInline: {
                    def_term: '2020-2021-1' ,  //当前学年（后端获取）：默认选中
                    term:         //学年从后端获取
                        [
                            '2020-2021-1' ,
                            '2019-2020-2'
                        ]
                } ,
                tableData: [],
            }
>>>>>>> 7077a86c99d48213fb7eaa429b7e5613918a518b
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
<<<<<<< HEAD
            },
            add_line(){
                this.tableData.push({
                    name: '',
                    teaching_plan: '',
                    txt: '',
                    plan_over: '',
                    attendance_times:'',
                    attendance:'',
                    times:'',
                    lesson_assessment: '',
                    lesson_record: '',
                    assign_works_times: '',
                    check_works_times: '',
                    test_times:'',
                    test_report_times:'',
                    ele_paper:'',
                    show :true
                })
            },
=======
            } ,
            add_line() {
                this.tableData.push({
                    name:'' ,
                    teaching_plan:'',
                    txt:'',
                    plan_over:'',
                    attendance_times:'',
                    attendance:'',
                    times:'',
                    lesson_assessment:'',
                    lesson_record:'',
                    assign_works_times:'',
                    check_works_times:'',
                    test_times:'',
                    test_report_times:'',
                    ele_paper: '',
                    show:true
                })
            }
>>>>>>> 7077a86c99d48213fb7eaa429b7e5613918a518b
        }
    }

</script>

<style scoped>
    .table{
        align: center;
        margin: 20px auto;

    }

    .content {
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }
    .select{
        margin:30px 30px;
        border: #333333;
    }
    .upload_1{
        margin: 110px 150px;

    }
    .upload-demo{
        float: left;
    }

</style>