<template>
    <div class="box">
        <el-table
                    class="table"
                    :data="tableData"
                    stripe
                    height="450px"
                    style="width: 100%">
                <el-table-column prop="name" label="名称" align="center"></el-table-column>
                <el-table-column label="确认情况" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="详情" align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="primary"
                                @click="check(scope.$index, scope.row)">查看</el-button>  <!--查看做成dialog形式-->
                    </template>
                </el-table-column>
            </el-table>
        <div class="upload">
            <el-upload
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="3"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    style="width: 30%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">上传计划与总结</div>
            </el-upload>
            <el-button size="medium" type="primary" class="btn">提交</el-button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "collection" ,
        data() {
            return {
                fileList: [] ,
                tableData: [
                    {name: '公开课评课记录' , state: false} ,
                    {name: '听课统计表' , state: false} ,
                    {name: '教师教学检查表' , state: false} ,
                    {name: '期中教学检查基本数据统计表' , state: false} ,
                    {name: '系部教案检查登记表' , state: false} ,
                    {name: '系部考察统计表' , state: false} ,
                    {name: '系部实验报告检查登记表' , state: false} ,
                    {name: '系部作业检查登记表' , state: false} ,
                    {name: '教师对外交流情况一览表' , state: false} ,
                    {name: '教师奖励一览表' , state: false} ,
                    {name: '教研项目一览表' , state: false} ,
                    {name: '计划与总结' , state: false}
                ]
            }
        } ,
        methods: {
            check(index , row) {
                console.log(index, row);
            } ,
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>

<style scoped>
    .box {
        margin: 10px auto;
        text-align: center;
    }

    .el-table {
        margin-bottom: 10px;
    }

    .upload {
        display: flex;
        text-align: center;
    }

     .btn {
         width: 150px;
         height: 40px;
         position: absolute;
         right: 150px;
     }
</style>