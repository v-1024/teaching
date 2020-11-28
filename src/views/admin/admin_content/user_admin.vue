<template>
    <div class="box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="员工号">
                <el-input v-model="formInline.t_id" placeholder="员工号" clearable></el-input>
            </el-form-item>
            <el-form-item label="教师">
                <el-input v-model="formInline.t_name" placeholder="教师" clearable></el-input>
            </el-form-item>
            <el-form-item label="教师状态">
                <el-select v-model="formInline.t_state" placeholder="教师状态" clearable>
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="职位">
                <el-select v-model="formInline.t_role" placeholder="职位" clearable>
                    <el-option label="教师" value="教师"></el-option>
                    <el-option label="系主任" value="系主任"></el-option>
                    <el-option label="教务办" value="教务办"></el-option>
                    <el-option label="院长" value="院长"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="">查询</el-button>
            </el-form-item>
        </el-form>
        <template>
            <el-table
                    :data="tableData"
                    border
                    stripe
                    style="width: 100%">
                <el-table-column prop="t_id" label="员工号" width="100px"></el-table-column>
                <el-table-column prop="t_name" label="姓名" width="100px"></el-table-column>
                <el-table-column prop="t_sex" label="性别" width="80px"></el-table-column>
                <el-table-column prop="t_col" label="学院" width="200px"></el-table-column>
                <el-table-column prop="t_dep" label="系部"></el-table-column>
                <el-table-column prop="t_role" label="职位" width="100px"></el-table-column>
                <el-table-column prop="t_tel" label="电话号码"></el-table-column>
                <el-table-column prop="t_address" label="办公地点"></el-table-column>
                <el-table-column prop="t_email" label="Email"></el-table-column>
                <el-table-column label="状态" width="90px">
                    <!--作用域插槽-->
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.t_state"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <el-button type="primary" size="mini">修改信息</el-button>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
    export default {
        name: "user_admin" ,
        data() {
            return {
                formInline: {
                    t_id: '',
                    t_name: '' ,
                    state: '' ,
                } ,
                tableData: [
                    {
                        t_id: '150222' ,
                        t_name: '张三',
                        t_sex: '男',
                        t_col: '计算机科学与工程学院',
                        t_dep: '网络工程系',
                        t_role: '教师' ,
                        t_tel: '12345678911' ,
                        t_address: '逸夫楼203' ,
                        t_email: '123456@qq.com' ,
                        t_state: true
                    }
                    ,{
                        t_id: '150221' ,
                        t_name: '李四',
                        t_sex: '女',
                        t_col: '计算机科学与工程学院',
                        t_dep: '网络工程系',
                        t_role: '院长' ,
                        t_tel: '12345678910' ,
                        t_address: '逸夫楼204' ,
                        t_email: '1234564@qq.com' ,
                        t_state: false
                    }
                    ,{
                        t_id: '150220' ,
                        t_name: '王五',
                        t_sex: '男',
                        t_col: '计算机科学与工程学院',
                        t_dep: '网络工程系',
                        t_role: '系主任' ,
                        t_tel: '12345678912' ,
                        t_address: '逸夫楼205' ,
                        t_email: '1234567@qq.com' ,
                        t_state: true
                    } ,
                ]
            }
        } ,
    }
</script>

<style scoped>
    .box {
        margin-top: 10px;
        text-align: center;
    }
</style>