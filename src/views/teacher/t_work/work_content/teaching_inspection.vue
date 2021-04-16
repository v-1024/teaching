<template>
    <div class="content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" id="te_quireForm">
            <el-form-item label="学期" class="top_form">
                <!--v-model:默认选中当前学年-->
                <el-select placeholder="学期" v-model="formInline.def_term" clearable>
                    <el-option :label="item" :value="item" v-for="item in formInline.term">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="提交状态" class="top_form">
                <!--v-model:默认选中未提交-->
                <el-select placeholder="提交状态" v-model="formInline.submit_state" clearable>
                    <el-option label="未提交" value="0"></el-option>
                    <el-option label="已提交" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="top_form">
                <el-button style="width: 250px ; height: 40px" type="primary" icon="el-icon-search" @click="query">查询</el-button>
            </el-form-item>
            <!--<el-form-item class="top_form">-->
                <!--<el-button icon="el-icon-plus" @click="add_line" v-if="btn_show">添加行</el-button>-->
            <!--</el-form-item>-->
        </el-form>

        <el-table class="table"
                  :data="tableData"
                  height="350px"
                  stripe
                  style="width: 1320px">

            <el-table-column
                    fixed
                    prop="t_name"
                    label="姓名" align="center" width="100px">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.t_name"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.t_name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    fixed
                    prop="course"
                    label="课程" align="center" width="100px">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.course"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.course}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="lessonplan"
                    label="授课计划" align="center" width="100px">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.lessonplan"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.lessonplan}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="teachplan"
                    label="教案(有或无）" align="center" width="100px">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.teachplan"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.teachplan}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="attendancenum"
                    label="课堂考勤(次)" align="center" width="120px">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.attendancenum"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendancenum}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="attendancerate"
                    label="学生出勤率" align="center" width="120px">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.attendancerate"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendancerate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="correctinghomework"
                    label="作业批改(次)" align="center" width="120px">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.correctinghomework"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.correctinghomework}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="answerscount"
                    label="辅导答疑(次)" align="center" width="120px">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.answerscount"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.answerscount}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="onscheduleexperiment"
                    label="是否按计划设实验(随堂)" align="center" width="120px">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.onscheduleexperiment"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.onscheduleexperiment}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="exitprogram"
                    label="教学中存在的问题" align="center" width="120px">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.show" v-model="scope.row.exitprogram"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.exitprogram}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="remarks"
                    label="备注" align="center" width="120px">
                <template slot-scope="scope" align="center">
                    <el-input v-show="scope.row.show" v-model="scope.row.remarks"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.remarks}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="上传附件" width="100px" v-if="btn_show" align="center">
                <template slot-scope="scope" v-if="btn_show">
                    <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                            上传附件  <i class="el-icon-upload"></i>
                              <i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='授课计划'>授课计划</el-dropdown-item>
                    <el-dropdown-item command='课堂考勤'>课堂考勤</el-dropdown-item>
                    <el-dropdown-item command='辅导答疑'>辅导答疑</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
            <el-table-column label="下载" width="100px" v-if="!btn_show" align="center">
                <template slot-scope="scope" v-if="!btn_show">
                    <el-dropdown @command="handleCommand" >
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

        <el-dialog
                title="附件上传"
                :visible.sync="dialogVisible1"
                width="40%">

            <div class="upload"><el-upload
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
                    drag
                    style="width: 30%">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload></div>
            <span slot="footer" class="dialog-footer">
            <el-button style="width: 200px" type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
                title="附件上传"
                :visible.sync="dialogVisible2"
                width="40%">

            <div class="upload"><el-upload
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
                    drag
                    style="width: 30%">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload></div>
            <span slot="footer" class="dialog-footer">
            <el-button style="width: 200px" type="primary" @click="dialogVisible2 = false">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
                title="附件上传"
                :visible.sync="dialogVisible3"
                width="40%">

            <div class="upload"><el-upload
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
                    drag
                    style="width: 30%">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload></div>
            <span slot="footer" class="dialog-footer">
            <el-button style="width: 200px" type="primary" @click="dialogVisible3 = false">确 定</el-button>
        </span>
        </el-dialog>
        <div v-if="btn_show" style="display: flex; flex: 1 ; margin: 20px" id="btn9">
            <!--<el-input
                    style="width: 800px"
                    type="textarea"
                    :rows="3"
                    v-model="fileItem"
                    placeholder="已选择的文件"
                    disabled></el-input>-->
            <el-button size="medium" type="primary" class="btn" @click="submit">提交</el-button>
        </div>

        <!--<div class="upload" v-if="btn_show">
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
        </div>-->
    </div>
</template>

