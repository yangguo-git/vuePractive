<template>
  <div>
    <h3>插槽</h3>
    <slot></slot>

    <h3>过渡</h3>
    <button @click="handele">点击切换</button>
    <transition name="yang">
      <!-- <p v-if="isShow" class="shows">显示和隐藏</p> -->
    </transition>

    <button @click="handleGroup">控</button>
    <transition name="yang" mode="out-in">
      <p v-if="isShow" key="111">爱上了大叔的</p>
      <p v-else key="222">asdasdas</p>
    </transition>

    <h4 style="color:yellow;">自定义指令</h4>
    <p v-hello='"pink"'>我是自定义指令显示的内容</p>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    handele() {
      this.isShow = !this.isShow;
    },
    handleGroup() {
      this.isShow = !this.isShow;
    }
  },
  directives: {
    hello(el, bind) {
      console.log(el, bind);
      el.style.color = bind.value;
    }
  }
};
</script>

<style  scoped>
.shows {
  width: 100px;
  height: 100px;
  background-color: rebeccapurple;
}
.yang-enter-active,
.yang-leave-active {
  transition: opacity 0.5s;
}
.yang-enter,
.yang-leave-to {
  opacity: 0;
}
</style>