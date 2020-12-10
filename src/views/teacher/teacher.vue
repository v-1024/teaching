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

                    <el-popover class="span"
                            placement="bottom"
                            trigger="hover">
                        <div class="span">
                            <p >教师：{{t_name}}</p> <el-divider></el-divider>
                            <p class="hover">个人中心</p>
                            <p class="hover" v-show="role_id != '0'" @click="change_role">切换角色</p>
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
        data() {
            return {
                role_id:'' ,  //教师的用户角色：0：普通教师 1：系主任 2：院长 3：教务办(后端获取)
                t_name: ''
            }
        } ,
        created() {   //请求后端的数据
            this.role_id = '1';
            this.t_name = '张三'
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
            change_role() {
                if (this.role_id == '1')
                    this.$router.push('/dep_head');
                else
                    this.$router.push('/dean_academic');
            }
        } ,
        computed: {
            active_index() {
                const head = this.$route.path.indexOf("/") , tail = this.$route.path.lastIndexOf("/");
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