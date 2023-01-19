<template>
    <!--指标管理-->
    <div class="IndicatorsManage">
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="主键"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="datasetId"
                    label="数据集id"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="指标名称" width="100px">
            </el-table-column>
            <el-table-column
                    prop="value"
                    label="计算公式">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建日期">
                <template slot-scope="scope">
                    <span>{{ formatDate(scope.row.createTime) }}</span>
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
    import index from '../../api/index'
    import utils from "../../utils";
    export default {
        name: "IndicatorsManage",
        mixins: [utils],
        data() {
            return {
                tableData: []
            }
        },
        created() {
            index.getQuotas().then(res => {
                this.tableData = []
                if(res.code === 20000) {
                    this.tableData = res.data.quota
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
    .IndicatorsManage {
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