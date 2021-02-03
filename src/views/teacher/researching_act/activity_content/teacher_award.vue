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
                   style="width:950px;">
            <el-table-column
                    prop="teacher"
                    label="教师姓名"
                    width="180">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.teacher"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.teacher}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="award"
                    label="奖励名称"
                    width="210">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.award"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.award}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="level"
                    label="级别"
                    width="180">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.level"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.level}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="时间"
                    width="180">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.time"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.time}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
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
                    :http-request="upFile"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    style="width: 30%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传材料</div>
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
        name: "teacher_award",
        data() {
            return {
                formInline: {
                    def_term: '' ,  //当前学年（后端获取）：默认选中
                    term: [] ,       //学年从后端获取
                    submit_state: '0'
                } ,
                tableData: []
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
                if (this.tableData.length === 0) {
                    this.tableData.push({
                        teacher: '',
                        award: '',
                        level: '',
                        time:'',
                        show:true ,
                        state: '0'
                    })
                }
                else
                    this.$message.warning('请先提交表格中的内容后再添加新的一行');
            } ,
            upFile(param) {
                const file = param.file;
                let fileForm = new FormData();
                fileForm.append('file' , file);
                //上传时删除数据中的show属性
                this.tableData[0].term = this.formInline.def_term;
                this.tableData[0].t_id = sessionStorage.getItem('t_id');
                this.tableData[0].college = sessionStorage.getItem('college');
                this.tableData[0].department = sessionStorage.getItem('department');
                request({
                    url: 'Researchactivity/Award_submit' ,
                    method: 'post' ,
                    data: this.tableData[0]
                }).then(res => {
                    if (res.data.msg === 'success') {
                        request({
                            url: 'FilePath/Award_file\n' ,
                            method: 'post' ,
                            params: {
                                t_id: sessionStorage.getItem('t_id') ,
                                college: sessionStorage.getItem('college') ,
                                department: sessionStorage.getItem('department') ,
                                t_name: sessionStorage.getItem('t_name') ,
                                term: this.formInline.def_term
                            } ,
                            data: fileForm ,
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then(res => {
                            if (res.data.msg === 'success') {
                                this.$message.success('文件与表单上传成功');
                                fileForm = new FormData();
                            }
                        })
                    }
                })
            } ,
            submit() {
                request({
                    url: "Researchactivity/Award_submit" ,
                    method: "post" ,
                    // data: {
                    //     form: this.tableData
                    // }
                    data: {table:this.tableData}
                }).then(res => {
                    console.log(res);
                    if (res.message === 'success')
                        this.$message.success('提交成功！');
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
        margin-top: 10px;
        text-align: center;
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