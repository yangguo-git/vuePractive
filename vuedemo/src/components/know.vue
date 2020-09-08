<template>
  <div id="new">
    <h3>vue知识点</h3>
    <h4>计算属性</h4>
    <hr />
    <input type="text" v-model="firstName" />

    <input type="text" name id v-model="lastName" />
    {{fullName}}
    <hr />

    <h4>watch监视</h4>

    <button @click="chaneData()">点击改变</button>

    <hr />
    <ul>
      <li>
        <label for>单价</label>
        <input type="text" v-model="count" />
      </li>
      <li>
        <label for>数量</label>
        <input type="text" v-model="price" />
      </li>
      <li>
        <label for>折扣</label>
        <input type="text" v-model="rate" />
      </li>
      总价格： {{allPrice}}
    </ul>
    <hr />
    <h5>拦截器</h5>
    <ul>
      <li v-for="(item,keys) in newList" :key="keys">
        <router-link :to='{name:"detail",query:{aid:item.aid}}''>{{item.title}}</router-link>
      </li>
    </ul>
    <!-- 插槽 -->
    <footers>
      <!-- <button @click="hanndleSlot">点击插槽</button> -->
      <!-- <el-button type="text" @click="open">点击打开 Message Box</el-button> -->
    </footers>

    <el-button type="text" @click="openDialog">打开嵌套表单的 Dialog</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" @close="handleClear">
      <ul>
        <!-- <li v-for="(itmes,key) in dialogList" :key="key">
          {{itmes}}
        </li> -->
        <el-radio v-model="radio" label="1">备选项</el-radio>
        <el-radio v-model="radio" label="2">备选项</el-radio>

        <el-radio-group v-model="radios">
        <el-radio :label="items.value" v-for="(items,key) in radioList" :key="key">{{items.name}}</el-radio>
        <!-- <el-radio :label="6">备选项</el-radio> -->
        <!-- <el-radio :label="9">备选项</el-radio> -->
      </el-radio-group>
      </ul>
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="open">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Footers from "./footer";
export default {
  components: {
    Footers
  },
  data() {
    return {
      dialogFormVisible: false,
      radio: '1',
      radios:'',
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      firstName: "",
      lastName: "",
      text1: [],
      count: 0,
      price: 0,
      rate: 0,
      newList: [],
      title: "嘿嘿",
      dialogList:[],
      radioList:[]
    };
  },
  computed: {
    fullName() {
      return this.firstName + "" + this.lastName;
    },
    allPrice() {
      return this.count * this.price * (this.rate / 100);
    }
  },
  methods: {
    openDialog(){
      this.dialogFormVisible = true;

      this.dialogList = [1111,2,2,22,2,2]
      this.radioList = [
        {
name:"嘿嘿",
value:3
      },{
name:"嘿嘿1",
value:6
      },{
name:"嘿嘿2",
value:4
      }]

    },
    handleClear() {
      this.form.name = "";
      this.form.region = "";
    },

    open() {
      console.log(this.form.region, this.form.name,this.radios);
      this.dialogFormVisible = false;
    },
    chaneData() {
      this.text = "abc";
    }
  },
  watch: {
    text() {
      console.log("数据改变了");
    }
  },
  mounted() {
    this.$axios
      .get(
        "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1"
      )
      .then(response => {
        this.newList = response.data.result;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style>
li {
  list-style: none;
}
</style>
