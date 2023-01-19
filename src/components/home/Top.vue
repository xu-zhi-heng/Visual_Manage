<template>
    <div class="top">
        <div class="top-left">
            <h1>DataVisual</h1>
        </div>
        <div class="top-right">
            <i class="el-icon-search"></i>
            <i class="el-icon-house" @click="goHome"></i>
            <span @click="logout" style="display: flex;align-items: center;justify-content: space-around">
                <span style="font-size: 20px">
                    Logout
                </span>
                <i class="el-icon-right"></i>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Top",
        data() {
            return {

            }
        },
        methods: {
            goHome() {
                this.$router.push("/admin")
            },
            logout() {
                this.$router.push("/")
            }
        }
    }
</script>

<style scoped>
    .top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .top-left {
        width: 280px;
    }
    .top-left h1 {
        color: white;
        letter-spacing: 5px;
    }
    .top-left h1:hover {
        color: #42b983;
    }
    .top-right {
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .top-right i {
        font-size: 20px;
    }
    .top-right i:hover{
        color: #42b983;
    }
</style>