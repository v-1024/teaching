<template>
    <div>
        <navigation></navigation>

        <el-container>
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal" active-text-color="#6876ff"
                         :default-active="$route.path">
                    <el-menu-item index="/dep_head/schedule" @click="schedule">进度检查</el-menu-item>
                    <el-menu-item index="/dep_head/collection" @click="collection">汇总上传</el-menu-item>
                    <el-menu-item index="/dep_head/reg_audit" @click="audit">注册审核</el-menu-item>
                </el-menu>
            </el-header>
        </el-container>
        <router-view></router-view>
    </div>

</template>

<script>
    import Navigation from "../../components/navigation";
    import Profile_pho from "../../components/profile_pho";
    export default {
        name: "dep_head",
        components: {Profile_pho, Navigation} ,
        data() {
            return {
                role_id: sessionStorage.getItem('role') ,  //教师的用户角色：1：普通教师 2：系主任 3：：院长/教务办 4：管理员(后端获取)
                role_name: '系主任' ,   //该页面是系主任的专属页面
                t_name: sessionStorage.getItem('t_name')
            }
        } ,
        methods: {
            schedule() {
                this.$router.push('/dep_head/schedule');
            } ,
            collection() {
                this.$router.push('/dep_head/collection');
            } ,
            audit() {
                this.$router.push('/dep_head/reg_audit');
            }
        }
    }
</script>

<style scoped>
    .el-menu--horizontal>.el-menu-item{
        height: 50px;
        line-height: 50px;
    }
    .el-header {
        background-color: white;
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .el-menu-demo {
        background-color: white;
        color:black;
        height: 50px;
        line-height: 50px;
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