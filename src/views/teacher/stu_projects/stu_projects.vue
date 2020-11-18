<template>
    <div>
        <el-container>
            <sidebar>
                <el-menu-item index="1" slot="title">
                    <i class="el-icon-medal-1"></i>
                    <span>学生竞赛</span>
                </el-menu-item>
            </sidebar>
            <el-main>Main</el-main>
        </el-container>
    </div>
</template>

<script>
    import Sidebar from "../../../components/sidebar";
    export default {
        name: "stu_projects",
        components: {Sidebar}
    }
</script>

<style scoped>
    .el-main {
        background-color: white;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
</style>