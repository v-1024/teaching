<template>
    <div>
        <el-aside width="220px">
            <el-col>
                <el-menu class="el-menu-vertical-demo" active-text-color="#6876ff"
                         :default-active="active_index" @select="handleSelect">
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
            console.log("Csession"+sessionStorage.getItem('child_index'));
            this.active_index = sessionStorage.getItem('child_index')
        } ,
        methods: {
            handleSelect(key) {
                console.log( "child:" + key);
                this.$store.commit('child_index',key);
                sessionStorage.setItem('child_index', key);
                console.log("Csession"+sessionStorage.getItem('child_index'));
            }
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