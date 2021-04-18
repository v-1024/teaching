<template>
    <div class="box">
        <el-table
                    class="table"
                    :data="tableData"
                    stripe
                    height="450px"
                    style="width: 100%">
                <el-table-column prop="name" label="名称" align="center"></el-table-column>
                <el-table-column label="确认情况" align="center">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.state" @change="switch_change(scope.$index , $event)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="上传附件" align="center">
            <template slot-scope="scope" v-if="showUpload(scope.$index)">
                <el-dropdown >
                    <span class="el-dropdown-link" @click="up_btn(scope.$index)">
                        上传附件 <i class="el-icon-upload"></i>
                    </span>
                </el-dropdown>
            </template>
        </el-table-column>
                <el-table-column label="详情" align="center">
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="primary"
                                @click="check(scope.$index, scope.row)">查看</el-button>  <!--查看做成dialog形式-->

                        <!--<el-button-->
                                <!--size="small"-->
                                <!--@click="">下载</el-button>-->
                    </template>
                </el-table-column>
            </el-table>

        <el-dialog
                title="附件上传"
                :visible.sync="dialogVisible1"
                width="40%">

            <div class="upload"><el-upload
                    ref="upload1"
                    action=""
                    :http-request="upFile1"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    drag
                    style="width: 30%">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload></div>
            <span slot="footer" class="dialog-footer">
            <el-button style="width: 200px" type="primary" @click="dialogVisible1 = false">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
                title="附件上传"
                :visible.sync="dialogVisible2"
                width="40%">

            <div class="upload"><el-upload
                    ref="upload2"
                    action=""
                    :http-request="upFile2"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="1"
                    :on-exceed="handleExceed"
                    drag
                    style="width: 30%">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload></div>
            <span slot="footer" class="dialog-footer">
            <el-button style="width: 200px" type="primary" @click="dialogVisible2 = false">确 定</el-button>
        </span>
        </el-dialog>
        <!--<div class="upload">
            <el-upload
                    ref="upload1"
                    action=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="3"
                    :http-request="upFile1"
                    :on-exceed="handleExceed"
                    style="width: 25%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传计划与总结</div>
            </el-upload>

            <el-upload
                    ref="upload2"
                    action=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :auto-upload="false"
                    multiple
                    :limit="3"
                    :http-request="upFile2"
                    :on-exceed="handleExceed"
                    style="width: 10%">
                <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">上传期中教学检查基本数据统计表</div>
            </el-upload>

            <el-button size="medium" type="primary" class="btn" @click="submit">提交</el-button>
        </div>-->
        <div style="display: flex; flex: 1 ; margin: 20px" id="btn10">
            <!--<el-input
                    style="width: 800px"
                    type="textarea"
                    :rows="3"
                    v-model="fileItem"
                    placeholder="已选择的文件"
                    disabled></el-input>-->
            <el-button size="medium" type="primary" class="btn" @click="submit">提交</el-button>
        </div>
        <el-drawer
                :visible.sync="drawer"
                direction="rtl"
                :show-close="false"
                size="70%">
            <tab_collection :index="cindex" :tableData="contentData" :term="def_term"
                            :department="dep"></tab_collection>
        </el-drawer>
    </div>
</template>

