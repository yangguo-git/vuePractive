<template>
  <div id="child">
    <h4>我是hello组件的子组件</h4>
    <hr />
    <p>我是传递过来的值---{{myname}}</p>
    <p>我是传递过来的值---{{myTitle}}</p>
    <hr />

    <button @click="handleClick">传值给父组件</button>

    <button @click="handleGmsg">主动获取父组件的数据</button>
    <button @click="handleMethods">主动获取父组件的方法</button>
  </div>
</template>

<script>
import bus  from "../modles/bus"
export default {
  data() {
    return {
      childMsg: "我是子组件的数据"
    };
  },
  props: ["myname", "myTitle"],
  methods: {
    handleClick() {
      this.$emit("myEvent", this.childMsg);
    },
    handleChils() {
      console.log("我是子组件的方法");
    },
    handleGmsg() {
      console.log(this.$parent.msg);
    },
    handleMethods() {
      this.$parent.handleParent(); //主动执行父组件的方法
    }
  },
  mounted(){

      bus.$on("to-brother",function(data){
          console.log(data);
      })
  }
};
</script>


<style  scoped>
</style>