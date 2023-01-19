<template>
    <div v-if="tableData.length !== 0" style="width: 100%">
        <div class="title">用户标签迭代</div>
        <el-table
                :data="tableData"
                style="width: 100%;overflow:hidden;">
            <el-table-column
                    prop="label"
                    label="标签"
                    width="150px">
            </el-table-column>
            <el-table-column
                    prop="weight"
                    label="权重" width="100px">
            </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="日期" width="193px">
                <template slot-scope="scope">
                    <span>{{formatDate(scope.row.createTime)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="isDelete"
                    label="是否删除" width="200px">
                <template slot-scope="scope">
                   <span>{{scope.row.isDelete === 1 ? '删除' : '未删除'}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div v-else>
        <div class="title">用户标签迭代</div>
        <span style="color: red;font-size: 25px">
            还没有标签
        </span>
    </div>
</template>

<script>
    import index from "../../api";
    import utils from "../../utils";
    export default {
        name: "UserTagWeight",
        props: ['userTagData'],
        mixins: [utils],
        data() {
            return {
                tableData: []
            }
        },
        watch: {
            userTagData: {
                handler(newValue,oldValue) {
                    this.tableData = newValue
                },
                deep: true
            }
        },
        methods: {
            getUserTagsByUserId() {
                index.getUserTagsByUserId(this.$route.query.userId).then(res => {
                    this.tableData = []
                    if(res.code === 20000) {
                        this.tableData = res.data.data
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
            this.getUserTagsByUserId()
        }
    }
</script>

<style scoped>
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
    .title {
        padding: 0;
        padding-bottom: 20px;
        font-size: 14px;
        font-weight: 500;
        color: white;
        margin-bottom: 0;
        font-weight: 700;
        text-align: left;
    }
</style>