<script>
    import {request} from "../../../../network/request";
    import {queryTerm} from "../../../../pubRequest/queryTerm";
    import {queryTermLast} from "../../../../pubRequest/queryTerm";
    import {queryData} from "../../../../pubRequest/queryData";
    import {fileDownLoad} from "../../../../pubRequest/downLoad";

    export default {
        name: "teaching_inspection",
        data() {
            return {
                formInline: {
                    def_term: '',  //当前学年（后端获取）：默认选中
                    term: [] ,    //学年从后端获取
                    submit_state: '0' ,
                },
                tableData: [
                    {
                        t_name: '',
                        term: '',
                        course: '',
                        lessonplan: '',
                        teachplan: '',
                        attendancenum: '',
                        attendancerate: '',
                        correctinghomework: '',
                        answerscount: '',
                        onscheduleexperiment: '',
                        exitprogram: '',
                        remarks: '',
                        show: true ,
                        state: '0' ,
                    }
                ],
                btn_show: true ,
                file: {
                    lessonplan: '',
                    classattendance: '',
                    answer: ''
                },
                dialogVisible1: false ,
                dialogVisible2: false ,
                dialogVisible3: false ,
                fileForm: new FormData() ,
                fileList1: [] ,
                fileList2: [] ,
                fileList3: []
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
                this.fileList1.push({
                    name: file.name ,
                });
                this.fileContent = file.name
            },
            upFile2(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('classattendance' , file);
                this.fileList2.push({
                    name: file.name ,
                });
            },
            upFile3(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('answer' , file);
                this.fileList3.push({
                    name: file.name ,
                });
            },
            submit() {
                this.$confirm('提交后不能修改，请确保表格信息以及文件上传无误', '提示', {
                    type: 'warning'
                }).then(() => {
                    if (this.fileForm.lessonplan !== '')
                        this.$refs.upload1.submit();
                    if (this.fileForm.classattendance !== '')
                        this.$refs.upload2.submit();
                    if (this.fileForm.answer !== '')
                        this.$refs.upload3.submit();
                    this.tableData[0].term = this.formInline.def_term;
                    this.tableData[0].state = '1';
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
                            this.$message.success('表单上传成功');
                            this.tableData.splice(0,1);
                            request({
                                url: 'FilePath/normalFile_teach',
                                method: 'post',
                                data: this.fileForm ,
                                params: {
                                    t_id: sessionStorage.getItem('t_id') ,
                                    college: sessionStorage.getItem('college') ,
                                    department: sessionStorage.getItem('department') ,
                                    t_name: sessionStorage.getItem('t_name') ,
                                    term: this.formInline.def_term
                                } ,
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then(res => {
                                if (res.data.msg === 'success') {
                                    this.$message.success('文件上传成功');
                                    this.fileForm = new FormData();
                                    this.fileList1.splice(0,1);
                                    this.fileList2.splice(0,1);
                                    this.fileList3.splice(0,1);
                                }
                            });
                        }
                    });
                }).catch(() => {
                });
            },
            // add_line() {
            //     if (this.tableData.length === 0) {
            //         this.tableData.push({
            //             t_name: '',
            //             term: '',
            //             course: '',
            //             lessonplan: '',
            //             teachplan: '',
            //             attendancenum: '',
            //             attendancerate: '',
            //             correctinghomework: '',
            //             answerscount: '',
            //             onscheduleexperiment: '',
            //             exitprogram: '',
            //             remarks: '',
            //             show: true ,
            //             state: '0' ,
            //         })
            //     }
            //     else
            //         this.$message.warning('请先提交表格中的内容后再添加新的一行');
            // },
            query() {
                if (this.formInline.submit_state === '1')
                    this.btn_show = false;
                else
                    this.btn_show = true;
                const url = 'Teachingwork/TeachCheck_show';
                const data = {
                    term: this.formInline.def_term ,
                    t_id: sessionStorage.getItem('t_id') ,
                    state: this.formInline.submit_state
                };
                queryData(url , data).then(res =>{
                    this.tableData = res.data;
                })
            } ,
            handleCommand(command) {    //文件下载/上传
                if (command === '授课计划') {
                    this.dialogVisible1 = true
                }
                else if (command === '课堂考勤') {
                    this.dialogVisible2 = true
                }
                else if (command === '辅导答疑') {
                    this.dialogVisible3 = true
                }
                else  {
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
    }
</script>

<style>
    #te_quireForm .el-input__inner {
        width: 320px;
    }

    .table {
        align: center;
        margin: 0 auto 20px;
        font-size: 16px;
    }

    .table .el-input__inner {
       border: 0;
    }

    .content {
        width: 100%;
        text-align: center;
        margin-top: 10px;
    }

    .upload {
        text-align: center;
        width: 100%;
        height: 200px;
        display: flex;
        margin: 10px;
    }
    .upload .el-upload{
        margin-left: 110px;
    }
    #btn9 .btn {
        width: 250px;
        height: 40px;
        margin-left: 950px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    #te_quireForm .top_form {
        width: 30%;
        margin-top: 10px;
    }
</style>