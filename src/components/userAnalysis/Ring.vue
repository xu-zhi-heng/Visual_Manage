<template>
    <div v-if="JSON.stringify(chartData) !== '{}'">
        <div class="title">用户使用图表占比</div>
        <ve-ring :data="chartData" :settings="chartSettings" :extend='chartExtend'></ve-ring>
    </div>
    <div v-else style="color:red;height: 100px">
        <div class="title" >用户使用图表占比</div>
        <div style="font-size: 25px">
            您还没有使用过我们平台图表
        </div>
    </div>
</template>

<script>
    import index from '../../api/index'
    export default {
        name: "Ring",
        props: ['data'],
        data() {
            return {
                chartSettings: {
                    roseType: 'radius',
                    radius: [10, 100],
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
            index.getUserCharts(this.$route.query.userId).then(res => {
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
            // index.getUserTag(this.userId).then(res => {
            //     console.log(res)
            // }).catch(err => {
            //     console.log(err)
            // })
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