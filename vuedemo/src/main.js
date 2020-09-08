import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/static/reset.css'

import '../src/static/icon/iconfont.css'
Vue.use(ElementUI);
Vue.use(VueResource)

Vue.use(VueRouter)

Vue.prototype.$axios = axios;


//拦截器
axios.interceptors.response.use((response) => {
  // 回复前该做点什么
  console.log("接收响应之后");//发生错误该做什么
  return response;
}, error => {

  console.log("错误了");//发生错误该做什么
})

axios.interceptors.request.use((config) => {
  console.log("请求发出之前");//发生错误该做什么
  return config;// 回复前该做点什么
}, error => {

  console.log("错误了");//发生错误该做什么

})


Vue.config.productionTip = false

import Home from './components/home.vue'
import New from './components/new.vue'
import List from './components/list.vue'
import Detail from './components/detail.vue'
import Vues from './components/know.vue'

//自有标签 privateLabel

import PrivateLabel from './components/privateLabel.vue'
import RealtimeLabel from './components/realtimeLabel.vue'
import CreateLabel from './components/createLabel.vue'
import MyDraft from './components/mydraft.vue'
import MyTodo from './components/mytodo.vue'
import MyHasdo from './components/myhasdo.vue'
import LookReal from './components/lookreal.vue'
import OrderDetail from './components/orderdetail.vue'
import Hello from './components/hello.vue'
import Child from './components/child.vue'
import Practive from './components/practive.vue'



//自定义标签 
// 编程导航跳转
import Movie from './components/movie.vue'

const router = new VueRouter({
  routes: [
    {
      path: "/hello",
      name: "hello",
      component: Hello
    },
    {
      path: "/child",
      name: "child",
      component: Child
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/new",
      name: "new",
      component: New
    },
    {
      path: "/practive",
      name: "practive",
      component: Practive
    },
    {
      path: "/list",
      name: "list",
      component: List
    },
    {
      path: "/detail",
      name: "detail",
      component: Detail
    },
    {
      path: "/movie",
      name: "movie",
      component: Movie
    },
    {
      path: "/vues",
      name: "vues",
      component: Vues
    },
    {
      path: "/privateLabel",
      name: "privateLabel",
      component: PrivateLabel 
    },
    {
      path: "/realtimeLabel",
      name: "realtimeLabel",
      component: RealtimeLabel 
    },
    {
      path: "/createLabel",
      name: "createLabel",
      component: CreateLabel
    },
    {
      path: "/mydraft",
      name: "mydraft",
      component: MyDraft
    },
    {
      path: "/mytodo",
      name: "mytodo",
      component: MyTodo
    },
    {
      path: "/myhasdo",
      name: "myhasdo",
      component: MyHasdo
    },
    {
      path: "/lookreal",
      name: "lookreal",
      component: LookReal
    },
    {
      path: "/orderdetail",
      name: "orderdetail",
      component: OrderDetail
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
