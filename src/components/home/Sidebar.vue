<template>
    <div class="sidebar">
        <ul>
            <li :class="currentIndex === item.id ? 'active' : ''" v-for="item in sidebars" :key="item.id" @click="active(item.id,item.router,item.name)">
                <a>
                    <i :class="item.icon"></i>
                    <span style="font-size: 18px;">{{item.name}}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Sidebar",
        data() {
            return {
                sidebars: [
                    {
                        id: 0,
                        name: '首页',
                        icon: 'el-icon-house',
                        router: '/admin'
                    },
                    {
                        id: 1,
                        name: '用户管理',
                        icon: 'el-icon-user',
                        router: '/userManage'
                    },
                    {
                        id: 2,
                        name: '用户标签',
                        icon: 'el-icon-collection-tag',
                        router: '/userTags'
                    },
                    {
                        id: 3,
                        name: '用户分析',
                        icon: 'el-icon-pie-chart',
                        router: '/userAnalysis'
                    },
                    {
                        id: 4,
                        name: '页面热力图',
                        icon: 'el-icon-discover',
                        router: '/heatMap'
                    },
                    {
                        id: 5,
                        name: '指标管理',
                        icon: 'el-icon-data-line',
                        router: '/indicatorsManage'
                    },
                    {
                        id: 6,
                        name: '标签管理',
                        icon: 'el-icon-price-tag',
                        router: '/tagsManage'
                    },
                    {
                        id: 7,
                        name: '工程管理',
                        icon: 'el-icon-menu',
                        router: '/projectManage'
                    },
                    {
                        id: 8,
                        name: '文件管理',
                        icon: 'el-icon-files',
                        router: '/fileManage'
                    },

                    {
                        id: 9,
                        name: '推荐管理',
                        icon: 'el-icon-share',
                        router: '/recommendManage'
                    },
                    {
                        id: 10,
                        name: '公告管理',
                        icon: 'el-icon-news',
                        router: '/newsManage'
                    },
                ],
                currentIndex: 0
            }
        },
        methods: {
            active(id,router,name) {
                this.currentIndex = id
                this.$router.push(router)
                this.$emit('getHeaderName',name)
            }
        }
    }
</script>

<style scoped>
    .sidebar {
        max-height: none;
    }
    .sidebar ul {
        padding-left: 0;
        list-style: none;
    }
    .sidebar ul li{
        position: relative;
    }
    .sidebar li a {
        padding: 18px 20px;
        font-weight: 400;
        text-decoration: none;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #cbcbcd;
    }
    .sidebar li a i {
        margin-right: 20px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        padding-right: 20px;
        border-right: 1px solid #454649;
        font-size: 24px;
    }
    .sidebar li.active i {
        color: #DB6574;
    }
    .sidebar ul li.active::before {
        background: #DB6574;
    }
    .sidebar li.active > a {
        background: #34373d;
        color: #bfc1c4;
    }
    .sidebar ul li::before {
        content: '';
        width: 2px;
        height: 100%;
        background: none;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
    }
</style>