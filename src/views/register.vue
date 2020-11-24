<template>
    <div>
        <navigation></navigation>
        <div class="grey"></div>

        <div class="box">
            <table class="table">
                <tr><td class="td1" colspan="2">填写个人信息</td></tr>
                <tr>
                    <td class="td1">
                        <el-form :model="ruleForm" label-width="100px">
                            <el-form-item label="员工号">
                                <el-input v-model="ruleForm.t_id"></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                    <td class="td1">
                        <el-form :model="ruleForm" label-width="100px">
                            <el-form-item label="学院/系部">
                                <el-cascader :options="ruleForm.col_dep" clearable v-model="ruleForm.ColDep"></el-cascader>
                            </el-form-item>
                        </el-form>
                    </td>
                </tr>
                <tr>
                    <td class="td1">
                        <el-form :model="ruleForm" label-width="100px">
                            <el-form-item label="姓名">
                                <el-input v-model="ruleForm.t_name"></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                    <td class="td1">
                        <el-form :model="ruleForm" label-width="100px">
                            <el-form-item label="性别">
                                <el-radio-group v-model="ruleForm.t_sex">
                                    <el-radio label="男"></el-radio>
                                    <el-radio label="女"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </td>
                </tr>
                <tr>
                    <td class="td1">
                        <el-form :model="ruleForm" label-width="100px">
                            <el-form-item label="密码">
                                <el-input v-model="ruleForm.password" type="password" show-password></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                    <td class="td1">
                        <el-form :model="ruleForm" label-width="100px">
                            <el-form-item label="电话号码">
                                <el-input v-model="ruleForm.t_tel"></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                </tr>
                <tr>
                    <td class="td1">
                        <el-form :model="ruleForm" label-width="100px">
                            <el-form-item label="确认密码">
                                <el-input v-model="ruleForm.repassword" show-password></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                    <td class="td1">
                        <el-form :model="ruleForm" label-width="100px">
                            <el-form-item label="邮箱">
                                <el-input v-model="ruleForm.t_email"></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                </tr>
                <tr>
                    <td class="td1">
                        <el-form :model="ruleForm" label-width="100px">
                            <el-form-item label="办公地点">
                                <el-input v-model="ruleForm.t_address"></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                    <td class="td1">
                        <el-button type="primary" @click="register">注册</el-button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import Navigation from "../components/navigation";
    export default {
        name: "register",
        components: {Navigation} ,
        data() {
            return {
                ruleForm: {
                    t_id: '' ,
                    col_name: '' ,
                    t_name: '' ,
                    dep_name: '' ,
                    password: '' ,
                    t_tel: '' ,
                    repassword: '',
                    t_email: '' ,
                    t_address: '' ,
                    t_sex: '男' ,
                    ColDep: '' ,
                    col_dep: [                       //学院系部信息从数据库中取出，暂存在col_dep中
                        {
                            value: '计算机科学与工程学院' ,
                            label: '计算机科学与工程学院' ,
                            children: [
                                {
                                    value:'网络工程' ,
                                    label: '网络工程'
                                } ,
                                {
                                    value:'软件工程'  ,
                                    label: '软件工程'
                                } ,
                                {
                                    value:'物联网工程' ,
                                    label: '物联网工程'
                                } ,
                                {
                                    value:'大数据' ,
                                    label: '大数据'
                                } ,
                                {
                                    value:'信息安全' ,
                                    label: '信息安全'
                                } ,
                                {
                                    value:'计算机科学与技术' ,
                                    label: '计算机科学与技术'
                                }
                            ]
                        } ,
                        {
                            value: '体育学院' ,
                            label: '体育学院' ,
                            children: [
                                {
                                    value: '社体'  ,
                                    label: '社体'
                                } ,
                                {
                                    value: '体教' ,
                                    label: '体教'
                                }
                            ]
                        }
                    ]
                } ,
                rules: {

                }
            }
        } ,
        methods: {
            register() {
                this.ruleForm.col_name = this.ruleForm.ColDep[0]
                this.ruleForm.dep_name = this.ruleForm.ColDep[1]
            }
        }
    }
</script>

<style scoped>
    .grey {
        background-color: rgb(245, 247, 250);
        margin: 0 auto;
        width: 100%;
        height: 45px;
    }

    .box {
        width: 1400px;
        min-height: 600px;
        margin: 0 auto;
    }

    .table {
        width: 1300px;
        height: 600px;
        margin: 0 auto;
    }

    .td1 {
        font-family: Arial;
        font-size: 30px;
        text-align: center;
        font-weight: bold;
    }

    .el-input {
        width: 300px;
    }

    .el-cascader {
        width: 300px;
    }

    td {
        height: 70px;
        line-height: 70px;
    }

    .el-button {
        width: 150px;
        float: right;
        margin-right: 120px;
    }
</style>