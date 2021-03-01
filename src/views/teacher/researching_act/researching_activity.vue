<template>
    <div>
        <el-container>
            <sidebar>
                    <el-menu-item index="/teacher/researching_activity/achievement"
                                  slot="title" @click="achievement">
                        <i class="el-icon-s-check"></i>
                        <span>教研成果</span>
                    </el-menu-item>
                    <el-menu-item index="/teacher/researching_activity/thesis"
                                  slot="title" @click="thesis">
                        <i class="el-icon-tickets"></i>
                        <span>教研论文</span>
                    </el-menu-item>
                    <el-menu-item index="/teacher/researching_activity/projects"
                                  slot="title" @click="projects">
                        <i class="el-icon-collection"></i>
                        <span>教研项目</span>
                    </el-menu-item>
                    <el-menu-item index="/teacher/researching_activity/teacher_award"
                                  slot="title" @click="award">
                        <i class="el-icon-trophy"></i>
                        <span>教师奖励</span>
                    </el-menu-item>
            </sidebar>
            <router-view></router-view>
        </el-container>
    </div>
</template>

<script>
    import Sidebar from "../../../components/sidebar";
    export default {
        name: "researching_activity",
        components: {Sidebar} ,
        methods: {
            achievement() {
                this.$router.push('/teacher/researching_activity/achievement')
            } ,
            thesis() {
                this.$router.push('/teacher/researching_activity/thesis')
            } ,
            projects() {
                this.$router.push('/teacher/researching_activity/projects')
            } ,
            award() {
                this.$router.push('/teacher/researching_activity/teacher_award')
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