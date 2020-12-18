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
                   border
                   style="margin-bottom: 0">
            <el-table-column prop="t_name" label="姓名" width="80"></el-table-column>
            <el-table-column prop="course" label="课程" width="160"></el-table-column>
            <el-table-column prop="lessonplan" label="授课计划" width="160"></el-table-column>
            <el-table-column prop="teachplan" label="教案(有或无）" width="80"></el-table-column>
            <el-table-column prop="attendancenum" label="课堂考勤(次)" width="90"></el-table-column>
            <el-table-column prop="attendancerate" label="学生出勤率" width="80"></el-table-column>
            <el-table-column prop="correctinghomework" label="作业批改(次)" width=90"></el-table-column>
            <el-table-column prop="answerscount" label="辅导答疑(次)" width="80"></el-table-column>
            <el-table-column prop="onscheduleexperiment" label="是否按计划设实验(随堂)" width="120"></el-table-column>
            <el-table-column prop="exitprogram" label="教学中存在的问题" width="170"></el-table-column>
            <el-table-column prop="remarks" label="备注" width="100"></el-table-column>
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
                        ref="upload"
                        :http-request="upFile"
                        class="upload-demo"
                        action=""
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="5"
                        :on-exceed="handleExceed"
                        :auto-upload="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </div>
            <div style="float: left;margin-left: 100px">
            <span style="float: left;margin: 5px 10px">课堂考勤</span>
            <el-upload
                    ref="upload"
                    :http-request="upFile"
                    class="upload-demo"
                    action=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="5"
                    :on-exceed="handleExceed"
                    :auto-upload="false">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            </div>
                <div style="float: left;margin-left: 100px">
                <span style="float: left;margin: 5px 10px">辅导答疑</span>
                <el-upload
                        ref="upload"
                        class="upload-demo"
                        action=""
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :http-request="upFile"
                        multiple
                        :limit="5"
                        :auto-upload="false"
                        :on-exceed="handleExceed">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </div>
        </div>
        <el-button slot="reference" style="margin:40px 500px" @click="submit">提交</el-button>
    </div>
</template>

<script>
    import {request} from "../../../../network/request";

    export default {
        name: "teaching_inspection",
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
            }
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
                // this.$refs.upload.submit();
                request({
                    url: 'Teachingwork/TeachCheck_submit' ,
                    method: "post" ,
                    data: this.tableData
                }).then(res => {
                    console.log(res);
                })
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
            }
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