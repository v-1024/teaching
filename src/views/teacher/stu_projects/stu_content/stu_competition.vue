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
                <el-button type="primary" icon="el-icon-search" @click="">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button  icon="el-icon-plus" @click="add_line">添加行</el-button>
            </el-form-item>
        </el-form>
        <el-table  class="table"
                   :data="tableData"
                   height="350px"
                   border
                   style="width:1100px;">
            <el-table-column
                    prop="t_name"
                    label="教师姓名"
                    width="180">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.teacher"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.teacher}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="competitionname"
                    label="竞赛名称"
                    width="190">
                <template slot-scope="scope">
                    <el-input  v-show="scope.row.show" v-model="scope.row.competition"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.competition}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="award"
                    label="获奖/成果"
                    width="180">
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
                   >
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
                    http-request="upFile"
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

    export default {
        name: "stu_competition",
        data() {
            return {
                formInline: {
                    def_term: '2020-2021-1' ,  //当前学年（后端获取）：默认选中
                    term:         //学年从后端获取
                        [
                            '2020-2021-1' ,
                            '2019-2020-2'
                        ]
                } ,
                tableData: [],
            };
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
            },
            add_line() {
                this.tableData.push({
                    t_name: '',
                    competitionname: '',
                    award: '',
                    level: '',
                    time: '',
                    show:true
                })
            } ,
            upFile(param) {
                const file = param.file;
                let formData = new FormData();
                formData.append("file" , file);
                formData.append("t_name" , this.tableData.t_name);
                formData.append("competitionname" , this.tableData.competitionname);
                formData.append("award" , this.tableData.award);
                formData.append("level" , this.tableData.level);
                formData.append("time" , this.tableData.time);
                request({
                    url: 'StudentProject/StuProject_submit' ,
                    method: "post" ,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    } ,
                    data: formData
                }).then(res => {
                    console.log(res);
                })
            } ,
            submit() {
                this.$refs.upload.submit();
            }

       }}
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