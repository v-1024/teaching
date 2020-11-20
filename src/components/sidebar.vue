<template>
    <div>
        <el-aside width="250px">
            <el-col>
                <el-menu class="el-menu-vertical-demo" active-text-color="#6876ff" >
                    <slot name="title"></slot>
                </el-menu>
            </el-col>
        </el-aside>
    </div>
</template>

<script>
    export default {
        name: "sidebar"
    }
</script>

<style scoped>
    .el-menu-vertical-demo {
        background-color: #f3f1f1;
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