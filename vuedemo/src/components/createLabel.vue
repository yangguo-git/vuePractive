<template>
  <div id="createLabel">
    <h4>创建自有标签</h4>
    <div>
      <ul class="itemLists">
        <li>
          <label for>
            <span class="requireColor">*</span>标签名称
          </label>
          <el-input size="small" placeholder="请输入标签名称,不超过20个字" v-model="labelName" maxlength="20"></el-input>
        </li>
        <li>
          <label class="screas">
            <span class="requireColor">*</span>描述
          </label>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="labelScren" maxlength="100"></el-input>
        </li>
        <li>
          <label for>
            <span class="requireColor">*</span>开放范围
          </label>

          <el-select v-model="provincevalue" multiple placeholder="请选择" size="small">
            <el-option
              v-for="item in proLimit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-select v-model="cityvalue" multiple placeholder="请选择" size="small">
            <el-option
              v-for="item in cityLimit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li style="position: relative;">
          <label>
            <span class="requireColor">*</span>上传文件
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
            <el-button size="small" type="primary">
              <i class="el-icon-upload"></i>上传
            </el-button>
          </el-upload>
          <el-button type="text" class="downTemp">下载模板</el-button>
        </li>

        <li class="noticeBox">
          <p>
            请注意：单个标签总量不超过1000万条,当个文件大小不超过20M;
            <br />
            <span class="secondLine">系统支持多次上传，自动去重,最多可上传10个文件件</span>
          </p>
        </li>
        <li class="btnWraps">
          <el-button type="primary" size="medium" plain @click="handleCancel">取消</el-button>
          <el-button type="primary" size="medium" @click="handleSave">保存</el-button>
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
        {
          value: "",
          label: "请选择"
        },
        {
          value: "371",
          label: "河南"
        },
        {
          value: "100",
          label: "北京"
        }
      ],
      cityLimit: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "371",
          label: "周口"
        },
        {
          value: "100",
          label: "开封"
        }
      ],
      provincevalue: [],
      cityvalue: [],
      fileList: [
        
      ]
    };
  },
  methods: {
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
      //


    }
  },
  created() {}
};
</script>

<style scoped>
.itemLists > li {
  list-style: none;
  margin-bottom: 15px;
}
.requireColor {
  color: red;
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
.upload-demo {
  width: 29%;
  display: inline-block;
  vertical-align: top;
}
.secondLine {
  margin-left: 55px;
}
.downTemp {
  position: absolute;
  left: 180px;
  top: 0px;
  cursor: pointer;
}
.noticeBox {
  margin-left: 75px;
  font-size: 14px;
}
.btnWraps {
  text-align: right;
  padding-right: 50px;
}
</style>
