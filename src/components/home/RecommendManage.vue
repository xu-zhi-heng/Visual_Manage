<template>
    <div class="RecommendManage">
        <div style="margin-bottom: 20px;display: flex;align-items: center;justify-content: flex-start;">
            <el-input v-model="userId" placeholder="数据用户id" style="width: 400px;margin-right: 20px"></el-input>
            <el-date-picker
                    v-model="date"
                    type="date"
                    placeholder="选择日期" style="width: 400px;margin-right: 20px">
            </el-date-picker>
            <el-button type="success" @click="search">搜索</el-button>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="userId"
                    label="用户ID"
                    width="300">
            </el-table-column>
            <el-table-column
                    prop="labelId"
                    label="标签Id"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="topic"
                    label="标题" width="350px">
            </el-table-column>
<!--            <el-table-column-->
<!--                    prop="msgUrl"-->
<!--                    label="内容地址" width="300px">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                    prop="pictureUrl"-->
<!--                    label="图片">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-avatar :src="scope.row.pictureUrl" shape="square"></el-avatar>-->
<!--                </template>-->
<!--            </el-table-column>-->
            <el-table-column
                    prop="createTime"
                    label="推荐日期" width="150px">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            >编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="deleteRecommend(scope.row.id)"
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
        name: "RecommendManage",
        mixins: [utils],
        data() {
            return {
                tableData: [],
                userId: '',
                date: ''
            }
        },
        methods: {
            getAllRecommends() {
                this.tableData = []
                index.getAllUserRecommends().then(res => {
                    if(res.code === 20000) {
                        this.tableData = res.data.data
                    }
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            },
            deleteRecommend(id) {
                index.removeUserRecommend(id).then(res => {
                    if(res.code === 20000) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.getAllRecommends()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            search() {
                this.tableData = []
                if(this.date === '') {
                    index.getUserRecommendsByUserId(this.userId).then(res => {
                        if(res.code === 20000) {
                            this.tableData = res.data.data
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }else if(this.userId !== '' && this.date !== ''){
                    index.getUserRecommendsByUserIdAndDate(this.userId,this.formatDate(this.date)).then(res => {
                        if(res.code === 20000) {
                            this.tableData = res.data.data
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
        },
        created() {
            this.getAllRecommends()
        }
    }
</script>

<style scoped>
    .RecommendManage {
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