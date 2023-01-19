<template>
    <div>
        <ve-pie :data="chartData" :settings="chartSettings" :extend='chartExtend' :colors="colors"></ve-pie>
    </div>
</template>

<script>
    import index from "../../api/index"
    export default {
        name: "Pie",
        data() {
            return {
                chartData: {},
                chartSettings: {},
                chartExtend: {},
                colors: ['#6933b9','#8553d1',"#a372ec","#be9df1",]
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
            index.getDataForm().then(res => {
                if(res.code === 20000) {
                    this.chartData = {
                        columns: res.data.cols,
                        rows: res.data.rows
                    }
                }
                this.chartSettings = {
                    limitShowNum: 5
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>

</style>