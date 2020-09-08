<template>
  <div id="home">
    <h1>这个是主页页面</h1>
    <h3 style="color:red;">计算属性</h3>
    <input type="text" name id placeholder="请输入姓" v-model="firstName" />
    <input type="text" name id placeholder="请输入名" v-model="lastName" />
    {{fullName}}
    <hr />
    <h3 style="color:green;">过滤器</h3>
    {{msg | toUpper}}
    <hr />
    <h3 style="color:black;">自定义指令</h3>
    <p v-loweZhuan="msg2"></p>
    <hr />
    <h4>vue动画</h4>

    <button @click="isShow = !isShow">点击切换</button>

    <transition name="moves">
      <span v-if="isShow">切换动画</span>
    </transition>

    <h3>按条件搜索和排序</h3>

    <input type="text" v-model="searchContent" />

    <ul>
      <li v-for="(item,key) in filterPerson" :key="key">{{key}}-- {{item.name}} --{{item.age}}</li>
    </ul>

    <button @click="paiXu(0)">原来顺序</button>
    <button @click="paiXu(1)">点击降序</button>
    <button @click="paiXu(2)">点击升序</button>
    <hr>
    <h3>事件对象传参数</h3>
    <button @click="getEvent('aasdsd',$event)">点击获取事件对象</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      msg: "LALSLDLS LALSDLASDL ASDADL",
      msg2: "NBAASDASD",
      isShow: true,
      searchContent: "",
      persons: [
        {
          name: "tom",
          age: 45
        },
        {
          name: "luck",
          age: 25
        },
        {
          name: "mary",
          age: 30
        }
      ],
      sortType: 0
    };
  },
  computed: {
    //计算属性
    fullName() {
      return this.firstName + "" + this.lastName;
    },
    filterPerson() {
      var searchContent = this.searchContent;
      var persons = this.persons;
      var sortType = this.sortType;
      var fPersons;
      //数组过滤方法
      fPersons = persons.filter(function(p) {
        if (p.name.indexOf(searchContent) >= 0) { //return  p.name.indexOf(searchContent) >= 0 ;
          return p;
        }
      });

      //数组比较方法
      if (sortType != 0) {
        // 1 降序   2 升序
        fPersons.sort(function(a, b) {
          if (sortType == 1) {
            return b.age - a.age;
          } else {
            return a.age - b.age;
          }
        });
      }

      return fPersons;
    }
  },
  filters: {
    //过滤器
    toUpper(value) {
      return value.toLowerCase();
    }
  },
  directives: {
    //自定义指令
    loweZhuan(el, binding) {
      el.textContent = binding.value.toLowerCase();
    }
  },
  methods: {
    //vue动画
    paiXu(es) {
      this.sortType = es;
    },
    getEvent(e,event){
      console.log(e,event);

    }
  }
};
</script>
<style>
.moves-enter-active,
.moves-leave-active {
  transition: opacity 0.5s;
}
.moves-enter,
.moves-leave-to {
  opacity: 0;
}
</style>
