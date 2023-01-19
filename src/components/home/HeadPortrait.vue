<template>
    <div class="headPortrait">
        <div class="block">
            <el-avatar :size="50" :src="squareUrl"></el-avatar>
        </div>
        <div class="info">
            <span>Admin</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HeadPortrait",
        data() {
            return {
                squareUrl: require("../../assets/logo.png")
            }
        }
    }
</script>

<style scoped>
    .headPortrait {
        padding: 30px 20px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .headPortrait span {
        font-size: 24px;
    }
</style>