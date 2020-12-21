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
                <el-select v-model="formInline.def_dep" placeholder="系部" clearable>
                    <el-option :label="item" :value="item" v-for="item in formInline.dep_name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table
                class="table"
                :data="tableData"
                stripe
                height="500px"
                style="width: 100%">
            <el-table-column prop="name" label="名称" align="center"></el-table-column>

            <el-table-column label="详情" align="center">
                <template slot-scope="scope">
                    <el-button
                            size="small"
                            type="primary"
                            @click="check(scope.$index, scope.row)">查看</el-button>  <!--查看做成dialog形式-->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {request} from "../../../network/request";
    import {queryTerm} from "../../../pubRequest/queryTerm";
    import {queryTermLast} from "../../../pubRequest/queryTerm";
    import {queryData} from "../../../pubRequest/queryData";
    export default {
        name: "schedule",
        data() {
            return {
                formInline: {
                    def_term: '' ,
                    def_dep: '' ,      //需查询其他系部时将该值传给后端
                    dep_name: [] ,     //后端获取
                    term: []        //学年从后端获取

                } ,
                tableData: [
                    {name: '公开课评课记录' , state: false} ,
                    {name: '听课统计表' , state: false} ,
                    {name: '教师教学检查表' , state: false} ,
                    {name: '期中教学检查基本数据统计表' , state: false} ,
                    {name: '各系部教案检查登记表' , state: false} ,
                    {name: '各系部考察统计表' , state: false} ,
                    {name: '各系部实验报告检查登记表' , state: false} ,
                    {name: '各系部作业检查登记表' , state: false} ,
                    {name: '教师对外交流情况一览表' , state: false} ,
                    {name: '教师奖励一览表' , state: false} ,
                    {name: '教研项目一览表' , state: false} ,
                    {name: '计划与总结' , state: false}
                ]
            }
        } ,
        created() {
            queryTerm().then(res => {
                for (let i = 0 ; i < res.data.length ; i ++)
                    this.formInline.term.push(res.data[i].term);
            });
            queryTermLast().then(res =>{
                this.formInline.def_term = res.data[0].term;
            });
            this.queryDep();
        } ,
        methods: {
            queryDep() {
                request({
                    url: 'HandOfCollege/getdept' ,
                    method: 'post' ,
                    params: {
                        college_name: '2' //院信息在登录时保存起来
                    }
                }).then(res => {
                    this.formInline.dep_name = res.data;
                    this.formInline.def_dep = res.data[0];
                })
            }
        }
    }
</script>

<style scoped>
    .box {
        text-align: center;
        margin-top: 10px;
    }
</style>