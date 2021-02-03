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
                <el-button  icon="el-icon-plus" @click="add_line">添加行</el-button>
            </el-form-item>
        </el-form>
        <el-table  class="table"
                   :data="tableData"
                   height="350px"
                   border
                   style="margin-bottom: 0;width:100%">
            <el-table-column prop="t_name" label="姓名">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.t_name"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.t_name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="elecplan" label="是否是电子教案">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.elecplan"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.elecplan}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="textplan" label="是否是文本文档">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.textplan"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.textplan}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="planintegrated" label="教案是否完善">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.planintegrated"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.planintegrated}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="attendancenum" label="考勤次数">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.attendancenum"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendancenum}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="attendancerecord" label="考情是否有记录">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.attendancerecord"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.attendancerecord}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="hearclass" label="听课次数">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.hearclass"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.hearclass}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="assessclass" label="评课次数">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.assessclass"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.assessclass}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="classrecord" label="听课是否有记录">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.classrecord"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.classrecord}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="arrangehomework" label="布置作业次数">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.arrangehomework"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.arrangehomework}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="correctinghomework" label="批改作业次数">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.correctinghomework"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.correctinghomework}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="experimentcount" label="实验次数">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.experimentcount"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.experimentcount}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="correctreportcount" label="批改实验报告次数">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.correctreportcount"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.correctreportcount}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="homeworktype" label="电子作业/纸质作业">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.homeworktype"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.homeworktype}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="experimenttype" label="实验类型">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.experimenttype"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.experimenttype}}</span>
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
                <div slot="tip" class="el-upload__tip">上传计划实验</div>
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
                file: {
                    teachplan: '' ,
                    homework: '' ,
                    experiment: '' ,
                    evaluationrecords: ''
                },
                fileForm: new FormData()
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
                    show: true
                })
            } ,
            upFile1(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('teachplan' , file);
            } ,
            upFile2(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('homework' , file);
            } ,
            upFile3(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('experiment' , file);
            } ,
            upFile4(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('evaluationrecords' , file);
            } ,
            submit() {
                if (this.fileForm.teachplan !== '')
                    this.$refs.upload1.submit();
                if (this.fileForm.homework !== '')
                    this.$refs.upload2.submit();
                if (this.fileForm.experiment !== '')
                    this.$refs.upload3.submit();
                if (this.fileForm.evaluationrecords !== '')
                    this.$refs.upload3.submit();
                delete this.tableData[0].show;
                this.tableData[0].term = this.formInline.def_term;
                this.tableData[0].t_id = sessionStorage.getItem('t_id');
                console.log(this.tableData[0]);
                request({
                    url: 'Teachingwork/TeachPlanCheck_submit',
                    method: 'post',
                    data: this.tableData[0]
                }).then(res => {
                    if (res.data.msg === 'success') {
                        request({
                            url: 'FilePath/normalFile_plan',
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