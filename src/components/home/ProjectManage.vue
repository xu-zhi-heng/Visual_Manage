<template>
    <div class="ProjectManage">
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="主键"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="userId"
                    label="用户id"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="datasetId"
                    label="数据集id"
                    width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.datasetId === "" ? '空' : scope.row.datasetId}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="projectName"
                    label="工程名" width="150px">
            </el-table-column>
            <el-table-column
                    prop="describe"
                    label="描述" width="100px">
                <template slot-scope="scope">
                    <span>{{scope.row.describe === null ? '空' : scope.row.describe}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="上传时间" width="130px">
                <template slot-scope="scope">
                    <span>{{ formatDate(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="cover"
                    label="图片" width="100px">
                <template slot-scope="scope">
                    <el-avatar size="small" :src="scope.row.cover"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            >编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import index from "../../api";
    import utils from "../../utils";
    export default {
        name: "ProjectManage",
        mixins: [utils],
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
            index.getProjects().then(res => {
                this.tableData = []
                if(res.code === 20000) {
                    this.tableData = res.data.project
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
    }
</script>

<style scoped>
    .ProjectManage {
        padding: 0 16px;
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
</style>