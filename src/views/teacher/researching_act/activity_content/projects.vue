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
        <el-button slot="reference" style="margin-left: 100px">添加行</el-button>
        <el-table  class="table"
                   :data="tableData"
                   height="250"
                   border
                   style="width:930px;">
            <el-table-column
                    prop="teacher"
                    label="教师姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="subject"
                    label="项目名称"
                    width="210">
            </el-table-column>
            <el-table-column
                    prop="level"
                    label="级别"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="funds"
                    label="立项经费"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="立项时间"
                    width="180">
            </el-table-column>
        </el-table>
        <span style="font-weight: bold;margin-left:200px">添加附件</span>
        <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="5"
                :on-exceed="handleExceed"
                :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button slot="reference" style="margin:20px 500px">提交</el-button>
    </div>
</template>

<script>
    export default {
        name: "projects",
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '2020-2021第一学期'
                }],
                tableData: [{
                    teacher: '张三',
                    subject: '资源管理',
                    level: '省级',
                    funds: '20000元',
                    time:'2020/11/28'
                }, {
                    teacher: '张三',
                    subject: '资源管理',
                    level: '省级',
                    funds: '20000元',
                    time:'2020/11/28'
                }, {
                    teacher: '张三',
                    subject: '资源管理',
                    level: '省级',
                    funds: '20000元',
                    time:'2020/11/28'
                }, {
                    teacher: '张三',
                    subject: '资源管理',
                    level: '省级',
                    funds: '20000元',
                    time:'2020/11/28'
                }, {
                    teacher: '张三',
                    subject: '资源管理',
                    level: '省级',
                    funds: '20000元',
                    time:'2020/11/28'
                }],
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
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
            }
        }
    }
</script>

<style scoped>
    .table{
        align: center;
        margin: 20px 100px;
    }

    .content {
        width: 100%;
    }
    .select{
        margin:30px 30px;
        border: #333333;
    }
    .upload-demo{
        margin-left: 300px;
        padding-right: 700px;
    }
</style>