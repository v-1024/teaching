<template>
    <div class="content">

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="学年">
                <!--v-model:默认选中当前学年-->
                <el-select placeholder="学年" v-model="formInline.def_term" clearable>
                    <el-option :label="item" :value="item" v-for="item in formInline.term">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button  icon="el-icon-plus" @click="add_line">添加行</el-button>
            </el-form-item>
        </el-form>
        <el-table  class="table"
                   :data="tableData"
                   height="350px"
                   border
                   style="margin-bottom: 0;width:100%">
            <el-table-column prop="name" label="姓名" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="teaching_plan" label="是否是电子教案" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.teaching_plan"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.teaching_plan}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="txt" label="是否是文本文档" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.txt"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.txt}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="plan_over" label="教案是否完善" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.plan_over"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.plan_over}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="attendance_times" label="考勤次数" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.attendance_times"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendance_times}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="attendance" label="考情是否有记录" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.attendance"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendance}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="times" label="听课次数" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.times"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.times}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="lesson_assessment" label="评课次数" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.lesson_assessment"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.lesson_assessment}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="lesson_record" label="听课是否有记录" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.lesson_record"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.lesson_record}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="assign_works_times" label="布置作业次数" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.assign_works_times"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.assign_works_times}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="check_works_times" label="批改作业次数" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.check_works_times"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.check_works_times}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="test_times" label="实验次数" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.test_times"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.test_times}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="test_report_times" label="批改实验报告次数" width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.test_report_times"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.test_report_times}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ele_paper" label="电子作业/纸质作业" width="85">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.ele_paper"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.ele_paper}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button @click="scope.row.show =true">编辑</el-button>
                    <el-button @click="scope.row.show =false">保存</el-button>
                </template>
            </el-table-column>
    </el-table>

        <div class="upload">
            <el-upload
                ref="upload"
                action=""
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :auto-upload="false"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                style="width: 15%">
            <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">上传教案</div>
        </el-upload>
            <el-upload
                    ref="upload"
                    action=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    style="width: 15%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传作业批改</div>
            </el-upload>
            <el-upload
                    ref="upload"
                    action=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    style="width: 15%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传计划实验</div>
            </el-upload>
            <el-upload
                    ref="upload"
                    action=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    style="width: 15%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传评课记录</div>
            </el-upload>
            <el-button size="medium" type="primary" class="btn">提交</el-button>
        </div>
    </div>



</template>

<script>
    import {request} from "../../../../network/request";
    import {queryTerm} from "../../../../pubRequest/queryTerm";
    import {queryTermLast} from "../../../../pubRequest/queryTerm";
    import {queryData} from "../../../../pubRequest/queryData";

    export default {
        name: "plans_inspection",
        data() {
            return {
                formInline: {
                    def_term: '' ,  //当前学年（后端获取）：默认选中
                    term: []        //学年从后端获取

                } ,
                tableData: [],
            }
        },
        created() {
            queryTerm().then(res => {
                for (let i = 0 ; i < res.data.length ; i ++)
                    this.formInline.term.push(res.data[i].term);
            });
            queryTermLast().then(res =>{
                this.formInline.def_term = res.data[0].term;
            })
        } ,
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
            },
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
            } ,
            query() {
                const url = 'HandOfDept/teachercommitspeed';
                const data = {
                    term: this.formInline.def_term ,
                    t_id: this.formInline.t_id ,
                    t_name: this.formInline.t_name
                };
                queryData(url , data).then(res =>{
                    this.tableData = res.data;
                })
            }
        }
    }

</script>

<style scoped>
    .table{
        align: center;
        margin: 0 auto 20px;
        font-size:16px;
    }

    .content {
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }

    .upload {
        display: flex;
        text-align: center;
        margin: 10px;
    }

    .btn {
        width: 150px;
        height: 40px;
        position: absolute;
        right: 150px;
    }

</style>