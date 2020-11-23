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

<style >
    .el-header {
        background-color: rgb(245, 247, 250);
        text-align: center;
        height: 60px;
        line-height: 60px;
    }
    .el-menu-demo {
        background-color: rgb(245, 247, 250);
        color:black;
    }
    .el-menu-item {
        width: 220px;
        font-size: 17px;
    }
    .el-menu-demo {
        margin-left: 150px;
    }
</style>