<template>
  <div>
    <h3>我是子组件2</h3>
    <button @click="handleBrother">传值给兄弟组件</button>
  </div>
</template>

<script>
import bus from "../modles/bus";
export default {
  data() {
    return {
        msg:"我是兄弟组件传递过来的值"
    };
  },
  methods: {
    handleBrother() {
      bus.$emit("to-brother", this.msg);
    }
  }
};
</script>

<style  scoped>
</style>