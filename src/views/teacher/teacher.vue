<template>
    <div>
        <navigation></navigation>

        <el-container>
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal" active-text-color="#6876ff" >
                    <el-menu-item index="1" @click="teaching">教学运行</el-menu-item>
                    <el-menu-item index="2" @click="researching">
                        <template slot="title">教研活动</template>
                    </el-menu-item>
                    <el-menu-item index="3" @click="project">学生项目</el-menu-item>
                    <el-menu-item index="4" @click="exchange">对外交流</el-menu-item>
                    <el-menu-item index="5" @click="">查看系部汇总表</el-menu-item>

                    <el-popover class="span"
                            placement="bottom"
                            trigger="hover">
                        <div class="span">
                            <p >教师：张三</p> <el-divider></el-divider>
                            <p class="hover">个人中心</p>
                            <p class="hover">切换角色</p>
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
    import Teaching_work from "./t_work/teaching_work";
    export default {
        name: "teacher",
        components: {Teaching_work, Navigation} ,
        methods: {
            researching() {
                this.$router.push("/teacher/researching_activity");
            } ,
            teaching() {
                this.$router.push("/teacher/teaching_work");
            } ,
            project() {
                this.$router.push("/teacher/stu_projects");
            } ,
            exchange() {
                this.$router.push("/teacher/external_exchange");
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
        width: 40px;
        height: 40px;
        display: inline-block;
        margin-top: 10px;
        margin-left: 400px;
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