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
                        height="280"
                        border
                        style="width:1100px;">
                    <el-table-column
                            prop="time"
                            label="时间"
                            width="180">
                        <template slot-scope="scope">
                            <el-input  v-show="scope.row.show" v-model="scope.row.time"></el-input>
                            <span v-show="!scope.row.show">{{scope.row.time}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="教学交流、考察、学习内容"
                            width="220">
                        <template slot-scope="scope">
                            <el-input  v-show="scope.row.show" v-model="scope.row.content"></el-input>
                            <span v-show="!scope.row.show">{{scope.row.content}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地点"
                            width="180">
                        <template slot-scope="scope">
                            <el-input  v-show="scope.row.show" v-model="scope.row.address"></el-input>
                            <span v-show="!scope.row.show">{{scope.row.address}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="teacher"
                            label="教师"
                            width="150">
                        <template slot-scope="scope">
                            <el-input  v-show="scope.row.show" v-model="scope.row.teacher"></el-input>
                            <span v-show="!scope.row.show">{{scope.row.teacher}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="remarks"
                            label="备注"
                            width="180">
                        <template slot-scope="scope">
                            <el-input  v-show="scope.row.show" v-model="scope.row.remarks"></el-input>
                            <span v-show="!scope.row.show">{{scope.row.remarks}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="scope.row.show =true">编辑</el-button>
                            <el-button @click="scope.row.show =false">保存</el-button>
                        </template>
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
                :on-exceed="handleExceed">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button slot="reference" style="margin-left: 720px">提交</el-button>
    </div>
</template>

<script>
    export default {
        name: "exchange",
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '2020-2021第一学期'
                }],
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
                    time: '',
                    content: '',
                    teacher: '',
                    remarks:'',
                    show :true
                })
            }
        }
    }


</script>

<style scoped>
    .table{
        align: center;
        margin: 20px 100px;
        font-size:16px;
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
        width:300px;

    }
</style>