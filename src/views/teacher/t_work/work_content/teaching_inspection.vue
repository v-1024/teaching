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
                   style="margin-bottom: 0">

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
                    prop="subject"
                    label="课程"
                    width="160">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.subject"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.subject}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="授课计划"
                    width="160">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.content"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.content}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="plan"
                    label="教案(有或无）"
                    width="70">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.plan"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.plan}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="attendance_times"
                    label="课堂考勤(次)"
                    width="80">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.attendance_times"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendance_times}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="attendance"
                    label="学生出勤率"
                    width="70">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.attendance"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendance}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="work"
                    label="作业批改(次)"
                    width="70">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.work"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.work}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="coach"
                    label="辅导答疑(次)"
                    width="70">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.coach"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.coach}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="test"
                    label="是否按计划设实验(随堂)"
                    width="90">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.test"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.test}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="problem"
                    label="教学中存在的问题"
                    width="170">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.problem"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.problem}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="remarks"
                    label="备注"
                    width="90">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.remarks"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.remarks}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button @click="scope.row.show =true" >编辑</el-button>
                    <el-button @click="scope.row.show =false">保存</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="upload">
            <el-upload
                    ref="upload"
                    action=""
                    :http-request="upFile"
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
            <el-upload
                    ref="upload"
                    action=""
                    :http-request="upFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    style="width: 15%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传课堂考勤</div>
            </el-upload>
            <el-upload
                    ref="upload"
                    action=""
                    :http-request="upFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    style="width: 15%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传辅导答疑</div>
            </el-upload>
            <el-button size="medium" type="primary" class="btn" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import {request} from "../../../../network/request";
    import {queryTerm} from "../../../../pubRequest/queryTerm";
    import {queryTermLast} from "../../../../pubRequest/queryTerm";
    import {queryData} from "../../../../pubRequest/queryData";

    export default {
        name: "teaching_inspection",
        data() {
            return {
                formInline: {
                    def_term: '' ,  //当前学年（后端获取）：默认选中
                    term: []       //学年从后端获取

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
            upFile(param) {
                const file = param.file;
                let formData = new FormData();
                formData.append("file" , file);
                formData.append("table" , this.tableData);
                request({
                    url: 'Teachingwork/TeachCheck_submit' ,
                    method: "post" ,
                    data: formData
                }).then(res => {
                    console.log(res);
                })
            } ,
            submit() {
                this.$refs.upload.submit();
            } ,
            add_line() {
                this.tableData.push({
                    t_name: '22' ,
                    term:'2',
                    course: '2',
                    lessonplan:'2',
                    teachplan:'2',
                    attendancenum: 2,
                    attendancerate: 2,
                    correctinghomework: 2,
                    answerscount: 2,
                    onscheduleexperiment:'2',
                    exitprogram:'2',
                    remarks:'2',
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