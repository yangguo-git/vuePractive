<template>
  <div id="hello">
    <h4>vue相关知识点</h4>
    <!-- 父子组件传值
        父传子  属性向下
        子传父  事件向上
        非父子  通过中间vue实例
    -->
    <vue-child myname="嘿嘿" :myTitle="msg" @myEvent="handleClicks" ref="childMark"></vue-child>

    <vue-child2></vue-child2>

    <hr />
    <vue-slots>
      <!-- <ul>
       <li v-for=" item in dataList" :key="item.age">
         {{item.name}}------{{item.age}}
       </li>
      </ul>-->
    </vue-slots>

    <!-- <button @click="handleHuo">父组件主动获取</button> -->
  </div>
</template>


<script>
import Child from "./child";
import Child2 from "./child2";
import Slots from "./slots";

export default {
  data() {
    return {
      msg: "动态传递来的值",
      dataList: [
        { name: "kebe", age: 20 },
        { name: "enen", age: 28 }
      ]
    };
  },
  components: {
    vueChild: Child,
    vueChild2: Child2,
    vueSlots: Slots
  },
  methods: {
    handleClicks(data) {
      console.log("传值给父组件", data);
    },
    handleHuo() {
      console.log(this.$refs.childMark.childMsg);
      this.$refs.childMark.handleChils(); //执行子组件的方法
    },
    handleParent() {
      console.log("我是父组件的方法");
    }
  }
};
</script>

<style  scoped>
</style>