<script>
    import {request} from "../../../network/request";
    import {queryTermLast} from "../../../pubRequest/queryTerm";
    import {queryData} from "../../../pubRequest/queryData";
    import Tab_collection from "../../../components/tab_collection";

    export default {
        inject: ['reload'] ,
        name: "collection" ,
        components: {Tab_collection},
        data() {
            return {
                drawer: false ,
                cindex: '' ,
                def_term: '' ,
                dep: sessionStorage.getItem('department') ,
                tableData: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}] ,
                dialogVisible1: false ,
                dialogVisible2: false ,
                contentData: [] ,
                fileList1: [] ,
                fileList2: [] ,
                fileForm: new FormData()
            }
        } ,
        created() {
            queryTermLast().then(res => {
                this.def_term = res.data[0].term;
            });
            const data = {
                t_id: sessionStorage.getItem('t_id') ,
            };
            queryData('HandOfDept/getdeptsummarystate' , data).then(res => {
                this.tableData =
                    [{name: '公开课评课记录' , state: res.data[0].openclassrecordstate} ,
                    {name: '听课统计表' , state: res.data[0].listenclassstate} ,
                    {name: '教师教学检查表' , state: res.data[0].teachcheckstate} ,
                    {name: '期中教学检查基本数据统计表' , state: res.data[0].datastate} ,
                    {name: '系部教案检查登记表' , state: res.data[0].teachplanstate} ,
                    {name: '系部考勤统计表' , state: res.data[0].investigatestate} ,
                    {name: '系部实验报告检查登记表' , state: res.data[0].experimentstate} ,
                    {name: '系部作业检查登记表' , state: res.data[0].homerworkcheckstate} ,
                    {name: '教师对外交流情况一览表' , state: res.data[0].commiunicationstate} ,
                    {name: '教师奖励一览表' , state: res.data[0].awardstate} ,
                    {name: '教研项目一览表' , state: res.data[0].projectstate} ,
                    {name: '计划与总结' , state: false}];
            })
        } ,
        methods: {
            check(index , row) {
                this.drawer = true;
                this.cindex = index;
                switch (index) {
                    case 0:
                        this.requestContent('HandOfDept/openclassrecord');
                        break;
                    case 1:
                        this.requestContent('HandOfDept/listenlesson');
                        break;
                    case 2:
                        this.requestContent('HandOfDept/teachcheck');
                        break;
                    case 3:
                        this.requestContent('HandOfDept/summaryandmidtermdata');
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
                        this.requestContent('HandOfDept/summaryandmidtermdata');
                        break;
                }
            } ,
            showUpload(index) {
                if (index === 11 || index === 3)
                    return true;
                return false;
            } ,
            up_btn(index) {
                switch (index) {
                    case 3:
                        this.dialogVisible1 = true;
                        break;
                    case 11:
                        this.dialogVisible2 = true;
                        break;
                }
            } ,
            requestContent(url) {
                request({
                    url: url ,
                    method: 'post' ,
                    params: {                  //登录后获取
                        term: this.def_term ,
                        college: sessionStorage.getItem('college') ,
                        department: sessionStorage.getItem('department')
                    }
                }).then(res => {
                    this.contentData = res.data;
                })
            } ,
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            } ,
            switch_change(index , event) {
                let state = '0';
                if (event === true)
                    state = '1';
                request({
                    url: 'HandOfDept/deptsummarystate' ,
                    method: 'post' ,
                    params: {
                        info: index+1 ,
                        t_id: sessionStorage.getItem('t_id') ,
                        term: this.def_term ,
                        num: state
                    }
                }).then(res => {
                    if (res.data.msg === 'success')
                        this.$message.success('操作成功')
                })
            } ,
            upFile1(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('summary' , file);
                this.fileList1.push({
                    name: file.name ,
                });
            } ,
            upFile2(param) {
                const file = param.file;
                console.log(file);
                this.fileForm.append('datastatistics' , file);
                this.fileList2.push({
                    name: file.name ,
                });
            } ,
            submit() {
                this.$confirm('提交后不能修改，信息将上交给学院，请确保所有信息正确以及文件上传无误', '提示', {
                    type: 'warning'
                }).then(() => {
                    if (this.fileForm.teachplan !== '')
                        this.$refs.upload1.submit();
                    if (this.fileForm.homework !== '')
                        this.$refs.upload2.submit();
                    request({
                        url: 'HandOfDept/deptsummary',
                        method: 'post',
                        data: this.fileForm ,
                        params: {
                            t_id: sessionStorage.getItem('t_id') ,
                            term: this.def_term
                        } ,
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {
                        if (res.data.msg === 'success') {
                            this.$message.success('文件上传成功');
                            this.reload();
                            this.fileForm = new FormData();
                            this.fileList1.splice(0,1);
                            this.fileList2.splice(0,1);
                        }
                    });
                }).catch(() => {
                });
            }
        }
    }
</script>

<style>
    .box {
        margin: 10px auto;
        text-align: center;
    }

    .el-table {
        margin-bottom: 10px;
    }

    .upload {
        text-align: center;
        width: 100%;
        height: 200px;
        display: flex;
        margin: 10px;
    }
    .upload .el-upload{
        margin-left: 110px;
    }
    #btn10 .btn {
        width: 250px;
        height: 40px;
        margin-left: 1150px;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
</style>