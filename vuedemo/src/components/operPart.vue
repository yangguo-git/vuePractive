<template>
  <div class="operWraps">
    <!-- 操作区 -->
    <h4>当前处理操作</h4>
    <div class="mainPart">
      <div>
        <el-radio v-model="opinionVal" label="1">同意</el-radio>
        <el-radio v-model="opinionVal" label="2">驳回</el-radio>
      </div>

      <div class="operBox">
        <label for>处理意见</label>
        <el-input type="textarea" v-model="desc" placeholder="请输入文本"></el-input>
      </div>
      <div class="btnShenBox">
        <el-button type="text" @click="handleShen">请审核</el-button>
        <el-button type="text" @click="handleAgree">同意</el-button>
        <el-button type="text" @click="handleDisagree">不同意</el-button>
        <el-button type="text" @click="handleOver">处理完毕</el-button>
        <el-button type="text" @click="handleEnd">结束</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opinionVal: "1",
      desc: ""
    };
  },
  methods: {
    handleShen() {
      this.desc = "请审核";
    },
    handleAgree() {
      this.desc = "同意";
    },
    handleDisagree() {
      this.desc = "不同意";
    },
    handleOver() {
      this.desc = "处理完毕";
    },
    handleEnd() {
      this.desc = "结束";
    }
  }
};
</script>

<style scoped>
.mainPart{
  /* margin-left: 50px; */
}
.operWraps {
  margin-top: 10px;
}
.operWraps h4 {
  margin-right: 10px;
  margin-bottom: 10px;
}
div.el-textarea {
  width: 30%;
  vertical-align: top;
}
.operBox {
  margin-top: 10px;
}
.btnShenBox {
  margin-left: 67px;
}
</style>