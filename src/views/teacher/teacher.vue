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

                    <el-tooltip effect="dark" placement="bottom-start"
                                content="所有材料提交完成后点击，系主任将会获得您的提交状态" >
                        <el-button @click="identify" style="margin-left: 160px">确认已提交</el-button>
                    </el-tooltip>
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
    import {request} from "../../network/request";
    import {queryData} from "../../pubRequest/queryData";

    export default {
        name: "teacher",
        components: {Profile_pho, Teaching_work, Navigation} ,
        data() {
            return {
                role_id: sessionStorage.getItem('role') ,  //教师的用户角色：1：普通教师 2：系主任 3：院长/教务办 4：管理员(后端获取)
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
            identify() {
                this.$confirm('确认提交后不可修改，系主任将会获得您的提交状态，请在所有材料上交完成后确认' ,
                    '提示' , {type : 'warning'}).then(() => {
                    const data = {t_id: sessionStorage.getItem('t_id')};
                    queryData('PersonCenter/makeSure_show' , data).then(res => {
                        if (res.data.msg === 'success') {
                            request({
                                url: 'PersonCenter/makeSure' ,
                                method: 'post' ,
                                params: {
                                    t_id: sessionStorage.getItem('t_id') ,
                                    college: sessionStorage.getItem('college') ,
                                    department: sessionStorage.getItem('department')
                                }
                            }).then(res => {
                                if (res.data.msg === 'success') {
                                    this.$message.success('操作成功')
                                }
                            })
                        }
                        else {
                            this.$message.warning('您已确认提交，无需重复确认')
                        }
                    })
                }).catch(() =>{})
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