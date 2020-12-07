<template>
    <div>
        <navigation></navigation>

        <el-container>
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal" active-text-color="#6876ff"
                         :default-active="active_index" @select="handleSelect">
                    <el-menu-item index="1" @click="user">用户管理</el-menu-item>
                    <el-menu-item index="2" @click="system">设置系统信息</el-menu-item>

                    <el-popover class="span"
                                placement="bottom"
                                trigger="hover">
                        <div class="span">
                            <p>系统管理员</p> <el-divider></el-divider>
                            <p class="hover">退出登录</p>
                        </div>
                        <el-avatar icon="el-icon-user-solid" slot="reference"></el-avatar>
                    </el-popover>
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
            this.active_index = sessionStorage.getItem('parent_index')
        } ,
        methods: {
            handleSelect(key) {
                sessionStorage.setItem('parent_index', key);
                sessionStorage.setItem('child_index', '1');
            } ,
            user() {
                this.$router.push('/admin/user_admin')
            } ,
            system() {
                this.$router.push('/admin/system_admin')
            }
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: rgb(245, 247, 250);
        text-align: center;
        height: 60px;
        line-height: 60px;
    }
    .el-menu-demo {
        background-color: rgb(245, 247, 250);
        color:black;
        height: 60px;
        line-height: 60px;
    }
    .el-menu-item {
        width: 150px;
        font-size: 17px;
    }
    .el-menu-demo {
        margin-left: 200px;
    }

    .el-avatar {
        position: absolute;
        width: 40px;
        height: 40px;
        display: inline-block;
        margin-top: 10px;
        right: 100px;
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