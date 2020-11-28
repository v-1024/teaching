<template>
    <div class="box">
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column type="expand">
                <el-table stripe border :data="tableData" v-for="item in tableData">
                    <el-table-column label="系部" prop="item.dep"></el-table-column>
                    <el-table-column label="状态" prop="dep_state">
                        <!--作用域插槽-->
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.dep_state"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"></el-table-column>
                </el-table>
            </el-table-column>
            <el-table-column label="学院" prop="col_name"></el-table-column>
            <el-table-column label="状态" prop="col_state">
                <!--作用域插槽-->
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.col_state"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "system_admin" ,
        data() {
            return {
                tableData: [
                    {
                        col_name: '计算机科学与工程学院' ,
                        col_state: true ,
                        dep:
                            [
                                {
                                    dep_name: '网络工程系' ,
                                    dep_state: true
                                } ,
                                {

                                }
                            ]
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .box {
        margin-top: 10px;
        text-align: center;
    }

    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>