<template>
    <div>
        <el-popover class="span"
                    placement="bottom"
                    trigger="hover">
            <div class="span">
                <p>{{head}}</p> <el-divider></el-divider>
                <p class="hover" @click="profile">个人中心</p>
                <p class="hover" v-show="role_id !== '1'" @click="change_role">切换角色</p>
                <p class="hover" @click="quit">退出登录</p>
                <el-tooltip v-show="role_name === '教师'" effect="dark" placement="bottom-start"
                            content="所有材料提交完成后点击，系主任将会获得您的提交状态" >
                    <p id="verify" class="hover" @click="identify">确认已提交</p>
                </el-tooltip>
            </div>
            <el-avatar icon="el-icon-user-solid" slot="reference"></el-avatar>
        </el-popover>

        <el-drawer
                size="50%"
                :visible.sync="drawer"
                direction="rtl"
                :before-close="handleClose"
                :with-header="false">
            <div class="drawer">
                <el-card class="box-card">
                    <div slot="header">
                        <span style="font-size: 20px">个人中心</span>
                    </div>
                    <div>
                        <table class="table">
                            <tr><td class="td">姓名：</td>
                                <td>{{t_name}}</td>
                            </tr>
                            <tr><td class="td">员工号：</td>
                                <td>{{t_id}}</td>
                            </tr>
                            <tr><td class="td">邮箱：</td>
                                <td v-show="show">{{t_email}}</td>
                                <td><el-input type="text" v-show="!show" v-model="t_email"></el-input></td>
                            </tr>
                            <tr><td class="td">电话号码：</td>
                                <td v-show="show">{{t_tel}}</td>
                                <td><el-input type="text" v-show="!show" v-model="t_tel"></el-input></td>
                            </tr>
                            <tr><td class="td">办公地点：</td>
                                <td v-show="show">{{address}}</td>
                                <td><el-input type="text" v-show="!show" v-model="address"></el-input></td>
                            </tr>
                        </table>
                    </div>
                </el-card>
                    <el-button class="pwd_btn" type="primary" @click="pwd_alert()">修改密码</el-button>
                    <el-button class="drawer_btn" type="primary" v-show="show" @click="edit">编辑</el-button>
                    <el-button class="drawer_btn" type="primary" v-show="!show" @click="save">保存</el-button>
            </div>
        </el-drawer>

        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :before-close="before_close">
            <el-form :model="formInline" :rules="rules">
                <el-form-item label="新密码" label-width="120px" prop="pwd">
                    <el-input type="password" v-model="formInline.pwd" style="width: 400px"
                              show-password clearable></el-input>
                </el-form-item>
                <el-form-item label="确认密码" label-width="120px" prop="pwd_verify">
                    <el-input type="password" v-model="formInline.pwd_verify" style="width: 400px"
                              show-password clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="pwd_save">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {request} from "../network/request";

    export default {
        name: "profile_pho" ,
        data() {
            return {
                formInline: {
                    pwd: '' ,
                    pwd_verify: ''
                } ,
                rules: {
                    pwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }] ,
                    pwd_verify: [{ required: true, message: '请再次输入密码', trigger: 'blur' }]
                } ,
                dialogFormVisible: false ,
                drawer: false ,
                head: '' ,
                show: true ,
                t_id: sessionStorage.getItem('t_id') ,
                t_email: sessionStorage.getItem('email') ,
                t_tel: sessionStorage.getItem('tel') ,
                address: sessionStorage.getItem('address')
            }
        } ,
        props: {
            role_id: '' ,
            role_name: '' ,
            t_name: ''
        } ,
        created() {
            return this.head =  this.role_name + '：'+ this.t_name;
            sessionStorage.setItem('flag' , '0')
        } ,
        methods: {
            change_role() {
                if (sessionStorage.getItem('flag') === '0') {
                    sessionStorage.setItem('flag' , '1');
                    if (this.role_id === '2')
                        this.$router .push('/dep_head');
                    else if (this.role_id === '3')
                        this.$router.push('/dean_academic');
                }
                else {
                    sessionStorage.setItem('flag' , '0');
                    this.$router.push('/teacher');
                }
            } ,
            profile() {
                this.drawer = true;
            } ,
            identify() {
                request({
                    url: 'PersonCenter/makeSure' ,
                    method: 'post' ,
                    params: {
                        t_id: sessionStorage.getItem('t_id') ,
                        college: sessionStorage.getItem('college') ,
                        department: sessionStorage.getItem('department')
                    }
                }).then(res => {
                    if (res.data.msg === 'success') {
                        document.getElementById('verify').style.color = '#409EFF';
                        this.$message.success('操作成功')
                    }

                })
            } ,
            quit() {
                sessionStorage.clear();
                this.$router.push('/login');
                this.$message.success('您已退出登录');
            } ,
            edit() {
                this.show = false;
            } ,
            save() {
                this.$confirm('确认修改以上信息？')
                    .then(_ => {
                        request({
                            url: 'PersonCenter/info_update' ,
                            method: 'put' ,
                            params: {
                                t_id: this.t_id ,
                                tel: this.t_tel ,
                                email: this.t_email,
                                address: this.address
                            }
                        }).then(res => {
                            if (res.data.msg === 'success') {
                                this.$message.success('修改个人信息成功');
                                this.show = true;
                            }
                        });
                    })
                    .catch(_ =>{
                    });
            } ,
            handleClose(done) {
                if (this.show === false)
                    this.show = true;
                done();
            } ,
            pwd_alert() {
                this.dialogFormVisible = true
            } ,
            pwd_save() {
                if (this.formInline.pwd === '' || this.formInline.pwd_verify === '' || this.formInline.pwd !== this.formInline.pwd_verify)
                    this.$message.warning('密码与确认密码不一致，请重新输入');
                else {
                    request({
                        url: 'PersonCenter/updatepwd' ,
                        method: 'put' ,
                        params: {
                            t_id: this.t_id ,
                            password: this.formInline.pwd
                        }
                    }).then(res => {
                        if (res.data.msg === 'success') {
                            this.$message.success('密码修改成功');
                            this.dialogFormVisible = false
                        }
                    });
                }
            } ,
            before_close() {
                this.formInline.pwd = '';
                this.formInline.pwd_verify =  '';
                this.dialogFormVisible = false;
            } ,
        }
    }
</script>

<style scoped>
    .el-avatar {
        position: absolute;
        width: 40px;
        height: 40px;
        display: inline-block;
        margin-top: 10px;
        right: 100px;
    }

    .span {
        text-align: center;
    }

    p {
        height: 30px;
        line-height: 30px;
        font-family: Arial;
    }

    .hover:hover {
        background-color: rgba(192, 192, 192, 0.6);
        cursor: pointer;
    }

    .el-divider {
        margin: 5px 0 ;
    }

    .drawer {
        text-align: center;
    }

    .box-card {
        height: 600px;
    }

    .table {
        width: 100%;
        height: 460px;
    }

    .td {
        font-size: 18px;
        font-family: Helvetica Neue;
    }

    td {
        width: 50%;
        height: 20%;
        line-height: 20%;
    }

    .el-input {
        width: 70%;
    }

    .el-input__inner {
        text-align: center;
    }

    .drawer_btn {
        width: 150px;
        position: absolute;
        right: 40px;
        margin-top: 20px;
    }

    .pwd_btn {
        width: 150px;
        position: absolute;
        right: 200px;
        margin-top: 20px;
    }
</style>