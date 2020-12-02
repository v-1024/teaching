<template>
    <div>
        <navigation></navigation>

        <el-container>
            <el-header>
                <el-menu class="el-menu-demo" mode="horizontal" active-text-color="#6876ff">
                    <el-menu-item index="1" @click="">进度检查</el-menu-item>
                    <el-menu-item index="2" @click="">院汇总</el-menu-item>

                    <el-popover class="span"
                                placement="bottom"
                                trigger="hover">
                        <div class="span">
                            <p >{{role}}：{{t_name}}</p> <el-divider></el-divider>
                            <p class="hover">个人中心</p>
                            <p class="hover" v-show="role_id != '0'" @click="change_role">切换角色</p>
                            <p class="hover">退出登录</p>
                        </div>
                        <el-avatar icon="el-icon-user-solid" slot="reference"></el-avatar>
                    </el-popover>
                </el-menu>
            </el-header>

        </el-container>
    </div>
</template>

<script>
    import Navigation from "../../components/navigation";
    export default {
        name: "dean_academic",
        components: {Navigation} ,
        data() {
            return {
                role_id:'' ,  //教师的用户角色：0：普通教师 1：系主任 2：院长 3：教务办(后端获取)
                role: '' ,
                t_name: ''
            }
        } ,
        created() {   //请求后端的数据
            this.role_id = '2'
            this.role = '院长'
            this.t_name = '张三'
        } ,
        methods: {
            change_role() {
                this.$router.push('/teacher');
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