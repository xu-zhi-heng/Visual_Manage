<template>
    <div class="page-header">
        <h1 style="margin-left: 10px;">{{headerName}}</h1>
    </div>
</template>

<script>
    export default {
        name: "pageHeader",
        props: ['headerName']
    }
</script>

<style scoped>
    .page-header {
        padding: 20px 15px;
        background: #2d3035;
        color: #8a8d93;
        margin-bottom: 30px;
        text-align: left;
    }
</style>