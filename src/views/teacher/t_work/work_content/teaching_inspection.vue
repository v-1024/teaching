<template>
    <div class="content">
        <span style="margin-top: 30px; margin-left: 250px">年份选择</span>
        <el-select class="select" v-model="value" placeholder="2020-2021第一学期">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button slot="reference" style="margin-left: 100px" @click="add_line">添加行</el-button>
        <el-table  class="table"
                   :data="tableData"
                   border
                   style="margin-bottom: 0">
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="subject"
                    label="课程"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="schedule"
                    label="授课计划"
                    width="160">
            </el-table-column>
            <el-table-column
                    prop="plan"
                    label="教案(有或无）"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="attendance_times"
                    label="课堂考勤(次)"
                    width="90">
            </el-table-column>
            <el-table-column
                    prop="attendance"
                    label="学生出勤率"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="work"
                    label="作业批改(次)"
                    width=90">
            </el-table-column>
            <el-table-column
                    prop="coach"
                    label="辅导答疑(次)"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="test"
                    label="是否按计划设实验(随堂)"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="problem"
                    label="教学中存在的问题"
                    width="170">
            </el-table-column>
            <el-table-column
                    prop="remarks"
                    label="备注"
                    width="100">
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button @click="scope.row.show =true">编辑</el-button>
                    <el-button @click="scope.row.show =false">保存</el-button>
                </template>
            </el-table-column>
        </el-table>
        <span style="font-weight: bold;float: left;margin:30px 150px">添加附件
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div></span>
        <div class="upload_1">
            <div style="margin-left: 50px">
        <span style="float: left;margin: 5px 10px">授课计划</span>
        <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="5"
                :on-exceed="handleExceed">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
            </div>
            <div style="float: left;margin-left: 100px">
            <span style="float: left;margin: 5px 10px">课堂考勤</span>
            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="5"
                    :on-exceed="handleExceed">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            </div>
            <div style="float: left;margin-left: 100px">
            <span style="float: left;margin: 5px 10px">辅导答疑</span>
            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="5"
                    :on-exceed="handleExceed">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            </div>
        </div>
        <el-button slot="reference" style="margin:40px 500px">提交</el-button>
    </div>
</template>

<script>
    export default {
        name: "teaching_inspection",
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '2020-2021第一学期'
                }],
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
            add_line() {
                this.tableData.push({
                    name:'' ,
                    subject:'',
                    schedule:'',
                    plan:'',
                    attendance_times:'',
                    attendance:'',
                    work:'',
                    coach:'',
                    test:'',
                    problem:'',
                    remarks:'',
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