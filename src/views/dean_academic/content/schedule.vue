<template>
    <div class="box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="学年">
                <!--v-model:默认选中当前学年-->
                <el-select placeholder="学年" v-model="formInline.def_term" clearable>
                    <el-option :label="item" :value="item" v-for="item in formInline.term">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="系部">
                <!--默认显示第一个系部-->
                <el-select v-model="formInline.dep_name[0]" placeholder="系部" clearable>
                    <el-option :label="item" :value="item" v-for="item in formInline.dep_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "schedule",
        data() {
            return {
                formInline: {
                    def_term: '2020-2021-1' ,
                    dep_name: [     //后端获取
                        '软件工程' ,
                        '网络工程'
                    ] ,
                    term:         //学年从后端获取
                        [
                            '2020-2021-1' ,
                            '2019-2020-2'
                        ]
                } ,
            }
        }
    }
</script>

<style scoped>
    .box {
        text-align: center;
        margin: 10px;
    }
</style>