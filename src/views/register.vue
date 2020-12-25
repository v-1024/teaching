<template>
    <div>
        <navigation></navigation>
        <div class="grey"></div>
        <div class="box">
            <table class="table">
                <tr><td class="td1" colspan="2">填写个人信息</td></tr>
                <tr>
                    <td class="td1">
                        <el-form :model="ruleForm" :rules="rules" label-width="100px">
                            <el-form-item label="员工号" prop="t_id">
                                <el-input v-model="ruleForm.t_id"></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                    <td class="td1">
                        <el-form :model="ruleForm" label-width="100px">
                            <el-form-item label="学院/系部" required>
                                <el-cascader :options="ruleForm.col_dep" clearable v-model="ruleForm.ColDep"></el-cascader>
                            </el-form-item>
                        </el-form>
                    </td>
                </tr>
                <tr>
                    <td class="td1">
                        <el-form :model="ruleForm" :rules="rules" label-width="100px">
                            <el-form-item label="姓名" prop="t_name">
                                <el-input v-model="ruleForm.t_name"></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                    <td class="td1">
                        <el-form :model="ruleForm" label-width="100px">
                            <el-form-item label="性别" required>
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
                        <el-form :model="ruleForm" :rules="rules" label-width="100px">
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="ruleForm.password" type="password" show-password></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                    <td class="td1">
                        <el-form :model="ruleForm" :rules="rules" label-width="100px">
                            <el-form-item label="电话号码" prop="t_tel">
                                <el-input v-model="ruleForm.t_tel"></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                </tr>
                <tr>
                    <td class="td1">
                        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
                            <el-form-item label="确认密码" prop="check_pwd">
                                <el-input type="password" v-model="ruleForm.check_pwd" show-password></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                    <td class="td1">
                        <el-form :model="ruleForm" :rules="rules" label-width="100px">
                            <el-form-item label="邮箱" prop="t_email">
                                <el-input v-model="ruleForm.t_email"></el-input>
                            </el-form-item>
                        </el-form>
                    </td>
                </tr>
                <tr>
                    <td class="td1">
                        <el-form :model="ruleForm" :rules="rules" label-width="100px">
                            <el-form-item label="办公地点" prop="t_address">
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
    import {request} from "../network/request";

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
                    check_pwd: '',
                    t_email: '' ,
                    t_address: '' ,
                    t_sex: '男' ,
                    ColDep: '' ,
                    col_dep: []             //学院系部信息从数据库中取出，暂存在col_dep中
                } ,
                rules: {
                    t_id: [{required: true , message: '员工号不能为空' , trigger: 'blur'}] ,
                    t_name: [{required: true , message: '姓名不能为空' , trigger: 'blur'}] ,
                    password: [{required: true , message: '请输入密码' , trigger: 'blur'}] ,
                    check_pwd: [{required: true , message: '请再次输入密码' , trigger: 'blur'}] ,
                    t_tel: [{required: true , message: '联系方式不能为空' , trigger: 'blur'}] ,
                    t_email: [{required: true , message: '邮箱不能为空' , trigger: 'blur'}] ,
                    t_address: [{required: true , message: '办公地点不能为空' , trigger: 'blur'}] ,
                }
            } ;
        } ,
        created() {                                     //从后端获取学院/系部信息
            request({
                url: 'user/getCollege' ,
            }).then(res => {
                console.log(res.data);
                this.ruleForm.col_dep = res.data;
            })
        } ,
        methods: {
            register() {
                this.ruleForm.col_name = this.ruleForm.ColDep[0];
                this.ruleForm.dep_name = this.ruleForm.ColDep[1];
                if (this.ruleForm.t_id !== ''&&this.ruleForm.col_name !== ''&&this.ruleForm.t_name !== ''&&
                    this.ruleForm.dep_name !== ''&&this.ruleForm.password !== ''&&this.ruleForm.t_tel !== ''&&
                    this.ruleForm.t_email !== ''&&this.ruleForm.t_address !== ''&&this.ruleForm.ColDep !== '') {
                    if (this.ruleForm.password !== this.ruleForm.check_pwd)
                        this.$message.warning('两次输入的密码不一致，请重新输入');
                    else {
                        request({
                            url: "user/register" ,
                            method: "post" ,
                            data: {
                                t_id: this.ruleForm.t_id ,
                                college: this.ruleForm.col_name ,
                                t_name: this.ruleForm.t_name ,
                                department: this.ruleForm.dep_name ,
                                password: this.ruleForm.password ,
                                tel: this.ruleForm.t_tel ,
                                email: this.ruleForm.t_email ,
                                address: this.ruleForm.t_address ,
                                sex: this.ruleForm.t_sex ,
                            }
                        }).then(res => {
                            if (res === 'success') {
                                this.$message.success('提交成功，请等待系主任审核后进入系统');
                                setTimeout(() => {
                                    this.$router.push('/login')
                                } , 500)
                            }
                            else
                                this.$message.warning('该用户已注册，不能重复注册！')
                        })
                    }
                }
                else {
                    this.$message.warning('所有信息均不能为空');
                }
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