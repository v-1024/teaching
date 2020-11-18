<template>
    <div>
        <el-container>
            <sidebar>
                <el-menu-item index="1" slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>教学检查</span>
                </el-menu-item>
                <el-menu-item index="2" slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>教案检查</span>
                </el-menu-item>
            </sidebar>
            <el-main>Main</el-main>
        </el-container>
    </div>

</template>

<script>
    import Sidebar from "../../../components/sidebar";
    export default {
        name: "teaching_work",
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