<template>
    <div>
        <el-container>
            <sidebar>
                <el-menu-item index="1" slot="title" @click="teaching_check">
                    <i class="el-icon-s-custom"></i>
                    <span>教学检查</span>
                </el-menu-item>
                <el-menu-item index="2" slot="title" @click="plans_check">
                    <i class="el-icon-notebook-2"></i>
                    <span>教案检查</span>
                </el-menu-item>
            </sidebar>
            <router-view></router-view>
        </el-container>
    </div>

</template>

<script>
    import Sidebar from "../../../components/sidebar";
    export default {
        name: "teaching_work",
        components: {Sidebar} ,
        methods: {
            teaching_check() {
                this.$router.push('/teacher/teaching_work/teaching_inspection')
            } ,
            plans_check() {
                this.$router.push('/teacher/teaching_work/plans_inspection')
            }
        }
    }
</script>

<style scoped>

</style>