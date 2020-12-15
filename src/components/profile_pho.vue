<template>
    <div>
        <el-popover class="span"
                    placement="bottom"
                    trigger="hover">
            <div class="span">
                <p>{{head}}</p> <el-divider></el-divider>
                <p class="hover" @click="profile">个人中心</p>
                <p class="hover" v-show="role_id != '0'" @click="change_role">切换角色</p>
                <p class="hover">退出登录</p>
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
                        <span style="font-size: 18px">个人中心</span>
                    </div>
                    <div v-for="o in 4" :key="o">
                        {{'列表内容 ' + o }}
                    </div>
                </el-card>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "profile_pho" ,
        data() {
            return {
                drawer: false ,
                head: '' ,
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
                if (sessionStorage.getItem('flag') == '0') {
                    sessionStorage.setItem('flag' , '1');
                    if (this.role_id == '1')
                        this.$router.push('/dep_head');
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
        height: 500px;
    }
</style>