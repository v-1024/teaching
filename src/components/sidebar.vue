<template>
    <div>
        <el-aside width="180px">
            <el-col>
                <el-menu class="el-menu-vertical-demo" active-text-color="#6876ff"
                         :default-active="$route.path">
                    <slot name="title"></slot>
                </el-menu>
            </el-col>
        </el-aside>
    </div>
</template>

<script>
    export default {
        name: "sidebar" ,
        data() {
            return {
                active_index: ''
            }
        } ,
        created() {

        } ,
        methods: {

        }
    }
</script>

<style scoped>
    .el-menu-vertical-demo {
        background-color: rgb(245, 247, 250);
        color:black;
        height: 600px;
    }

    .el-aside {
        background-color: white;
        color: #6876ff;
        text-align: center;
        line-height: 300px;
    }

</style>