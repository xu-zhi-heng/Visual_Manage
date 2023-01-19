import request from "../api/request"
const index = {
    Login(data) {
        return request({
            method: 'POST',
            data: data,
            url: "/user/login"
        })
    },
    //-------------------------------指标-------------------------------
    // 获取所有指标
    getQuotas() {
        return request({
            method: 'GET',
            url: "/manager/quota/quotas"
        })
    },
    //-------------------------------标签-------------------------------
    // 获取标签
    getTags() {
        return request({
            method: 'GET',
            url: "/manager/label/labelInfo"
        })
    },
    // 添加标签
    DefineTheTag(data) {
        return request({
            method: 'POST',
            data: data,
            url: "/manager/label/addLabel"
        })
    },
    // 添加关键词
    DefineKeyWord(data) {
        return request({
            method: 'POST',
            data: data,
            url: "/manager/label/addKeyword"
        })
    },
    // 获取标签列表
    getTagsList() {
        return request({
            method: 'GET',
            url: "/manager/label/labels"
        })
    },

    //-------------------------------工程-------------------------------
    // 获取工程
    getProjects() {
        return request({
            method: 'GET',
            url: "/manager/project/projects"
        })
    },

    //-------------------------------文件-------------------------------
    // 获取文件
    getFiles() {
        return request({
            method: 'GET',
            url: "/manager/file/files"
        })
    },

    //-------------------------------通知-------------------------------
    // 获取通知
    getNotices() {
        return request({
            method: 'GET',
            url: "/manager/notice/notices"
        })
    },
    // 添加通知
    addNotice(data) {
        return request({
            method: 'POST',
            url: `/manager/notice/addNotice`,
            data: data
        })
    },
    // 删除通知
    deleteNoticeById(id) {
        return request({
            method: 'DELETE',
            url: `/manager/notice/removeNotice?id=${id}`
        })
    },
    // 推送通知
    pushNotice(id) {
        return request({
            method: 'PUT',
            url: `/manager/notice/pushNotice?id=${id}&isPushed=1`
        })
    },

    //-------------------------------首页数据-------------------------------
    // 获取每天注册人数
    getRegisterNumber() {
        return request({
            method: 'GET',
            url: "/index/chart/chartRegisterData"
        })
    },
    // 获取词云
    getWordCloud() {
        return request({
            method: 'GET',
            url: "/index/chart/chartWordCloudData"
        })
    },
    // 获取每日工程数
    getProjectNumber() {
        return request({
            method: 'GET',
            url: "/index/chart/chartProjectData"
        })
    },
    // 获取数据来源
    getDataForm() {
        return request({
            method: 'GET',
            url: "/index/chart/chartDSData"
        })
    },
    // 获取首页数据
    getIndexInfo() {
        return request({
            method: 'GET',
            url: "/index/info"
        })
    },

    //-------------------------------用户-------------------------------
    // 获取所有用户
    getUsers() {
        return request({
            method: 'GET',
            url: "/manager/customer/customers"
        })
    },
    // 获取所有用户的迭代标签数据
    getAllUserTagsData() {
        return request({
            method: 'GET',
            url: `/manager/customer/allUserLabel`,
        })
    },
    // 获取某一个用户身上的标签数据
    getUserTagsByUserId(userId) {
        return request({
            method: 'GET',
            url: `/manager/customer/oneUserLabel/${userId}`,
        })
    },
    // 给用户添加标签
    addUserTagByUserId(data) {
        return request({
            method: 'POST',
            data: data,
            url: `/manager/customer/addUserLabel`,
        })
    },
    // 删除用户身上的标签
    deleteTagById(id) {
        return request({
            method: 'DELETE',
            url: `/manager/customer/removeUserLabel/${id}`,
        })
    },
    // 获取用户标签数据(雷达图)
    getUserTag(userId) {
        return request({
            method: 'GET',
            url: `/manager/customer/chartLabel/${userId}`
        })
    },
    // 用户使用图表占比
    getUserCharts(userId) {
        return request({
            method: 'GET',
            url: `/manager/customer/chart/chartScale/${userId}`
        })
    },
    // 用户使用计算方式
    getUserCompute(userId) {
        return request({
            method: 'GET',
            url: `/manager/customer/chart/chartCompute/${userId}`
        })
    },
    // 用户在线时长
    getUserOnlineTime(userId) {
        return request({
            method: 'GET',
            url: `/manager/customer/chart/chartOnlineTime/${userId}`
        })
    },
    // 获取用户的分析数据
    getUserBestInfo(userId) {
        return request({
            method: 'GET',
            url: `/manager/customer/userInfo/${userId}`
        })
    },
    // 设置用是否推荐
    setUserIsRecommend(data) {
        return request({
            method: 'PUT',
            data: data,
            url: `/manager/customer/setRecommend`
        })
    },

    //-------------------------------推荐-------------------------------
    // 获取所有用户的每天推荐
    getAllUserRecommends() {
        return request({
            method: 'GET',
            url: `/manager/recommend/allRecommend`
        })
    },
    // 获取某一个用户的推荐内容
    getUserRecommendsByUserId(userId) {
        return request({
            method: 'GET',
            url: `/manager/recommend/userRecommend/${userId}`
        })
    },
    // 获取用户特定日期下的内容
    getUserRecommendsByUserIdAndDate(userId,date) {
        return request({
            method: 'GET',
            url: `/manager/recommend/userRecommend/${userId}/${date}`
        })
    },
    // 移除用户推荐内容
    removeUserRecommend(id) {
        return request({
            method: 'DELETE',
            url: `/manager/recommend/userRecommend/${id}`
        })
    }
}
export default index