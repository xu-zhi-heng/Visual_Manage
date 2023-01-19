<template>
    <ve-histogram :data="chartData" :settings="chartSettings" :extend='chartExtend' :colors="colors"></ve-histogram>
</template>

<script>
    import index from '../../api/index'
    export default {
        name: "Histogram",
        data() {
            return {
                chartData: {},
                chartSettings: {},
                chartExtend: {},
                colors: ['#EF8C99']
            }
        },
        created() {
            index.getProjectNumber().then(res => {
                if(res.code === 20000) {
                    this.chartData = {
                        columns: res.data.cols,
                        rows: res.data.rows
                    }
                    this.chartSettings = {
                        // metrics: res.data.cols,
                        // stack: {'下单率': ['访问用户','下单用户']}
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        },
        mounted() {
            this.chartExtend = {
                'xAxis.0.axisLabel.color': 'white', //x轴文本颜色
                'yAxis.0.axisLabel.color': 'white', //y轴文本改变颜色
                legend: {
                    textStyle: {
                        color: 'white',
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>