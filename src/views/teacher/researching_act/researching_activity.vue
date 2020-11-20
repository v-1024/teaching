<template>
    <div>
        <el-container>
            <sidebar>
                    <el-menu-item index="1" slot="title">
                        <i class="el-icon-s-check"></i>
                        <span>教研成果</span>
                    </el-menu-item>
                    <el-menu-item index="2" slot="title">
                        <i class="el-icon-tickets"></i>
                        <span>教研论文</span>
                    </el-menu-item>
                    <el-menu-item index="3" slot="title">
                        <i class="el-icon-collection"></i>
                        <span>教研项目</span>
                    </el-menu-item>
                    <el-menu-item index="4" slot="title">
                        <i class="el-icon-trophy"></i>
                        <span>教师奖励</span>
                    </el-menu-item>
            </sidebar>
        </el-container>
    </div>
</template>

<script>
    import Sidebar from "../../../components/sidebar";
    export default {
        name: "researching_activity",
        components: {Sidebar} ,
        methods: {

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
</style>