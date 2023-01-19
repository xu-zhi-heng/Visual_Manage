<template>
    <ve-line :data="chartData" :settings="chartSettings" :extend='chartExtend' :colors="colors"></ve-line>
</template>

<script>
    import index from '../../api/index'
    export default {
        name: "LineChart",
        data() {
            return {
                chartData: {},
                chartSettings: {},
                chartExtend: {},
                colors: ['#864DD9','#EF8C99']
            }
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
            index.getRegisterNumber().then(res => {
                if(res.code === 20000) {
                    this.chartData = {
                        columns: res.data.cols,
                        rows: res.data.rows
                    }
                    this.chartSettings = {
                        // stack: {
                        //     '用户': ['访问用户', '下单用户']
                        // },
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>

</style>