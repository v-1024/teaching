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
            <el-table-column label="院汇总表" align="center">
                <el-table-column prop="name" label="名称" align="center"></el-table-column>

                <el-table-column label="详情" align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="primary"
                                @click="check(scope.$index, scope.row)">查看</el-button>  <!--查看做成dialog形式-->
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>

        <el-drawer
                :visible.sync="drawer"
                direction="rtl"
                :show-close="false"
                size="70%">
            <tab_collection :index="cindex" :tableData="contentData" :term="formInline.def_term"></tab_collection>
        </el-drawer>
    </div>
</template>

<script>
    import {request} from "../../../network/request";
    import {queryTerm} from "../../../pubRequest/queryTerm";
    import {queryTermLast} from "../../../pubRequest/queryTerm";
    import {queryData} from "../../../pubRequest/queryData";
    import Tab_collection from "../../../components/tab_collection";

    export default {
        name: "collection" ,
        components: {Tab_collection},
        data() {
            return {
                drawer: false ,
                cindex: '' ,
                formInline: {
                    def_term: '' ,
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
                ] ,
                contentData: []
            }
        } ,
        created() {
            queryTerm().then(res => {
                console.log(res);
                for (let i = 0 ; i < res.data.length ; i ++)
                    this.formInline.term.push(res.data[i].term);
            });
            queryTermLast().then(res =>{
                console.log(res.data);
                this.formInline.def_term = res.data[0].term;
            })
        } ,
        methods: {

            //院级的汇总表的接口是什么？？？
            check(index , row) {
                this.drawer = true;
                this.cindex = index;
                switch (index) {
                    case 0:
                        this.requestContent('');
                        break;
                    case 1:
                        this.requestContent('HandOfDept/listenlesson');
                        break;
                    case 2:
                        this.requestContent('HandOfDept/teachcheck');
                        break;
                    case 3:
                        this.requestContent('');
                        break;
                    case 4:
                        this.requestContent('HandOfDept/teachplancheck');
                        break;
                    case 5:
                        this.requestContent('HandOfDept/attendance');
                        break;
                    case 6:
                        this.requestContent('HandOfDept/experimentcheck');
                        break;
                    case 7:
                        this.requestContent('HandOfDept/homeworkcheck');
                        break;
                    case 8:
                        this.requestContent('HandOfDept/communication');
                        break;
                    case 9:
                        this.requestContent('HandOfDept/teachaward');
                        break;
                    case 10:
                        this.requestContent('HandOfDept/teachproject');
                        break;
                    case 11:
                        this.requestContent('HandOfDept/departmentsummary');
                        break;
                }
            } ,
            requestContent(url) {
                request({
                    url: url ,
                    method: 'post' ,
                    params: {                  //登录后获取
                        term: this.formInline.def_term ,
                        college: sessionStorage.getItem('college') ,
                        department: sessionStorage.getItem('department')
                    }
                }).then(res => {
                    this.contentData = res.data;
                })
            } ,
        }
    }
</script>

<style scoped>
    .box {
        text-align: center;
        margin-top: 10px;
    }
</style>