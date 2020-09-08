<template>
  <div id="new">
    <h3>这个是新闻页面</h3>
    <hr />
    <h6>编程导航跳转页面测试</h6>

    <button @click="goMovie()">点击跳转到电影</button>

    <button @click="goMovie2()">点击跳转到电影方式二</button>

    <button @click="goMovie3()">携带参数跳转</button>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
    <ul>

    
      <el-form-item  label="电话号码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" :maxlength="11" placeholder clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
     
      <el-button @click="resetForm('ruleForm')">重置</el-button>
      </ul>
    </el-form>

     <el-button type="primary" @click="submitForm()">提交</el-button>

    <!-- <el-steps :active="1">
      <el-step title="1">
        <i class="iconfont icon-buzhouyi" slot="icon"></i>
      </el-step>
      <el-step title="2"> <i class="iconfont icon-buzhouyi" slot="icon"></i> </el-step>
      <el-step title="3"> <i class="iconfont icon-buzhouyi" slot="icon"></i> </el-step>
      <el-step title="4"> <i class="iconfont icon-buzhouyi" slot="icon"></i> </el-step>
      <el-step title="5"> <i class="iconfont icon-buzhouyi" slot="icon"></i> </el-step>
    </el-steps>-->

    <!-- <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1">
        <i class="iconfont icon-buzhouyi" slot="icon"></i>
              </el-step>
              <el-step title="步骤 2">
        <i class="iconfont icon-buzhouyi" slot="icon"></i>
              </el-step>
              <el-step title="步骤 3">
        <i class="iconfont icon-buzhouyi" slot="icon"></i>
      </el-step>
    </el-steps>

    <i class="iconfont iconbuzhou"></i>
    <span></span> -->

    <div class="stepWrap">
      <el-steps :active="2" align-center :space="150">
        <el-step title="创建投放计划" >
           <i class="iconfont icon-buzhouyi" slot="icon"></i>
        </el-step>
        <el-step title="分省审核" >
           <i class="iconfont icon-buzhouyi" slot="icon"></i>
        </el-step>
        <el-step title="总部审核" >
           <i class="iconfont icon-buzhouyi" slot="icon"></i>
        </el-step>
        <el-step title="发布" >
           <i class="iconfont icon-buzhouyi" slot="icon"></i>
        </el-step>
        <el-step title="发起人确认" >
           <i class="iconfont icon-buzhouyi" slot="icon"></i>
        </el-step>
        <el-step title="流程结束" >
           <i class="iconfont icon-buzhouyi" slot="icon"></i>
        </el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(" "));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(" "));
      } else {
        callback();
      }
    };
    
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        phoneNum: "",
        active:2
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm() {
      var ls = new Date().getTime();
      console.log(ls);
      var lss = new Date(121323223223);
      console.log(lss)
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

</style>
