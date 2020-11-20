<template>
    <div>
        <el-container>
            <sidebar>
                <el-menu-item index="1" slot="title"  @click="exchange">
                    <i class="el-icon-connection"></i>
                    <span>交流考察</span>
                </el-menu-item>
            </sidebar>
            <router-view></router-view>
        </el-container>
    </div>
</template>

<script>
    import Sidebar from "../../../components/sidebar";
    export default {
        name: "external_exchange",
        components: {Sidebar} ,
        methods: {
            exchange() {
                this.$router.push('/teacher/external_exchange/exchange')
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
</style>