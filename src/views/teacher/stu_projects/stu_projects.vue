<template>
    <div>
        <el-container>
            <sidebar>
                <el-menu-item index="/teacher/stu_projects/stu_competition"
                              slot="title" @click="competition">
                    <i class="el-icon-medal-1"></i>
                    <span>学生竞赛</span>
                </el-menu-item>
            </sidebar>
            <router-view></router-view>
        </el-container>
    </div>
</template>

<script>
    import Sidebar from "../../../components/sidebar";
    export default {
        name: "stu_projects",
        components: {Sidebar} ,
        methods: {
            competition() {
                this.$router.push('/teacher/stu_projects/stu_competition')
            }
        }
    }
</script>

<style scoped>
    .el-main {
        background-color: white;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    .el-menu-item {
        font-size: 17px;
    }
</style>