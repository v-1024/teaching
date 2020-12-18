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
                   height="280"
                   border
                   style="width:1000px;">
            <el-table-column
                    prop="teacher"
                    label="教师姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="thesis"
                    label="论文名称"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="periodical"
                    label="刊物名称"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="发表时间"
                    width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="scope.row.show =true">编辑</el-button>
                    <el-button @click="scope.row.show =false">保存</el-button>
                </template>
            </el-table-column>
        </el-table>

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
        name: "thesis",
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
            add_line(){
                this.tableData.push({
                    teacher: '张三',
                    thesis: '关于青年学生',
                    periodical: '青年报',
                    time:'2020/11/28',
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
        font-size:16px;
    }

    .content {
        width: 100%;
        margin-top: 10px;
        text-align: center;
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