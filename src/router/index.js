import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import DashBoard from "../components/home/DashBoard";
import UserManage from "../components/home/UserManage";
import IndicatorsManage from "../components/home/IndicatorsManage";
import TagsManage from "../components/home/TagsManage";
import ProjectManage from "../components/home/ProjectManage";
import FileManage from "../components/home/FileManage";
import RecommendManage from "../components/home/RecommendManage";
import NewsManage from "../components/home/NewsManage";
import UserTags from "../components/home/UserTags";
import HeatMap from "../components/HeatMap";
import UserAnalysis from "../components/home/UserAnalysis";

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/admin',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/admin',
        component: DashBoard
      },
      {
        path: '/userManage',
        component: UserManage
      },
      {
        path: '/userManage',
        component: UserManage
      },
      {
        path: '/indicatorsManage',
        component: IndicatorsManage
      },
      {
        path: '/tagsManage',
        component: TagsManage
      },
      {
        path: '/projectManage',
        component: ProjectManage
      },
      {
        path: '/fileManage',
        component: FileManage
      },
      {
        path: '/recommendManage',
        component: RecommendManage
      },
      {
        path: '/newsManage',
        component: NewsManage
      },
      {
        path: '/userTags',
        component: UserTags
      },
      {
        path: '/userAnalysis',
        component: UserAnalysis
      },
    ]
  },
  {
    path: '/heatMap',
    name: 'HeatMap',
    component: HeatMap
  },
  {
    path: '/',
    name: 'Login',
    component: () => import("../views/Login")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
