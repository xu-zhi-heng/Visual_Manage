<template>
    <div>
        <ve-bar :data="chartData" :settings="chartSettings" :extend='chartExtend' :colors="colors"></ve-bar>
    </div>
</template>

<script>
    export default {
        name: "Bar",
        data() {
            return {
                chartData: {},
                chartSettings: {},
                chartExtend: {},
                colors: ['#9528b9','#b046d4',"#c767e7","#e394fe",]
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
            this.chartSettings = {
                dimension: ['日期'],
                metrics: ['访问用户']
            }
            this.chartData = {
                columns: ['日期', '访问用户', '下单用户', '下单率'],
                rows: [
                    { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                    { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                    { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                    { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                    { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                    { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
                ]
            }
        }
    }
</script>

<style scoped>

</style>