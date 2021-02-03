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
            <el-form>
                <el-form-item label="新密码" label-width="120px">
                    <el-input v-model="formInline.pwd" style="width: 400px" clearable></el-input>
                </el-form-item>
                <el-form-item label="确认密码" label-width="120px">
                    <el-input v-model="formInline.pwd_verify" style="width: 400px" clearable></el-input>
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
                    else
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
            quit() {
                sessionStorage.clear();
                this.$router.push('/login');
                this.$message.success('您已退出登录');
            } ,
            edit() {
                this.show = false;
            } ,
            save() {
                this.show = true;
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
                this.dialogFormVisible = false
            }
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