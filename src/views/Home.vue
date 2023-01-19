<template>
  <div class="home">
    <el-container>
      <el-header style="height: 80px">
        <Top/>
      </el-header>
      <el-container>
        <el-aside width="280px">
          <HeadPortrait/>
          <Sidebar @getHeaderName="getHeaderName"/>
        </el-aside>
        <el-main>
          <page-header :headerName="headerName"/>
          <router-view @getHeaderName="getHeaderName"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Top from "../components/home/Top";
import HeadPortrait from "../components/home/HeadPortrait";
import Sidebar from "../components/home/Sidebar";
import DashBoard from "../components/home/DashBoard";
import PageHeader from "../components/home/pageHeader";
export default {
  name: 'Home',
  data() {
      return {
        headerName: '首页'
      }
  },
  methods: {
    getHeaderName(name) {
      this.headerName = name
    }
  },
  components: {
    PageHeader,
    DashBoard,
    Sidebar,
    HeadPortrait,
    Top

  }
}
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
  }
  /deep/ .el-container {
    width: 100%;
    height: 100%;
  }
  /deep/ .el-header {
    background-color: #2d3035;
    display: flex;
    text-align: center;
    color: #8a8d93;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #34373d;
    z-index: 10;
  }
  /deep/ .el-aside {
    background-color: #2d3035;
    height: 100%;
    color: white;
    border-right: 1px solid #34373d;
  }
  /deep/ .el-aside::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  /deep/ .el-aside::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 5px;
  }
  /deep/ .el-aside::-webkit-scrollbar-track {
    background: none;
    border-radius: 5px;
  }
  /deep/ .el-main {
    background-color: #22252a;
    text-align: center;
    height: 100%;
    color: white;
    padding: 0 !important;
    overflow-y: scroll;
    /*overflow: scroll;*/
  }
  /deep/ .el-main::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  /deep/ .el-main::-webkit-scrollbar-thumb {
    background: rgba(49 52 52 / 0.5);
    border-radius: 5px;
  }
  /deep/ .el-main::-webkit-scrollbar-track {
    background: none;
    border-radius: 5px;
  }
</style>
