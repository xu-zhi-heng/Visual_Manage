<template>
    <div v-if="JSON.stringify(chartData) !== '{}'">
        <div class="title">用户使用方式</div>
        <ve-bar :data="chartData" :settings="chartSettings" :extend='chartExtend' :colors="colors"></ve-bar>
    </div>
    <div v-else style="color:red;height: 100px">
        <div class="title" >用户使用方式</div>
        <div style="font-size: 25px">
            您还没有使用过我们平台计算过数据
        </div>
    </div>
</template>

<script>
    import index from "../../api";
    export default {
        name: "userCompute",
        props: ['data'],
        data() {
            return {
                colors: ['#4897fb'],
                chartSettings: {
                    dataOrder: {
                        label: '次数',
                        order: 'desc'
                    }
                },
                chartExtend: {
                    'xAxis.0.axisLabel.color': 'white', //x轴文本颜色
                    'yAxis.0.axisLabel.color': 'white', //y轴文本改变颜色
                    legend: {
                        textStyle: {
                            color: 'white',
                        }
                    }
                },
                chartData: {}
            }
        },
        watch: {
            data: {
                handler(newValue,oldValue) {
                    this.chartData = newValue
                },
                deep: true
            }
        },
        created() {
            index.getUserCompute(this.$route.query.userId).then(res => {
                if(res.code === 20000) {
                    if(res.data.rows.length !== 0) {
                        this.chartData = {
                            columns: res.data.cols,
                            rows: res.data.rows
                        }
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
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