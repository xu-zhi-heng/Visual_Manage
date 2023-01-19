<template>
    <div class="TagsManage">
        <div style="margin-bottom: 20px;text-align: left">
            <el-button
                    size="mini"
                    type="primary" @click="beforeAddTag"
            >添加标签</el-button>
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
                    prop="name"
                    label="标签名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="keyWordList"
                    label="关键词"
                    width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="success"
                            @click="beforeAddKeyWord(scope.row.id)"
                    >添加关键词</el-button>
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

        <div class="form" ref="TagForm">
            <el-form ref="form" :model="tag">
                <el-form-item label="标签名称">
                    <el-input v-model="tag.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="AddTag">立即添加</el-button>
                    <el-button @click="closeAddTag">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="form" ref="KeyWordForm">
            <el-form ref="form" :model="keywords">
                <el-form-item label="关键词">
                    <el-input v-model="keywords.keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="AddKeyWord">立即添加</el-button>
                    <el-button @click="closeAddKeyWord">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import index from '../../api/index'
    export default {
        name: "TagsManage",
        data() {
            return {
                tableData: [],
                tag: {
                    name: ''
                },
                keywords: {
                    labelId: '',
                    keyword: ''
                },
            }
        },
        methods: {
            beforeAddTag() {
                this.$refs.TagForm.style.display = 'block'
            },
            AddTag() {
                index.DefineTheTag(this.tag).then(res => {
                    if(res.code === 20000) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.getTags()
                        this.closeAddTag()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            closeAddTag() {
                this.$refs.TagForm.style.display = 'none'
            },
            beforeAddKeyWord(id) {
                this.$refs.KeyWordForm.style.display = 'block'
                this.keywords.labelId = id
            },
            AddKeyWord() {
                index.DefineKeyWord(this.keywords).then(res => {
                    if(res.code === 20000) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.getTags()
                        this.closeAddKeyWord()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            closeAddKeyWord() {
                this.$refs.KeyWordForm.style.display = 'none'
            },
            getTags() {
                this.tableData = []
                index.getTags().then(res => {
                    if(res.code === 20000) {
                        for(let i = 0; i < res.data.label.length; i++) {
                            let obj = {}
                            obj.id = res.data.label[i].id
                            obj.name = res.data.label[i].name
                            obj.keyWordList = []
                            for(let j = 0; j < res.data.label[i].keywordList.length; j++) {
                                obj.keyWordList.push(res.data.label[i].keywordList[j].keyword)
                            }
                            obj.keyWordList = '[' + obj.keyWordList + ']'
                            this.tableData.push(obj)
                        }
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
            this.getTags()
        }
    }
</script>

<style scoped>
    .TagsManage {
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