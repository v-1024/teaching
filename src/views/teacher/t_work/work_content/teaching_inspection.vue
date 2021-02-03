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
            <el-form-item label="提交状态">
                <!--v-model:默认选中未提交-->
                <el-select placeholder="提交状态" v-model="formInline.submit_state" clearable>
                    <el-option label="未提交" value="0"></el-option>
                    <el-option label="已提交" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="query">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-plus" @click="add_line">添加行</el-button>
            </el-form-item>
        </el-form>

        <el-table class="table"
                  :data="tableData"
                  height="350px"
                  border
                  style="margin-bottom: 0">

            <el-table-column
                    prop="t_name"
                    label="姓名">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.t_name"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.t_name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="course"
                    label="课程">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.course"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.course}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="lessonplan"
                    label="授课计划">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.lessonplan"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.lessonplan}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="teachplan"
                    label="教案(有或无）">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.teachplan"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.teachplan}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="attendancenum"
                    label="课堂考勤(次)">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.attendancenum"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendancenum}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="attendancerate"
                    label="学生出勤率">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.attendancerate"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendancerate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="correctinghomework"
                    label="作业批改(次)">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.correctinghomework"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.correctinghomework}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="answerscount"
                    label="辅导答疑(次)">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.answerscount"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.answerscount}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="onscheduleexperiment"
                    label="是否按计划设实验(随堂)">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.onscheduleexperiment"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.onscheduleexperiment}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="exitprogram"
                    label="教学中存在的问题">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.exitprogram"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.exitprogram}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="remarks"
                    label="备注">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.remarks"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.remarks}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100px">
                <template slot-scope="scope">
                    <el-button @click="scope.row.show =true" v-if="!scope.row.show">编辑</el-button>
                    <el-button @click="scope.row.show =false" v-if="scope.row.show">保存</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="upload">
            <el-upload
                    ref="upload1"
                    action=""
                    :http-request="upFile1"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    style="width: 15%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传授课计划</div>
            </el-upload>
            <el-upload
                    ref="upload2"
                    action=""
                    :http-request="upFile2"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    style="width: 15%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传课堂考勤</div>
            </el-upload>
            <el-upload
                    ref="upload3"
                    action=""
                    :http-request="upFile3"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="1"
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
                    def_term: '',  //当前学年（后端获取）：默认选中
                    term: [] ,    //学年从后端获取
                    submit_state: '0'
                },
                tableData: [],
                file: {
                    lessonplan: '',
                    classattendance: '',
                    answer: ''
                },
                fileForm: new FormData()
            }
        },
        created() {
            queryTerm().then(res => {
                for (let i = 0; i < res.data.length; i++)
                    this.formInline.term.push(res.data[i].term);
            });
            queryTermLast().then(res => {
                this.formInline.def_term = res.data[0].term;
            })
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            upFile1(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('lessonplan' , file);
            },
            upFile2(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('classattendance' , file);
            },
            upFile3(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('answer' , file);
            },
            submit() {
                if (this.fileForm.lessonplan !== '')
                    this.$refs.upload1.submit();
                if (this.fileForm.classattendance !== '')
                    this.$refs.upload2.submit();
                if (this.fileForm.answer !== '')
                    this.$refs.upload3.submit();
                delete this.tableData[0].show;
                this.tableData[0].term = this.formInline.def_term;
                this.tableData[0].t_id = sessionStorage.getItem('t_id');
                this.tableData[0].college = sessionStorage.getItem('college');
                this.tableData[0].department = sessionStorage.getItem('department');
                console.log(this.tableData[0]);
                request({
                    url: 'Teachingwork/TeachCheck_submit',
                    method: 'post',
                    data: this.tableData[0]
                }).then(res => {
                    if (res.data.msg === 'success') {
                        request({
                            url: 'FilePath/normalFile_teach',
                            method: 'post',
                            data: this.fileForm ,
                            params: {
                                t_id: sessionStorage.getItem('t_id') ,
                                college: sessionStorage.getItem('t_id') ,
                                department: sessionStorage.getItem('department') ,
                                t_name: sessionStorage.getItem('t_name') ,
                                term: this.fileForm.def_term
                            } ,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(res => {
                            if (res.data.msg === 'success') {
                                this.$message.success('文件与表单上传成功');
                                this.fileForm = new FormData();
                            }
                        });
                    }
                });
            },
            add_line() {
                this.tableData.push({
                    t_name: '22',
                    term: '2',
                    course: '2',
                    lessonplan: '2',
                    teachplan: '2',
                    attendancenum: 2,
                    attendancerate: 2,
                    correctinghomework: 2,
                    answerscount: 2,
                    onscheduleexperiment: '2',
                    exitprogram: '2',
                    remarks: '2',
                    show: true
                })
            },
            query() {
                const url = 'HandOfDept/teachercommitspeed';
                const data = {
                    term: this.formInline.def_term,
                    t_id: this.formInline.t_id,
                    t_name: this.formInline.t_name
                };
                queryData(url, data).then(res => {
                    this.tableData = res.data;
                })
            }
        }
    }
</script>

<style scoped>
    .table {
        align: center;
        margin: 0 auto 20px;
        font-size: 16px;
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