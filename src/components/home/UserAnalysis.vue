<template>
    <div class="userAnalysis">
        <div style="margin-bottom: 20px;display: flex;align-items: center;justify-content: flex-start;padding: 0 16px">
            <el-input v-model="userId" placeholder="数据用户id" style="width: 400px;margin-right: 20px"></el-input>
            <el-button type="success" @click="search">搜索</el-button>
        </div>
        <div class="container-fluid">
            <el-row :gutter="20">
                <el-col :span="16">
                    <div class="grid-content bg-purple">
                        <Ring :data="ringData"/>
                    </div>
                </el-col>

                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <BestUserInfo :data="bestUserInfoData"/>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="container-fluid">
            <el-row :gutter="20">
                <el-col :span="16">
                    <div class="grid-content bg-purple">
                        <online-time :data="onlineTimeData"/>
                    </div>
                </el-col>

                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <user-compute :data="userComputeData"/>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="container-fluid">
            <el-row :gutter="20">
                <el-col :span="14">
                    <div class="grid-content bg-purple">
                        <UserTagWeight :data="userTagData"/>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple">
                        <EventsList/>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import RadarMap from "../userAnalysis/RadarMap";
    import Ring from "../userAnalysis/Ring";
    import index from '../../api/index'
    import BestUserInfo from "../userAnalysis/BestUserInfo";
    import OnlineTime from "../userAnalysis/onlineTime";
    import UserCompute from "../userAnalysis/userCompute";
    import UserTagWeight from "../userAnalysis/UserTagWeight";
    import EventsList from "../userAnalysis/EventsList";
    export default {
        name: "UserAnalysis",
        data() {
            return {
                userId: '',
                ringData: {},
                bestUserInfoData: {},
                onlineTimeData: {},
                userComputeData: {},
                userTagData: {}
            }
        },
        methods: {
            search() {
                index.getUserCharts(this.userId).then(res => {
                    if(res.code === 20000) {
                        if(res.data.rows.length !== 0) {
                            this.ringData = {
                                columns: res.data.cols,
                                rows: res.data.rows
                            }
                        }else {
                            this.ringData = {}
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
                index.getUserBestInfo(this.userId).then(res => {
                    if(res.code === 20000) {
                        if(res.data.data != null) {
                            this.bestUserInfoData = res.data.data
                            delete this.bestUserInfo.id
                            delete this.bestUserInfo.userId
                        }else {
                            this.bestUserInfoData = {}
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
                index.getUserCompute(this.userId).then(res => {
                    if(res.code === 20000) {
                        if(res.data.rows.length !== 0) {
                            this.userComputeData = {
                                columns: res.data.cols,
                                rows: res.data.rows
                            }
                        }else {
                            this.userComputeData = {}
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
                index.getUserOnlineTime(this.userId).then(res => {
                    if(res.code === 20000) {
                        if(res.data.rows.length !== 0) {
                            this.onlineTimeData = {
                                columns: res.data.cols,
                                rows: res.data.rows
                            }
                        }else {
                            this.onlineTimeData = {}
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
                index.getUserTagsByUserId(this.$route.query.userId).then(res => {
                    this.userTagData = []
                    if(res.code === 20000) {
                        if(res.data.data.length !== 0) {
                            this.userTagData = res.data.data
                        }else {
                            this.userTagData = []
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        created() {
            this.userId = this.$route.query.userId
        },
        components: {EventsList, UserTagWeight, UserCompute, OnlineTime, BestUserInfo, Ring, RadarMap}
    }
</script>

<style scoped>
    .userAnalysis {
        padding: 0 16px;
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
</style>