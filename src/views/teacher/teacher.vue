<template>
    <div>
        <navigation></navigation>

        <el-container>
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal" active-text-color="#6876ff"
                         :default-active="active_index">
                    <el-menu-item index="/teacher/teaching_work" @click="teaching">教学运行</el-menu-item>
                    <el-menu-item index="/teacher/researching_activity" @click="researching">教研活动</el-menu-item>
                    <el-menu-item index="/teacher/stu_projects" @click="project">学生项目</el-menu-item>
                    <el-menu-item index="/teacher/external_exchange" @click="exchange">对外交流</el-menu-item>
                    <el-menu-item index="/teacher/dep_diagram" @click="diagram">查看系部汇总表</el-menu-item>

                    <profile_pho :role_id="role_id" :role_name="role_name" :t_name="t_name"></profile_pho>
                </el-menu>
            </el-header>
            <router-view></router-view>
        </el-container>

    </div>

</template>

<script>
    import Navigation from "../../components/navigation";
    import Teaching_work from "./t_work/teaching_work";
    import Profile_pho from "../../components/profile_pho";
    export default {
        name: "teacher",
        components: {Profile_pho, Teaching_work, Navigation} ,
        data() {
            return {
                role_id: sessionStorage.getItem('role') ,  //教师的用户角色：0：普通教师 1：系主任 2：院长 3：教务办(后端获取)
                role_name: '教师' ,   //该页面是教师的专属页面
                t_name: sessionStorage.getItem('t_name')
            }
        } ,
        created() {   //请求后端的数据

        } ,
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
            } ,
            diagram() {
                this.$router.push("/teacher/dep_diagram");
            } ,
        } ,
        computed: {
            active_index() {
                const head = this.$route.path.indexOf("/") , tail = this.$route.path.lastIndexOf("/");
                if (tail - head == 8)
                    return this.$route.path;
                else
                    return this.$route.path.substring(head,tail);
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

    .el-button {
        margin: auto;
    }

</style>