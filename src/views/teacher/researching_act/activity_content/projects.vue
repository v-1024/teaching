<template>
    <div class="content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" id="quireForm7">
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
            <!--<el-form-item>-->
                <!--<el-button  icon="el-icon-plus" @click="add_line" v-if="btn_show">添加行</el-button>-->
            <!--</el-form-item>-->
        </el-form>
        <el-table  class="table"
                   :data="tableData"
                   height="350px"
                   stripe
                   style="width:97%;">
            <el-table-column
                    prop="teacher"
                    label="教师姓名"
                    width="180" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.t_name"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.t_name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="subject"
                    label="项目名称"
                    width="210" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.projectname"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.projectname}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="level"
                    label="级别"
                    width="180" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.level"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.level}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="funds"
                    label="立项经费"
                    width="180" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.projectfunds"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.projectfunds}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="立项时间" align="center">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.projecttime"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.projecttime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="上传附件" v-if="btn_show" align="center">
                <template slot-scope="scope">
                    <el-dropdown >
                        <span class="el-dropdown-link" @click="dialogVisible = true">
                            上传附件 <i class="el-icon-upload"></i>
                        </span>
                    </el-dropdown>
                </template>
            </el-table-column>
            <el-table-column label="下载" v-if="!btn_show" align="center">
                <template slot-scope="scope">
                    <el-dropdown >
                        <span class="el-dropdown-link" @click="downLoad(scope.row.projectpath)">
                            文件下载
                        </span>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <!--<div class="upload" v-if="btn_show">-->
            <!--<el-upload-->
                    <!--ref="upload"-->
                    <!--action=""-->
                    <!--:http-request="upFile"-->
                    <!--:on-preview="handlePreview"-->
                    <!--:on-remove="handleRemove"-->
                    <!--:before-remove="beforeRemove"-->
                    <!--:auto-upload="false"-->
                    <!--multiple-->
                    <!--:limit="3"-->
                    <!--:on-exceed="handleExceed"-->
                    <!--style="width: 30%">-->
                <!--<el-button size="small" type="primary" slot="trigger">选取文件</el-button>-->
                <!--<div slot="tip" class="el-upload__tip">上传材料</div>-->
            <!--</el-upload>-->
        <!--</div>-->
        <el-dialog
                title="附件上传"
                :visible.sync="dialogVisible"
                width="40%">

            <div class="upload"><el-upload
                    ref="upload"
                    action=""
                    :http-request="upFile"
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
            <el-button style="width: 200px" type="primary" @click="file_verify">确 定</el-button>
        </span>
        </el-dialog>
        <div v-if="btn_show" style="display: flex; flex: 1 ; margin: 20px">
            <el-input
                    style="width: 800px"
                    type="textarea"
                    :rows="3"
                    v-model="fileItem"
                    placeholder="已选择的文件"
                    disabled></el-input>
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
        inject: ['reload'] ,
        name: "projects",
        data() {
            return {
                formInline: {
                    def_term: '' ,  //当前学年（后端获取）：默认选中
                    term: [] ,       //学年从后端获取
                    submit_state: '0'
                } ,
                tableData: [{
                    t_name: '',
                    projectname: '',
                    level: '',
                    projectfunds: '',
                    projecttime:'',
                    show:true ,
                    state: '0'
                }],
                btn_show: true ,
                fileList: [] ,
                fileItem: '' ,
                fileForm: new FormData() ,
                dialogVisible: false
            };
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
                this.fileList.splice(0,1);
                this.fileItem = "暂未选择任何文件"
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
            add_line(){
                this.tableData.push({
                    t_name: '',
                    projectname: '',
                    level: '',
                    projectfunds: '',
                    projecttime:'',
                    show:true ,
                    state: '0'
                })
            } ,
            file_verify() {
                this.dialogVisible = false;
                if (this.fileForm.file !== '')
                    this.$refs.upload.submit();
                this.fileItem = this.fileList[0].name;
            } ,
            upFile(param) {
                const file = param.file;
                this.fileList.push({
                    name: file.name ,
                });
                this.fileForm.append('file' , file);
            } ,
            submit() {
                this.$confirm('提交后不能修改，请确保表格信息以及文件上传无误', '提示', {
                    type: 'warning'
                }).then(() => {
                    if (this.fileForm.file !== '')
                        this.$refs.upload.submit();
                    this.tableData[0].term = this.formInline.def_term;
                    this.tableData[0].state = '1';
                    this.tableData[0].t_id = sessionStorage.getItem('t_id');
                    this.tableData[0].college = sessionStorage.getItem('college');
                    this.tableData[0].department = sessionStorage.getItem('department');
                    request({
                        url: 'StudentProject/StuProject_submit' ,
                        method: 'post' ,
                        data: this.tableData[0]
                    }).then(res => {
                        if (res.data.msg === 'success') {
                            this.$message.success('表单上传成功');
                            this.tableData.splice(0,1);
                            this.add_line();
                            request({
                                url: 'FilePath/StuProject_file' ,
                                method: 'post' ,
                                params: {
                                    t_id: sessionStorage.getItem('t_id') ,
                                    college: sessionStorage.getItem('college') ,
                                    department: sessionStorage.getItem('department') ,
                                    t_name: sessionStorage.getItem('t_name') ,
                                    term: this.formInline.def_term
                                } ,
                                data: this.fileForm ,
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then(res => {
                                if (res.data.msg === 'success') {
                                    this.$message.success('文件上传成功');
                                    this.reload();
                                    this.fileForm = new FormData();
                                    this.fileList.splice(0,1);
                                    this.fileItem = "暂未选择任何文件"
                                }
                            })
                        }
                    })
                }).catch(() => {
                });
            } ,
            query() {
                if (this.formInline.submit_state === '1') {
                    this.btn_show = false;
                    const url = 'Researchactivity/Project_show';
                    const data = {
                        term: this.formInline.def_term ,
                        t_id: sessionStorage.getItem('t_id') ,
                        state: this.formInline.submit_state
                    };
                    queryData(url , data).then(res =>{
                        this.tableData = res.data;
                    })
                }
                else {
                    this.btn_show = true;
                    this.tableData.splice(0,this.tableData.length);
                    this.add_line();
                }
            } ,
            downLoad(command) {
                console.log(command);
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

<style>
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
    .table{
        align: center;
        margin: 0 auto 20px;
        font-size:16px;
    }

    .table .el-input__inner {
        border: 0;
    }

    #quireForm7 .top_form {
        width: 30%;
        margin-top: 10px;
    }

    #quireForm7 .el-input__inner {
        width: 320px;
    }

    .content {
        width: 100%;
        margin-top: 10px;
        text-align: center;
    }

    .btn {
        width: 250px;
        height: 40px;
        margin-left: 150px;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
</style>