<template>
    <div class="userTags">
        <div style="margin-bottom: 20px;display: flex;align-items: center;justify-content: flex-start;">
            <el-input v-model="userId" placeholder="数据用户id" style="width: 400px;margin-right: 20px"></el-input>
            <el-button type="success" @click="search">搜索</el-button>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%;">
            <el-table-column
                    prop="userId"
                    label="用户id"
                    width="350px">
            </el-table-column>
            <el-table-column
                    prop="label"
                    label="标签" width="150px">
            </el-table-column>
            <el-table-column
                    prop="weight"
                    label="权重" width="100px">
            </el-table-column>
            <el-table-column
                    prop="isDelete"
                    label="是否删除" width="200px">
                <template slot-scope="scope">
                    <span>{{ scope.row.isDelete === 0 ? '没有删除' : '已删除' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="beforeAddUserTag(scope.row.userId)"
                    >添加</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            v-if="scope.row.isDelete === 0"
                            @click="deleteUserTag(scope.row.id)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="form" ref="TagForm">
            <el-form ref="form" :model="TagForm">
                <el-form-item label="选择标签">
                    <el-select v-model="TagForm.label" placeholder="请选择标签">
                        <el-option v-for="item in TagList" :key="item.id" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addUserTag">立即添加</el-button>
                    <el-button @click="closeTagForm">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import index from '../../api/index'
    export default {
        name: "UserTags",
        data() {
            return {
                tableData: [],
                TagForm: {
                    userId: '',
                    label: '',
                    weight: '0.2'
                },
                TagList: [],
                userId:  ''
            }
        },
        methods: {
            getAllUserTagData() {
                this.tableData = []
                index.getAllUserTagsData().then(res => {
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
            },
            closeTagForm() {
                this.$refs.TagForm.style.display = 'none'
            },
            beforeAddUserTag(userId) {
                this.TagForm.userId = userId
                this.$refs.TagForm.style.display = 'block'
                index.getTagsList().then(res => {
                    if(res.code === 20000) {
                        this.TagList = res.data.data
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            addUserTag() {
                index.addUserTagByUserId(this.TagForm).then(res => {
                    if(res.code === 20000) {
                        this.closeTagForm()
                        this.getAllUserTagData()
                    }
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            },
            deleteUserTag(id) {
                index.deleteTagById(id).then(res => {
                    if(res.code === 20000) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getAllUserTagData()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            search() {
                index.getUserTagsByUserId(this.userId).then(res => {
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
        created() {
            this.getAllUserTagData()
        }
    }
</script>

<style scoped>
    .userTags {
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
    /deep/ .el-select {
        width: 100%;
    }
    /deep/ .el-input {
        z-index: 2007 !important;
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
        transform: translate(-50%, -60%);
        z-index: 2007;
        display: none;
    }
</style>