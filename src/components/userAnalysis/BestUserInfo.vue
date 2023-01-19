<template>
    <div style="height: 439.2px" v-if="JSON.stringify(this.bestUserInfo) != '{}'">
        <div class="title">信息汇总</div>
        <ul>
            <li v-for="(val,key,index) in this.bestUserInfo" :key="index">
                {{getChineseKey(key)}}
                <div>
                    <span :style="{color: colors[index]}">
                        {{val}}
                    </span>
                </div>
            </li>
        </ul>
    </div>
    <div v-else style="color:red;height: 100px">
        <div class="title" >信息汇总</div>
        <div style="font-size: 25px">
            您还没有使用过我们平台
        </div>
    </div>
</template>

<script>
    import index from "../../api";

    export default {
        name: "BestUserInfo",
        props: ['data'],
        data() {
            return {
                bestUserInfo: {},
                colors: ['#28a745','#dc3545','#4797ff','#17a2b8','#6e00ff']
            }
        },
        methods: {
            getChineseKey(key) {
                switch (key) {
                    case 'favoriteCalculation': return "最常用计算方式";
                    case 'favoriteChart': return "最常用图表";
                    case 'loginDays': return "最长连续登陆";
                    case 'totalDataCount': return "总共使用天数";
                    case 'dsNum': return "总接入数据源个数";
                }
            }
        },
        watch: {
            data: {
                handler(newValue,oldValue) {
                    this.bestUserInfo = newValue
                },
                deep: true
            }
        },
        created() {
            index.getUserBestInfo(this.$route.query.userId).then(res => {
                if(res.code === 20000) {
                    if(res.data.data != null) {
                        this.bestUserInfo = res.data.data
                        delete this.bestUserInfo.id
                        delete this.bestUserInfo.userId
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    ul li {
        list-style: none;
    }
    li {
        border-bottom: 1px solid #e5e9ec;
        padding: 24px 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
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