<template>
  <div id="app">
    <div class="margins">
      <router-link :to = '{name:"practive"}'>练习</router-link>
   <router-link :to = '{name:"hello"}'>你好vue</router-link>
    <router-link :to = '{name:"home"}'>主页</router-link>
    <router-link :to = '{name:"new"}'>新闻</router-link>
    <router-link :to = '{name:"list"}'>新闻详情</router-link>
    <router-link :to = '{name:"vues"}'>vue知识点</router-link>
    <router-link :to = '{name:"privateLabel"}' class="greens">自有标签</router-link>
    <router-link :to = '{name:"mydraft"}' class="greens">我的草稿</router-link>
    <router-link :to = '{name:"mytodo"}' class="greens">我的待办</router-link>
    <router-link :to = '{name:"myhasdo"}' class="greens">我的已办</router-link>
    <router-link :to = '{name:"realtimeLabel"}' class="greens">实时标签</router-link>
     <router-link :to = '{name:"orderdetail"}' class="greens">工单详情</router-link>
  </div>
  <router-view></router-view>
  </div>
</template>

<script>
// import Home from "./components/home";
// import New from "./components/new";
// import List from "./components/list";

export default {
  name: "App",
  components: {
    // Home,
    // New,
    // List
  }
};
</script>

<style>
.greens{
  color: black;
  font-weight: bold;
}
.margins{
     margin-top: 10px;
    margin-bottom: 10px;
}
.margins a{
      margin-left: 10px;
      
}
</style>
