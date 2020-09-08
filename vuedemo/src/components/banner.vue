<template>
  <div id="createLabel">
    <h4 class="bannerTitle">
      微门户BANNER配置
      <i :class=" isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" @click="handleShow"></i>
    </h4>
    <!-- <transition name="fade"> -->
      <div class="bannerForm" v-if="isShow">
        <ul class="itemLists">
          <li>
            <label for>
              <span class="requireColor">*</span>活动名称
            </label>
            <el-input size="small" placeholder="请输入标签名称,不超过20个字" v-model="datas.name" maxlength="20"></el-input>
          </li>
          <li>
            <label class="screas">
              <span class="requireColor">*</span>活动描述
            </label>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="datas.age"
              maxlength="100"
            ></el-input>
          </li>

          <li>
            <label class="imgsBox">
              <span class="requireColor">*</span>banner图片地址
            </label>
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <span class="fileWraps">
                <i slot="default" class="el-icon-plus"></i>
              </span>
            </el-upload>
            <p class="advice">
              <span>建议图片大小尺寸为750*180,大小小于100KB</span>
              <el-button type="text">重新上传</el-button>
            </p>
            <p class="advice">
              <el-button type="text">查看设计规范</el-button>
              <el-button type="text">下载设计模板</el-button>
            </p>
          </li>

          <li id="jumpUrl">
            <label class="screas">
              <span class="requireColor">*</span>跳转链接
            </label>
            <el-select v-model="provincevalue" placeholder="请选择" size="small">
              <el-option
                v-for="item in proLimit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>

            <el-input
              id="addLimit"
              size="small"
              placeholder="请输入标签名称,不超过20个字"
              v-model="labelName"
              maxlength="20"
            ></el-input>
          </li>

          <li>
            <label class="screas">
              <span class="requireColor">*</span>选择渠道
            </label>

            <el-input size="small" placeholder="请输入标签名称,不超过20个字" v-model="labelName" maxlength="20"></el-input>
          </li>

          <li id="choosePage">
            <label class="screas">
              <span class="requireColor">*</span>选择页面
            </label>
            <el-select v-model="provincevalue" placeholder="请选择" size="small">
              <el-option
                v-for="item in proLimit"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>

            <p class="xiaoTip">
              注意：微信小程序渠道暂不支持个人主页和积分查兑页面；
              <br />10086APP渠道仅支持消息回执；10086+小程序首页仅支持在微信小程序渠道生效；10086+小程序首页不支持AB测试；
            </p>
          </li>

          <li id="choosePosttion">
            <label class="screas">
              <span class="requireColor">*</span>选择位置
            </label>
            <el-select v-model="provincevalue" placeholder="请选择" size="small">
              <el-option
                v-for="item in proLimit"
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
        </ul>
        <div class="btnBoxs">
          <el-button type="primary" size="small">保存</el-button>
          <el-button type="primary" size="small">取消</el-button>
        </div>
      </div>
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      toggeleFlag: "el-icon-arrow-up",
      labelScren: "",
      labelName: "",
      startValue: "",
      endValue: "",
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
      proLimit: [
        {
          value: "371",
          label: "河南"
        }
      ],
      cityLimit: [
        {
          value: "371",
          label: "周口"
        }
      ],
      provincevalue: [],
      cityvalue: [],
      fileList: [],
      isShow: true
    };
  },
  methods: {
    handleShow() {
      this.isShow = !this.isShow;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleCancel() {
      this.$router.push({ name: "privateLabel" });
    },
    handleSave() {
      if (this.labelName == "") {
        this.$message({
          message: "请输入标签名",
          type: "warning"
        });
        return;
      } else if (this.labelScren == "") {
        this.$message({
          message: "请输入标签描述",
          type: "warning"
        });
        return;
      } else if (this.provincevalue.length == 0) {
        this.$message({
          message: "请选择发布范围",
          type: "warning"
        });
        return;
      } else if (this.fileList.length == 0) {
        this.$message({
          message: "请上传文件",
          type: "warning"
        });
      }
    }
  },
  created() {},
  props:['datas']
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
#timeWrap .el-input {
  width: 211px;
}
#choosePage .el-select {
  width: 460px;
}
#choosePosttion .el-select {
  width: 460px;
}

.btnBoxs {
  text-align: center;
}
.xiaoTip {
  margin-left: 66px;
}
.imgsBox {
  margin-left: -48px;
}
.fileWraps {
  display: flex;
  width: 458px;
  height: 100px;
  border: 1px dashed #d0d6d9;
}
.fileWraps i {
  margin: auto;
  font-size: 30px;
}
.bannerTitle {
  background-color: #0085d0;
  height: 30px;
  line-height: 30px;
  margin-bottom: 15px;
}
.bannerTitle i {
  float: right;
  margin-top: 5px;
  margin-right: 10px;
  font-size: 20px;
  cursor: pointer;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.bannerForm {
  margin-left: 50px;
}

.itemLists > li {
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
.upload-demo {
  width: 34%;
  display: inline-block;
  vertical-align: top;
}
#jumpUrl div.el-select {
  width: 135px;
}
#jumpUrl div.el-input {
  width: 322px;
}
#addLimit {
  width: 280px;
}
.advice{
  margin-left: 63px;
  margin-top: 0px;
}
</style>
