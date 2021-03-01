<template>
    <div class="content">

        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="学期">
                <!--v-model:默认选中当前学年-->
                <el-select placeholder="学期" v-model="formInline.def_term" clearable>
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
                <el-button  icon="el-icon-plus" @click="add_line" v-if="btn_show">添加行</el-button>
            </el-form-item>
        </el-form>
        <el-table  class="table"
                   :data="tableData"
                   height="350px"
                   border
                   style="width:97%">
            <el-table-column prop="t_name" label="姓名" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.t_name"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.t_name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="elecplan" label="是否是电子教案" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.elecplan"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.elecplan}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="textplan" label="是否是文本文档" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.textplan"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.textplan}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="planintegrated" label="教案是否完善" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.planintegrated"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.planintegrated}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="attendancenum" label="考勤次数" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.attendancenum"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendancenum}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="attendancerecord" label="考情是否有记录" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.attendancerecord"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendancerecord}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="hearclass" label="听课次数" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.hearclass"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.hearclass}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="assessclass" label="评课次数" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.assessclass"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.assessclass}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="classrecord" label="听课是否有记录" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.classrecord"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.classrecord}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="arrangehomework" label="布置作业次数" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.arrangehomework"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.arrangehomework}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="correctinghomework" label="批改作业次数" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.correctinghomework"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.correctinghomework}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="experimentcount" label="实验次数" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.experimentcount"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.experimentcount}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="correctreportcount" label="批改实验报告次数" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.correctreportcount"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.correctreportcount}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="homeworktype" label="电子作业/纸质作业" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.homeworktype"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.homeworktype}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="experimenttype" label="实验类型" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.experimenttype"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.experimenttype}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100px" v-if="btn_show" align="center">
                <template slot-scope="scope">
                    <el-button @click="scope.row.show =true" v-if="!scope.row.show">编辑</el-button>
                    <el-button @click="scope.row.show =false" v-if="scope.row.show">保存</el-button>
                </template>
            </el-table-column>
            <el-table-column label="下载" width="100px" v-if="!btn_show" align="center">
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

        <div class="upload" v-if="btn_show">
            <el-upload
                ref="upload1"
                action=""
                :http-request="upFile1"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :auto-upload="false"
                enctype="multipart/form-data"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                style="width: 15%">
            <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">上传教案</div>
        </el-upload>
            <el-upload
                    ref="upload2"
                    action=""
                    :http-request="upFile2"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    enctype="multipart/form-data"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    style="width: 15%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传作业批改</div>
            </el-upload>
            <el-upload
                    ref="upload3"
                    action=""
                    :http-request="upFile3"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    enctype="multipart/form-data"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    style="width: 15%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传实验计划</div>
            </el-upload>
            <el-upload
                    ref="upload4"
                    action=""
                    :http-request="upFile4"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    enctype="multipart/form-data"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    style="width: 15%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传评课记录</div>
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
        name: "plans_inspection",
        data() {
            return {
                formInline: {
                    def_term: '' ,  //当前学年（后端获取）：默认选中
                    term: [] ,        //学年从后端获取
                    submit_state: '0'
                } ,
                tableData: [],
                btn_show: true ,
                file: {
                    teachplan: '' ,
                    homework: '' ,
                    experiment: '' ,
                    evaluationrecords: ''
                },
                fileForm: new FormData() ,
                fileList1: [] ,
                fileList2: [] ,
                fileList3: [] ,
                fileList4: [] ,
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
                if (this.tableData.length === 0) {
                    this.tableData.push({
                        t_name:'' ,
                        elecplan:'',
                        textplan:'',
                        planintegrated:'',
                        attendancenum:'',
                        attendancerecord:'',
                        hearclass:'',
                        assessclass:'',
                        classrecord:'',
                        arrangehomework:'',
                        correctinghomework:'',
                        experimentcount:'',
                        correctreportcount:'',
                        homeworktype: '',
                        experimenttype: '' ,
                        show: true ,
                        state: '0'
                    })
                }
                else
                    this.$message.warning('请先提交表格中的内容后再添加新的一行');
            } ,
            upFile1(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('teachplan' , file);
                this.fileList1.push({
                    name: file.name ,
                });
            } ,
            upFile2(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('homework' , file);
                this.fileList2.push({
                    name: file.name ,
                });
            } ,
            upFile3(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('experiment' , file);
                this.fileList3.push({
                    name: file.name ,
                });
            } ,
            upFile4(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('evaluationrecords' , file);
                this.fileList4.push({
                    name: file.name ,
                });
            } ,
            submit() {
                this.$confirm('提交后不能修改，请确保表格信息以及文件上传无误', '提示', {
                    type: 'warning'
                }).then(() => {
                    if (this.fileForm.teachplan !== '')
                        this.$refs.upload1.submit();
                    if (this.fileForm.homework !== '')
                        this.$refs.upload2.submit();
                    if (this.fileForm.experiment !== '')
                        this.$refs.upload3.submit();
                    if (this.fileForm.evaluationrecords !== '')
                        this.$refs.upload4.submit();
                    this.tableData[0].term = this.formInline.def_term;
                    this.tableData[0].state = '1';
                    this.tableData[0].t_id = sessionStorage.getItem('t_id');
                    this.tableData[0].college = sessionStorage.getItem('college');
                    this.tableData[0].department = sessionStorage.getItem('department');
                    console.log(this.tableData[0]);
                    request({
                        url: 'Teachingwork/TeachPlanCheck_submit',
                        method: 'post',
                        data: this.tableData[0]
                    }).then(res => {
                        if (res.data.msg === 'success') {
                            this.$message.success('表单上传成功');
                            this.tableData.splice(0,1);
                            request({
                                url: 'FilePath/normalFile_plan',
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
                                    this.fileList4.splice(0,1);
                                }
                            });
                        }
                    });
                }).catch(() => {
                });
            } ,
            query() {
                if (this.formInline.submit_state === '1')
                    this.btn_show = false;
                else
                    this.btn_show = true;
                const url = 'Teachingwork/TeachPlan_show';
                const data = {
                    term: this.formInline.def_term ,
                    t_id: sessionStorage.getItem('t_id') ,
                    state: this.formInline.submit_state
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
        left: 1200px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
</style>