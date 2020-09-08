<template>
  <div id="createLabel">
    <h4>查看实时标签</h4>
    <div>
      <ul class="itemLists">
        <li>
          <label for>
            <span></span>标签名称
          </label>
          <el-input size="small" placeholder="" v-model="labelName" :disabled="true"></el-input>
        </li>
        <li>
          <label class="screas">
            <span></span>描述
          </label>
          <el-input type="textarea" :rows="2" placeholder="" v-model="labelScren" :disabled="true"></el-input>
        </li>
        <li>
          <label for>
            <span></span>开放范围
          </label>

          <el-select v-model="provincevalue" multiple placeholder="请选择" size="small" disabled>
            <el-option
              v-for="item in proLimit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-select v-model="cityvalue" multiple placeholder="请选择" size="small" disabled>
            <el-option
              v-for="item in cityLimit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li>
          <label class="numLimit">
            <span></span>数据量
          </label>
          <el-input size="small" placeholder="" v-model="labelName" :disabled="true"></el-input>
        </li>
        <li>
          <label for>
            <span></span>创建时间
          </label>
          <el-input size="small" placeholder="" v-model="labelName" :disabled="true"></el-input>
        </li>
        <li class="btnWraps">
          <el-button type="primary" size="medium" @click="handleBack">返回</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      labelScren: "",
      labelName: "",
      proLimit: [
        
      ],
      cityLimit: [
      ],
      provincevalue: [],
      cityvalue: []
    };
  },
  methods: {
    handleBack() {
       this.$router.push({ name: "realtimeLabel" });
    }
  },
  created() {

  }
};
</script>

<style scoped>
.itemLists > li {
  list-style: none;
  margin-bottom: 15px;
}
.itemLists .el-input {
  width: 420px;
}
.itemLists .el-textarea {
  width: 420px;
  vertical-align: top;
}
.screas {
  margin-left: 32px;
}
.btnWraps {
  text-align: right;
  padding-right: 50px;
}
.numLimit{
    margin-left: 16px;
}
</style>
