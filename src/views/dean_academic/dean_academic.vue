<template>
    <div>
        <navigation></navigation>

        <el-container>
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal" active-text-color="#6876ff"
                         :default-active="active_index">
                    <el-menu-item index="/dean_academic/schedule" @click="schedule">进度检查</el-menu-item>
                    <el-menu-item index="/dean_academic/collection" @click="collection">院汇总</el-menu-item>

                    <profile_pho :role_id="role_id" :role_name="role_name" :t_name="t_name"></profile_pho>
                </el-menu>
            </el-header>
            <router-view></router-view>
        </el-container>
    </div>
</template>

<script>
    import Navigation from "../../components/navigation";
    import Profile_pho from "../../components/profile_pho";
    export default {
        name: "dean_academic",
        components: {Profile_pho, Navigation} ,
        data() {
            return {
                role_id: sessionStorage.getItem('role') ,  //教师的用户角色：1：普通教师 2：系主任 3：院长/教务办 4：管理员(后端获取)
                role_name: '院长/教务办' ,   //该页面是院长/教务办的专属页面（但需知道具体的角色）
                t_name: sessionStorage.getItem('t_name')
            }
        } ,
        methods: {
            schedule() {
                this.$router.push('/dean_academic/schedule');
            } ,
            collection() {
                this.$router.push('/dean_academic/collection');
            }
        } ,
        computed: {
            active_index() {
                const head = this.$route.path.indexOf("/") , tail = this.$route.path.lastIndexOf("/");
                if (tail-head === 14)
                    return this.$route.path.substring(head);
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

    .el-submenu {
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