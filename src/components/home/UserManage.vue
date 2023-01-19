<template>
    <div class="userManage">
        <el-table
                :data="tableData"
                style="width: 100%;">
            <el-table-column
                    prop="id"
                    label="用户id"
                    width="300px">
            </el-table-column>
            <el-table-column
                    prop="avatar"
                    label="头像" width="80px">
                <template slot-scope="scope">
                    <el-avatar size="small" :src="scope.row.avatar"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="昵称" width="100px">
            </el-table-column>
            <el-table-column
                    prop="password"
                    label="密码" width="100px">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="电话" width="120px">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱" width="180px">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            v-if="scope.row.isRecommend === 0"
                            @click="setIsRecommend(scope.row.id,1)"
                    >开启推荐</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            @click="setIsRecommend(scope.row.id,0)"
                            v-if="scope.row.isRecommend === 1"
                    >关闭推荐</el-button>
                    <el-button
                            size="mini"
                            type="warning"
                            v-if="scope.row.isRecommend === 1"
                            >推荐内容</el-button>
                    <el-button
                            size="mini"
                            type="success"
                            @click="goPage(scope.row.id)"
                    >分析</el-button>
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
    export default {
        name: "UserManage",
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            goPage(userId) {
                this.$emit('getHeaderName','用户分析')
                this.$router.push({path: '/userAnalysis',query: {userId: userId}})
            },
            setIsRecommend(id,type) {
                index.setUserIsRecommend({id: id,isRecommend: type}).then(res => {
                    if(res.code === 20000) {
                        this.getUsers()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            getUsers() {
                index.getUsers().then(res => {
                    console.log(res)
                    this.tableData = []
                    if(res.code === 20000) {
                        this.tableData = res.data.customer
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
            this.getUsers()
        }
    }
</script>

<style scoped>
    .userManage {
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