<template>
  <div>
    <p>练习sync修饰符</p>
    <el-input v-model="form.name"></el-input>
    <el-button type="text" @click="dialogFormVisible = true">选择</el-button>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <post-vue :dialog-show.sync="dialogFormVisible" :choose-nums.sync="form.name"></post-vue>
    </el-dialog>
    <div>
      <chile-vue v-for="(itema,index) in arrs" :key="index" :datas="itema"></chile-vue>
      <!-- <banner-vue v-for="(itema,index) in arrs" :key="index" :datas = itema></banner-vue> -->
    </div>
    <hr />

    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city.value" :key="city.value">{{city.label}}</el-checkbox>
    </el-checkbox-group>


  </div>
</template>

<script>
import PostVue from "./post";
import ChileVue from "./childs";
import Banner from "./banner";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "嘿嘿",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      arrs: [
        { name: "转盘", age: "23" },
        { name: "抽奖", age: "50" }
      ],
      checkAll: false,
      checkedCities: [2002,2003],
      cities: [
        {
          label: "微信",
          value: 2002
        },
        {
          label: "支付宝",
          value: 2003
        },
        {
          label: "头条",
          value: 2004
        },
        {
          label: "抖音",
          value: 2005
        }
      ],
      isIndeterminate: true
    };
  },
  components: {
    PostVue,
    ChileVue,
    bannerVue: Banner
  },
  methods: {
    handleCheckAllChange(val) {
      var objs = this.cities;
      var newArrs = [];
      for(var obj of objs){

        newArrs.push(obj.value)

      }
      this.checkedCities = val ? newArrs : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style>
</style>