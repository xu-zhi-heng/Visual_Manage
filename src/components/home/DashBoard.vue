<template>
    <div class="index">
        <div style="padding: 0 16px">
            <div class="container-fluid">
                <el-row :gutter="20">
                    <el-col :span="6" v-for="item in fluids" :key="item.id">
                        <div class="grid-content bg-purple">
                            <div class="progress-details">
                                <div class="title">
                                    <div class="icon" style="text-align: left">
                                        <i :class="item.icon"></i>
                                    </div>
                                    <strong style="letter-spacing: 2px">{{item.name}}</strong>
                                </div>
                                <div class="number">{{item.number}}</div>
                            </div>
                            <el-progress :percentage="item.percentage"></el-progress>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div style="padding: 0 16px">
            <div class="container-fluid">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <div class="panel-heading">每日工程数</div>
                            <Histogram/>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="grid-content bg-purple">
                            <div class="panel-heading">每日注册人数</div>
                            <LineChart/>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div style="padding: 0 16px">
            <div class="container-fluid">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="panel-heading">数据来源占比</div>
                            <Pie/>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <div class="panel-heading">输入内容词云</div>
                            <word-cloud/>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import Histogram from "../charts/Histogram";
    import LineChart from "../charts/LineChart";
    import Pie from "../charts/Pie";
    import Bar from "../charts/Bar";
    import WordCloud from "../charts/wordCloud";
    import index from '../../api/index'
    export default {
        name: "DashBoard",
        components: {WordCloud, LineChart, Histogram,Pie, Bar},
        data() {
            return {
                fluids: [
                    {
                        id: 0,
                        icon: 'el-icon-user-solid',
                        name: '总用户数',
                        number: 100,
                        percentage: 80
                    },
                    {
                        id: 1,
                        icon: 'el-icon-files',
                        name: '总文件数',
                        number: 100,
                        percentage: 60
                    },
                    {
                        id: 2,
                        icon: 'el-icon-menu',
                        name: '总工程数',
                        number: 100,
                        percentage: 50
                    },
                    {
                        id: 3,
                        icon: 'el-icon-alarm-clock\n',
                        name: '使用总时间',
                        number: 100,
                        percentage: 40
                    }
                ],
                colors: ["#69D2E7", "#AAB3AB", "#61a0a8", "#d48265", "#A8E6CE"]
            }
        },
        created() {
            index.getIndexInfo().then(res => {
                if(res.code === 20000) {
                    this.fluids[0].number = res.data.data.totalCustomer
                    this.fluids[1].number = res.data.data.totalFile
                    this.fluids[2].number = res.data.data.totalProject
                    this.fluids[3].number = res.data.data.totalUseTime
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    .index {
        width: 100%;
        height: 100%;
    }
    .container-fluid {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }
    /deep/ .el-row {
        margin-bottom: 20px;
    }
    /deep/ .el-col {
        border-radius: 4px;
    }
    /deep/ .bg-purple {
        background: #2d3035;
        color: #8a8d93;
    }
    /deep/ .grid-content {
        border-radius: 4px;
        min-height: 36px;
        padding: 20px;
        margin-bottom: 30px;
    }
    .progress-details {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 15px;
    }
    .title {
        margin-bottom: 0;
    }
    .icon i {
        font-size: 20px;
    }
    .number {
        font-size: 35px;
        color: #864DD9 !important;
    }
    /deep/ .el-progress-bar {
        margin-right: 0 !important;
        padding-right: 0 !important;
    }
    /deep/ .el-progress__text  {
        display: none;
    }
    /deep/ .el-progress-bar__inner {
        background: #864DD9;
    }
    /deep/ .el-progress-bar__outer {
        height: 4px !important;
        border-radius: 30px;
        overflow: hidden;
    }
    .panel-heading {
        text-align: left;
        padding: 10px 15px;
        border-bottom: 1px solid transparent;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        font-size: 14px;
        font-weight: 300;
        border-left: 5px solid #2fb9d4;
        margin-bottom: 15px;
    }

</style>