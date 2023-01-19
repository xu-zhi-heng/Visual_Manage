<template>
    <div class="NewsManage">
        <div style="margin-bottom: 20px;text-align: left">
            <el-button
                    size="mini"
                    type="success" @click="beforeAddNew"
            >添加通知</el-button>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="主键"
                    width="280">
            </el-table-column>
            <el-table-column
                    prop="topic"
                    label="主题"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="内容"
                    width="350px">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="日期" width="130px">
                <template slot-scope="scope">
                    <span>{{ formatDate(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="isPushed"
                    label="是否已经推送" width="120px">
                <template slot-scope="scope">
                    <span>{{ scope.row.isPushed === 1 ? '已推送' : '未推送' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            >编辑</el-button>
                    <el-button
                            size="mini"
                            type="primary" @click="pushNew(scope.row.id)"
                    >推送</el-button>
                    <el-button
                            size="mini"
                            type="danger" @click="deleteNew(scope.row.id)"
                            >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="form" ref="form">
            <el-form ref="form" :model="form">
                <el-form-item label="主题">
                    <el-input v-model="form.topic"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addNew">立即创建</el-button>
                    <el-button @click="close">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import index from "../../api";
    import utils from "../../utils";
    export default {
        name: "NewsManage",
        mixins: [utils],
        data() {
            return {
                tableData: [],
                form: {
                    topic: '',
                    content: ''
                },
            }
        },
        methods: {
            beforeAddNew() {
                this.$refs.form.style.display = 'block'
            },
            close() {
                this.$refs.form.style.display = 'none'
            },
            addNew() {
                index.addNotice(this.form).then(res => {
                    this.tableData = []
                    if(res.code === 20000) {
                        this.getNotices()
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.close()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            deleteNew(id) {
                index.deleteNoticeById(id).then(res => {
                    if(res.code === 20000) {
                        this.getNotices()
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            pushNew(id) {
                index.pushNotice(id).then(res => {
                    if(res.code === 20000) {
                        this.getNotices()
                        this.$message({
                            message: '推送成功',
                            type: 'success'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            getNotices() {
                index.getNotices().then(res => {
                    if(res.code === 20000) {
                        this.tableData = res.data.notice
                        this.$message({
                            message: '查询成功',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: '查询失败',
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        mounted() {
            this.getNotices()
        }
    }
</script>

<style scoped>
    .NewsManage {
        padding: 0 16px;
        position: relative;
    }
    /deep/ .el-table__row {
        background-color: #30343a !important;
    }
    /deep/ .el-table th, .el-table tr {
        background-color: #30343a !important;
    }
    /deep/ .el-table td, .el-table th.is-leaf {
        border-bottom: 1px solid #454545 !important;
    }
    /deep/ .el-table thead tr th {
        border-bottom: 1px solid #454545 !important;
    }
    .form {
        width: 400px;
        height: auto;
        padding: 20px 100px;
        background-color: #2d3035;
        margin: 0 auto;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -20%);
        z-index: 2007;
        display: none;
    }
</style>