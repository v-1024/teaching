<template>
    <div>
        <navigation></navigation>

        <el-container>
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal" active-text-color="#6876ff"
                         :default-active="$route.path">
                    <el-menu-item index="/admin/user_admin" @click="user">用户管理</el-menu-item>
                    <el-menu-item index="/admin/system_admin" @click="system">设置系统信息</el-menu-item>
                </el-menu>
            </el-header>
            <router-view></router-view>
        </el-container>
    </div>

</template>

<script>
    import Navigation from "../../components/navigation";
    export default {
        name: "admin",
        components: {Navigation} ,
        data() {
            return {
                active_index: ''
            }
        } ,
        created() {   //请求后端的数据

        } ,
        methods: {
            user() {
                this.$router.push('/admin/user_admin')
            } ,
            system() {
                this.$router.push('/admin/system_admin')
            } ,
            quit() {
                this.$router.push('/login');
                this.$message.success('您已退出登录');
            }
        }
    }
</script>

<style scoped>
    .el-menu--horizontal>.el-menu-item{
        height: 50px;
        line-height: 50px;
    }
    .el-header {
        background-color: white;
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .el-menu-demo {
        background-color: white;
        color:black;
        height: 50px;
        line-height: 50px;
    }
    .el-menu-item {
        width: 150px;
        font-size: 17px;
    }
    .el-menu-demo {
        margin-left: 200px;
    }

    .el-button {
        margin: auto;
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
</style>