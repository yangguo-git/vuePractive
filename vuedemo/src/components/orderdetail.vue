<template>
  <div class="orderDetail" v-if="deleFlag">
    <div class="headContent">
      <h3>工单详情</h3>
      <div>
        <el-button type="normal" size="small" @click="handleBack" v-if="backFlag">返回</el-button>
        <el-button type="primary" size="small" @click="handleSave" v-if="saveFlag">保存</el-button>
        <el-button type="primary" size="small" @click="handleCommit" v-if="commitFlag">提交</el-button>
        <el-button type="normal" size="small" @click="handleDelte" v-if="delebtnFlag">删除</el-button>
      </div>
    </div>
    <!-- 步骤条 -->
    <div class="stepWrap">
      <el-steps :active="2" align-center :space="150">
        <el-step title="创建投放计划" description></el-step>
        <el-step title="分省审核" description></el-step>
        <el-step title="总部审核" description></el-step>
        <el-step title="发布" description></el-step>
        <el-step title="发起人确认" description></el-step>
        <el-step title="流程结束" description></el-step>
      </el-steps>
    </div>
    <!-- 表单 -->
     <h4 class="planContent">投放计划内容</h4>
    <div class="formWrap">
      <ul class="itemLists">
        <li>
          <label for>
            <span class="requireColor">*</span>工单编号
          </label>
          <el-input size="small" placeholder v-model="orderNum" maxlength="20" disabled></el-input>
        </li>
        <li>
          <label class="screas">
            <span class="requireColor">*</span>计划编号
          </label>
          <el-input size="small" placeholder v-model="planNum" maxlength="20" disabled></el-input>
        </li>
        <li>
          <label class="proLabel">
            <span class="requireColor">*</span>省份
          </label>

          <el-select v-model="provincevalue" multiple placeholder="请选择" size="small">
            <el-option
              v-for="item in proLimit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <label for>
            <span class="requireColor">*</span>地市
          </label>
          <el-select v-model="cityvalue" multiple placeholder="请选择" size="small">
            <el-option
              v-for="item in cityLimit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li>
          <label class="screas">
            <span class="requireColor">*</span>计划类型
          </label>
          <el-select v-model="planType" placeholder="请选择" size="small">
            <el-option
              v-for="item in planTypeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>

        <li>
          <label class="screas">
            <span class="requireColor">*</span>计划名称
          </label>
          <el-input size="small" placeholder v-model="planName" maxlength="20"></el-input>
        </li>

        <li>
          <label class="screas">
            <span class="requireColor">*</span>计划描述
          </label>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="planScren"
            maxlength="100"
          ></el-input>
        </li>
        <li>
          <label class="screas">
            <span class="requireColor">*</span>收益预估
          </label>
          <el-input size="small" placeholder v-model="valPrepate" maxlength="20"></el-input>
        </li>
        <li>
          <label class="screas">
            <span class="requireColor">*</span>计划类别
          </label>
          <el-select v-model="planClass" placeholder="请选择" size="small">
            <el-option
              v-for="item in planClassArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li id="timeWrap">
          <label for>
            <span class="requireColor">*</span>投放时间
          </label>
          <el-date-picker
            size="small"
            v-model="startValue"
            type="datetime"
            placeholder="请选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions0"
          ></el-date-picker>
          <em>——</em>
          <el-date-picker
            size="small"
            v-model="endValue"
            type="datetime"
            placeholder="请选择结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions1"
          ></el-date-picker>
        </li>
        <li>
          <label class="customerLabel">
            <span class="requireColor">*</span>客户群
          </label>
          <el-input size="small" placeholder v-model="customerGroup" maxlength="20"></el-input>
        </li>
        <li class="itemType">
          <label class="choseChu">
            <span class="requireColor">*</span>选择触点类型
          </label>
          <el-select v-model="contactType" placeholder="请选择" size="small">
            <el-option
              v-for="item in contactTypeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <label class>
            <span class="requireColor">*</span>选择渠道
          </label>
          <el-select v-model="contactChannel" placeholder="请选择" size="small">
            <el-option
              v-for="item in contactChannelArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
      </ul>
    </div>
    <!-- 子组件 微门户banner配置 -->
    <banner-vue></banner-vue>

    <div>
      <el-button type="primary" size="medium"><i class="el-icon-plus"></i>增加渠道触点配置</el-button>
    </div>

    <!-- 处理操作区组件 -->
    <operpart-vue></operpart-vue>

    <!-- 操作详情区 -->
    <opernote-vue></opernote-vue>

  </div>
</template>
<script>
import Banner from "./banner"
import OperPart from "./operPart"
import OperNote from "./operNote"
export default {
  data() {
    return {
      customerGroup: "",
      orderNum: "",
      planNum: "",
      cityvalue: "",
      provincevalue: "",
      proLimit: [],
      cityLimit: [],
      labelScren: "",
      planType: "",
      planName: "",
      planScren: "",
      planTypeArr: [],
      valPrepate: "",
      planClass: "",
      planClassArr: [],
      startValue: "",
      endValue: "",
      options: "",
      contactType:'',
      contactTypeArr:[],
      contactChannel:'',
      contactChannelArr:[],
      pickerOptions0: {
        disabledDate: time => {
          if (this.endValue) {
            return time.getTime() > this.endValue;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          if (this.endValue) {
            return time.getTime() < this.startValue;
          }
          return time.getTime() < Date.now();
        }
      },
      deleFlag:true,
      backFlag:true,
      saveFlag:true,
      commitFlag:true,
      delebtnFlag:true
    };
  },
  components: {
    'bannerVue':Banner,
    'operpartVue':OperPart,
    'opernoteVue':OperNote,
  },
  methods:{
    handleBack(){
        this.$router.push({ name: "mydraft" });
    },
    handleSave(){
    },
    handleCommit(){
    },
    handleDelte(){
        
    this.$confirm('确认要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.deleFlag = false;
          this.$router.push({ name: "mydraft" });
        }).catch(() => {
          
        });
    }
  },
  mounted(){
    //判断跳转过来的页面 kai
    var  getParam = this.$route.query.currentNum;
    console.log(this.$route.query);
    if(getParam == 1){//1 草稿
     this.delebtnFlag = true;
     this.delebtnFlag = true;
      this.saveFlag = true;
      this.commitFlag = true;

    }else if(getParam == 2){//2 待办
      this.delebtnFlag = false;

    }else if(getParam == 3){//3已办
      this.delebtnFlag = false;
      this.saveFlag = false;
      this.commitFlag = false;

    }
    //kai
  }
};
</script>

<style  scoped>
.planContent{
  margin-top: 10px;
  margin-bottom: 10px;
}
.orderDetail{
 margin: 10px;
}
.choseChu {
  margin-left: -28px;
}
.customerLabel {
  margin-left: 15px;
}
#timeWrap .el-input {
  width: 210px;
}
.proLabel {
  margin-left: 28px;
}
.headContent h3 {
  display: inline-block;
}
.headContent {
  height: 60px;
}
.headContent div {
  float: right;
  margin-top: 10px;
}
.formWrap{
  margin-left: 50px;
}
.formWrap ul > li {
  list-style: none;
  margin-bottom: 15px;
}
.requireColor {
  color: red;
}
.itemLists .el-input {
  width: 460px;
}
.itemLists .el-textarea {
  width: 460px;
  vertical-align: top;
}
.itemType div.el-select{
width: 195px;
}
</style>