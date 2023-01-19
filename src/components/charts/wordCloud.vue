<template>
    <ve-wordcloud :data="chartData" :settings="chartSettings"></ve-wordcloud>
</template>

<script>
    import index from '../../api/index'
    export default {
        name: "wordCloud",
        data() {
            return {
                chartData: {},
                chartSettings: {}
            }
        },
        created() {
            index.getWordCloud().then(res => {
                if(res.code === 20000) {
                    this.chartData = {
                        columns: res.data.cols,
                        rows: res.data.rows
                    }
                    this.chartSettings = {
                        color: ['#ff0', '#00f', '#f00', '#0ff'],
                        shape: 'diamond',
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