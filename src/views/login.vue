<template>
    <div id="login">
        <navigation></navigation>
        <div class="grey"></div>
        <div class="background_img">
            <div class="lbox">
                <table id="table">
                    <tr><td class="td1">用户登录</td></tr>
                    <tr><td class="td2">员工号</td></tr>
                    <tr>
                        <td>
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                                <el-form-item prop="t_id">
                                    <el-input type="text" v-model="ruleForm.t_id"></el-input>
                                </el-form-item>
                            </el-form>
                        </td>
                    </tr>
                    <tr><td class="td2">密码</td></tr>
                    <tr>
                        <td>
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                                <el-form-item prop="pwd">
                                    <el-input type="password" v-model="ruleForm.pwd" show-password></el-input>
                                </el-form-item>
                            </el-form>
                        </td>
                    </tr>
                    <tr>
                        <td class="btn">
                            <el-button type="primary" @click="login" @keyup.enter="login">登录</el-button>
                        </td>
                    </tr>
                    <tr>
                        <td class="td3" @click="register" @keyup.enter="register">
                            用户注册
                        </td>
                    </tr>
                    <tr>
                        <td class="td4">
                            忘记密码请与管理员联系
                        </td>
                    </tr>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
    import {request} from "../network/request";
    import Navigation from "../components/navigation";
    export default {
        name: "login",
        components: {Navigation},
        data() {
            return {
                ruleForm: {
                    t_id: '' ,
                    pwd: ''
                }
                 ,
                rules: {
                    t_id: [
                            { required: true, message: '请输入员工号', trigger: 'blur' }
                        ] ,
                    pwd: [
                            { required: true, message: '请输入密码', trigger: 'blur' }
                        ]
                }
            }
        } ,
        methods: {
            register() {
                this.$router.push('/register')
            },
            login()
            {
                request({
                    url : "login" ,
                    method : "post",
                    params:{
                        t_id: this.ruleForm.t_id ,
                        password: this.ruleForm.pwd
                    },
                }).then(res=>{     //在这里要获取个人信息，存储在Vuex中
                    if (res.data === 'NotFound this userName' || res.data === 'Invalid username/password')
                        this.$message.error('用户名或密码错误,请重新输入');
                    else {
                        sessionStorage.setItem('Authorization' , res.data);
                        request({
                            url: 'PersonCenter/info_show' ,
                            method: 'post' ,
                            params: {
                                t_id: this.ruleForm.t_id
                            }
                        }).then(res => {
                            sessionStorage.setItem('t_id' , res.data.t_id);
                            sessionStorage.setItem('t_name' , res.data.t_name);
                            sessionStorage.setItem('college' , res.data.college);
                            sessionStorage.setItem('department' , res.data.department);
                            sessionStorage.setItem('address' , res.data.address);
                            sessionStorage.setItem('tel' , res.data.tel);
                            sessionStorage.setItem('role' , res.data.role);
                            sessionStorage.setItem('email' , res.data.email);
                            if(sessionStorage.getItem('role') === '4')
                                this.$router.push('/admin');
                            else
                                this.$router.push('/teacher');
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #login{
        width: 100%;
        height: 580px;
    }

    .background_img {
        width: 1400px;
        height: 100%;
        background-image: url("../assets/login_background.png");
        margin: 0 auto;
    }

    .grey {
        background-color: rgb(245, 247, 250);
        margin: 0 auto;
        width: 100%;
        height: 45px;
    }

    #login .lbox {
        width: 400px;
        height: 450px;
        float: right;
        margin: 80px 90px;
        border-radius: 20px;
        background-color: white;
        box-shadow: 0 1px 10px 1px rgba(0, 0, 0, 0.11);
    }

    #table {
        width: 350px;
        margin: 20px auto;
        height: 400px;
    }

    .td1 {
        font-family: Arial;
        font-size: 22px;
        text-align: center;
        font-weight: bold;
    }

    .td2 {
        font-family: Arial;
        font-size: 20px;
        font-weight: bold;
    }

    .td3 {
        text-align: center;
        color: #2D61AC;
        text-decoration-line: underline;
        cursor: pointer;
        font-family: "微软雅黑";
    }

    .td4 {
        text-align: center;
        color: #F56C6C;
        font-family: "微软雅黑";
    }

    .btn {
        text-align: center;
    }

    .el-button {
        width: 200px;
    }
</style>