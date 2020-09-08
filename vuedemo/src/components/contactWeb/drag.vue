<template>
  <div class="orderDetail">
    <div class="headContent">
      <h3>我的待办-工单详情</h3>
      <div>
        <el-button type="normal" size="small" @click="handleBack">返回</el-button>
        <el-button type="primary" size="small" @click="handleSave">保存</el-button>
        <el-button type="primary" size="small" @click="handleCommit">提交</el-button>
      </div>
    </div>
    <!-- 步骤 -->
    <div class="scrollPart">
    <div class="stepWrap">
      <el-steps :active="activeSteps" align-center>
        <el-step :title="task.taskName" v-for="task in getTaskSteps" :key="task.taskId">
           <i class="iconfont icon-buzhouyi" slot="icon"></i>
        </el-step>
      </el-steps>
    </div>
    <!-- 表单 -->
    <div class="formWrap">
      <el-form ref="form" :model="formDetail" :rules="rules">
        <ul class="itemLists">
          <el-form-item label="工单编号" required prop="orderNum">
            <el-input size="small" placeholder v-model="formDetail.orderNum" maxlength="20" disabled></el-input>
          </el-form-item>
          <el-form-item label="计划编号" required prop="planNum">
            <el-input size="small" placeholder v-model="formDetail.planNum" maxlength="20" disabled></el-input>
            <!-- <el-button type="primary" size="small" @click="choosePlan">选择</el-button> -->
          </el-form-item>

          <el-form-item label="省份" required class="proWraps" prop="provincevalue">
            <multiple-select :options="formDetail.proLimit" :selected-value.sync="formDetail.provincevalue" label="groupname"
              value="chopgroupCode" placeholder="请选择省份" :clearable="true" @change="provinceChange" disabled></multiple-select>

          </el-form-item>

          <el-form-item label="地市"  class="proCityWraps">
            <multiple-select :options="formDetail.cityLimit" :selected-value.sync="formDetail.cityvalue" label="groupname"
              value="chopgroupCode" placeholder="请选择地市"  disabled @change="cityChange"
              :clearable="true"></multiple-select>

          </el-form-item>
          <el-form-item label="计划名称" required prop="planName">
            <el-input size="small" v-model="formDetail.planName" maxlength="30" placeholder="请输入投放计划名称，不超过30个字" disabled></el-input>
          </el-form-item>

          <el-form-item label="计划描述" required prop="planScren">
            <el-input type="textarea" :rows="2" placeholder="请输入投放计划描述，不超过500个字" v-model="formDetail.planScren"
              maxlength="500" disabled></el-input>
          </el-form-item>

          <el-form-item label="收益预估" required prop="valPrepate">
            <el-input type="number" v-model="formDetail.valPrepate" placeholder="请输入收益预估" min="0" size="small" disabled></el-input>
          </el-form-item>

          <el-form-item label="计划类型" required class="planTypeWraps" prop="planClass">
            <el-select  value="" v-model="formDetail.planClass" placeholder="请选择" size="small" disabled>
              <el-option v-for="item in formDetail.planClassArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="投放时间" required class="timeWraps">
            <el-form-item class="beginBox" prop="startValue">

            <el-date-picker size="small" v-model="formDetail.startValue" type="datetime" placeholder="请选择开始时间"
              value-format="yyyy-MM-dd HH:mm:ss" :picker-options="formDetail.pickerOptions0" disabled></el-date-picker>
              </el-form-item>
            <em>——</em>
             <el-form-item class="endBox" prop="endValue">
            <el-date-picker size="small" v-model="formDetail.endValue" type="datetime" placeholder="请选择结束时间"
              value-format="yyyy-MM-dd HH:mm:ss" :picker-options="formDetail.pickerOptions1" disabled></el-date-picker>
               </el-form-item>

          </el-form-item>

          <el-form-item label="客户群" required class="groupsCustoer" prop="customerGroup">
            <el-input size="small" placeholder v-model="formDetail.customerGroup" maxlength="20" disabled></el-input>
          </el-form-item>

          <el-form-item label="选择触点类型" required class="chooseChudian" prop="contactType">
            <el-select v-model="formDetail.contactType" placeholder="请选择" size="small" disabled>
              <el-option v-for="item in formDetail.contactTypeArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择渠道" required class="chooseTypeWrap" prop="contactChannel">
            <el-select v-model="formDetail.contactChannel" placeholder="请选择" size="small" multiple @change="handleChange" disabled>
              <el-option v-for="item in formDetail.contactChannelArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

        </ul>
      </el-form>
    </div>
    <!-- 微门户 -->
    <banner-vue v-if="doorflags" :bannerForms = bannerForms ref="dooBannerDom" @postParents = 'getChildsdata' showFlag = "1" :getProArr = getProArr></banner-vue>
    <!-- app -->
    <app-banner class="appbanner" v-if="appFlags" :appForms = "appForms"   ref="appBannerDom" @postappParents='getAppChildsdata' showFlag = "1" :getProArr = getProArr></app-banner>
    <!--支付宝生活号  -->
    <alipay-banner class="alipayBanner" v-if="alipayFlags" :alipayForms = "alipayForms" ref="alipayBannerDom" @postalipayParents='getalipayChildsdata' showFlag = "1" :getProArr = getProArr></alipay-banner>
    <!-- 支付宝小程序 -->
    <minipro-banner class="miniBanner" v-if="miniFlags" :miniproForms = "miniproForms" ref="miniBannerDom" @postminiProParents='getminiproChildsdata' showFlag = "1" :getProArr = getProArr></minipro-banner>
    <!-- 增加 -->
    <div class="specialBtn">
      <!-- <el-button type="primary" size="medium"><i class="el-icon-plus"></i>增加渠道触点配置</el-button> -->
    </div>

    <!-- 当前处理操作 -->
    <operpart-vue class="operBanner" v-if="operFlages"  ref="operOption"  :postStatus = 'postOperPart'></operpart-vue>

    <!-- 流程处理意见 -->
    <opernote-vue class="detailBanner" :allOptions = "describesData"></opernote-vue>
    <!-- 弹窗 -->
    <el-dialog title="下一环节" :visible.sync="dialogFormVisible" center width="30%" class="detailWrap">

      <div v-if="listArrFlag">
          <p>请选择审核人</p>
          <el-radio-group v-model="radioPerson" class="radiosWraps">
              <el-radio :label="items.email" v-for="items in radioList" :key="items.email">{{items.name}}</el-radio>
          </el-radio-group>
      </div>
      <div v-else>
        <h3 style="text-align: center;">{{resultPubs}}</h3>
      </div>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCommitCheck">提交</el-button>
      </div>
    </el-dialog>

    <!-- 选择计划编号 -->
    <el-dialog title="选择计划编号" :visible.sync="dialogVisible" v-if="dialogVisible" width="50%">
      <choose-plan-num :dialog-visible.sync="dialogVisible" :plan-item.sync="formDetail.planNum"></choose-plan-num>
    </el-dialog>
    </div>
  </div>
</template>
<script>
  import BannerVue from "./banner"
  import AppBanner from "./appBanner"
  import AlipayBanner from "./alipayBanner"
  import MiniproBanner from "./miniproBanner"
  import OperpartVue from "./operPart"
  import OpernoteVue from "./operNote"
  import ChoosePlanNum from "../createContactPlan/choosePlanNum";
  import MultipleSelect from "../commonModel/multipleSelect";
  import MyList from "../../axios/api/myListApi";

  export default {
    data() {
      let rulePass = {
        formInputPass: (rule, value, callback) => {
          if (this.$lodash.trim(value) === "") {
            return callback(new Error(" "))
          } else {
            return callback();
          }

        },
        provinceCodePass: (rule, value, callback) => {
          let provinceCode = this.formDetail.provincevalue;
          if (value.length === 0 || (value.length > 1 && value.indexOf("000") > -1)) {
            return callback(new Error(" "));
          } else {
            callback();
          }
        },
        cityCodePass: (rule, value, callback) => {
          let provinceCode = this.formDetail.provincevalue;
          if (this.formDetail.cityLimit.length > 0) {
            if ((value.length === 0) || (value.length > 2 && value.indexOf(provinceCode[0] + "00") > -1)) {
              return callback(new Error(" "));
            } else {
              callback();
            }
          }else{
            callback();
          }
        },
        selectChoosePass:(rule, value, callback) => {
          if (value == "") {
            return callback(new Error(" "));
          } else {
            callback();
          }
        }
      };
      return {
        rules: {
          orderNum: [{validator: rulePass.formInputPass, required: true}],
          planNum: [{validator: rulePass.formInputPass, required: true}],
          provincevalue: [{validator: rulePass.provinceCodePass, required: true}],
          //cityvalue: [{validator: rulePass.cityCodePass, required: true}],
          planName: [{validator: rulePass.formInputPass, required: true}],
          planScren: [{validator: rulePass.formInputPass, required: true}],
          valPrepate: [{validator: rulePass.formInputPass, required: true}],
          customerGroup:[{validator: rulePass.formInputPass, required: true}],
          contactType: [{validator: rulePass.selectChoosePass, required: true}],
          contactChannel: [{validator: rulePass.selectChoosePass, required: true}],
          startValue: [{validator: rulePass.formInputPass, required: true}],
          endValue: [{validator: rulePass.formInputPass, required: true}]
        },
        taskSteps:[{
          taskName:"发起人",
          taskId:1
        },
        {
          taskName:"分省审核",
          taskId:2
        },{
          taskName:"总部审核",
          taskId:3
        },{
          taskName:"发布",
          taskId:4
        },{
          taskName:"管理员处理",
          taskId:5
        },{
          taskName:"结束流程",
          taskId:9
        }],
        getTaskSteps:[],
        activeSteps:1,
        appFlags:false,
        alipayFlags:false,
        miniFlags:false,
        doorflags:false,
        bannerForms:'',
        appForms:'',
        alipayForms:'',
        miniproForms:'',
        formDetail: {
          customerGroup: "",
          orderNum: "",
          planNum: '',
          proLimit: this.$store.state.provinceArr,
          provincevalue: [],
          cityvalue: [],
          cityLimit: [],
          planName: "",
          planScren: "",
          valPrepate: "",
          planClass: "",
          planClassArr: [{
            label: "日常投放计划",
            value: 1
          }, {
            label: "部门级投放计划",
            value: 2
          }, {
            label: "集团或公司级投放计划",
            value: 3
          }],
          startValue: "",
          endValue: "",
          pickerOptions0: {
            disabledDate: time => {
              if (this.formDetail.endValue) {
                return time.getTime() > this.formDetail.endValue;
              } else {
                return time.getTime() > Date.now();
              }
            }
          },
          pickerOptions1: {
            disabledDate: time => {
              if (this.formDetail.endValue) {
                return time.getTime() < this.formDetail.startValue;
              }
              return time.getTime() < Date.now();
            }
          },
          contactType: '',
          contactTypeArr: [],
          contactChannel: [],
          contactChannelArr: []
        },
        dialogVisible: false,
        radioPerson: '',
        radioList:[],
        options: "",
        dialogFormVisible: false,
        describesData:[],
        listArrFlag:false,
        resultPubs:'',
        postOperPart:'',
        operFlages:false
      };
    },
    components: {
      BannerVue,
      OperpartVue,
      OpernoteVue,
      ChoosePlanNum,
      MultipleSelect,
      AppBanner,
      AlipayBanner,
      MiniproBanner

    },
    methods: {
      async handleCommitCheck(){
        debugger
        console.log(this.optionsId);//1 提交  2 驳回
        let auditUser,auditUserName;
        if(this.saveCheckPeople.length == 0){//无审核人
            if(this.inforCheck == 4){//发布
              auditUser = 'system';
              auditUserName = 'system';
            }else if(this.inforCheck == 1){//发起人
              auditUser = this.creatorId;
              auditUserName = this.creator;
            }
        }else{
          if(this.radioPerson == ''){
            this.$message({
              message: "请选择审核人!",
              type: "warning"
            });
            return;
          }else{
              for(let evePeo of this.saveCheckPeople){
              if(evePeo.email == this.$lodash.trim(this.radioPerson)){
                auditUser = evePeo.email;
                auditUserName = evePeo.name;
              }
            }
          }
        }
        let playId = this.playId;
        let flowId = this.flowId;//流程id 
        let flowType = this.saveTaskdata.flowType;// 流程类型（1：总部流程 2：分省流程）
        let flowStatus = this.saveTaskdata.status;//当前审核人员节点状态 
        let workType = Number(this.$refs.operOption.opinionVal);//1：提交 2：驳回 11：提交结束 12：驳回管理员
        let remark = this.saveRemark;
        let checkObj = {
          auditUser,
          auditUserName,
          flowId,
          playId,
          flowType,
          flowStatus,
          workType,
          remark
        }
        var checkResult = await MyList.commitChecks(checkObj);
        if(checkResult !== false){
          this.$message({
            message: "提交成功!",
            type: "success"
          });
          this.dialogFormVisible = false;
          this.$router.push({
            path: "/waitmain"
          });
        }else{
          this.$message({
            message: "提交失败!",
            type: "error"
          });
          this.dialogFormVisible = false;
        }

      },
      getChildsdata(data){ //获取微门户banner
        this.doorbannerChildData = data;
      },
      getAppChildsdata(data){//获取APPbanner
        this.AppbannerChildData = data;
      },
      getalipayChildsdata(data){ 
         this.alipaybannerChildData = data;
      },
      getminiproChildsdata(data){
        this.minibannerChildData = data;
      },
      handleChange(data){//渠道多选
      
      },
      handleBack() {
        this.$router.push({
          path: "/waitmain"
        });
      },
      async handleSave(isCommit) { //保存 6666
          for(let objs of this.commitJudge){
            if(objs.oneLevelChannelCode == '02'){
              if(!this.$refs.dooBannerDom.bannerSaveFlag){
                this.$message({
                  message: "请先保存微门户banner触点配置区域",
                  type: "warning"
                });
                return;
              }
            }else if(objs.oneLevelChannelCode == '01'){
              if(!this.$refs.appBannerDom.appbannerSaveFlag){
                  this.$message({
                    message: "请先保存10086APP触点配置区域",
                    type: "warning"
                  });
                  return;
                }
              
            }else if(objs.oneLevelChannelCode == '03'){
              if(!this.$refs.alipayBannerDom.alipaybannerSaveFlag){
                  this.$message({
                    message: "请先保存支付宝生活号触点配置区域",
                    type: "warning"
                  });
                  return;
                }

            }else if(objs.oneLevelChannelCode == '04'){
              if(!this.$refs.miniBannerDom.minibannerSaveFlag){
                  this.$message({
                    message: "请先保存支付宝小程序触点配置区域",
                    type: "warning"
                  });
                  return;
                }

            }
          }

          let getOptions = this.$refs.operOption.desc;
          this.saveRemark = getOptions;
          let getOptionsId = this.$refs.operOption.opinionVal;
          this.optionsId = getOptionsId;
          if(getOptions == ''){
            this.$message({
              message: "处理意见必填",
              type: "warning"
            });
            return;
          }

        this.$refs.form.validate(async valid => {
            if (valid) {
              let postPro = (this.formDetail.provincevalue).join(",");
              let postCitro = (this.formDetail.cityvalue).join(",");
              //公共数据
              let marketingPlay = {
                id:this.playId,
                workOrderNo:this.formDetail.orderNum,
                marketingPlayId:this.formDetail.planNum,
                provinceCode:postPro,
                cityCode:postCitro,
                marketingTitle:this.formDetail.planName,
                marketingDesc:this.formDetail.planScren,
                profitEstimate:this.formDetail.valPrepate,
                type:this.formDetail.planClass,
                startTime:this.formDetail.startValue,
                endTime:this.formDetail.endValue,
              }
              //渠道
              let channel = [];
              var alreadyChoseChannels = this.formDetail.contactChannel;
              var saveChoseFirstChannel = [];
              for(var objChannel of alreadyChoseChannels){
                  if(objChannel == 1){
                      saveChoseFirstChannel.push('01');
                  }else if(objChannel == 2){
                     saveChoseFirstChannel.push('02');
                  }else if(objChannel == 3){
                     saveChoseFirstChannel.push('03');
                  }else if(objChannel == 4){
                     saveChoseFirstChannel.push('04');
                  }
              }
              //提交数据
              channel.push({
                marketingPlayDbId:this.marketings.id,
                marketingPlayId:this.marketings.marketingPlayId,
                oneLevelChannelCode:saveChoseFirstChannel.join(","),
                contactorType:this.formDetail.contactType,
              })
              //客户群
              let customer = {
                id:this.saveCustomers.id,
                marketingPlayDbId:this.saveCustomers.marketingPlayDbId,
                marketingPlayId:this.saveCustomers.marketingPlayId,
                customerLabelInclude:this.includeLabel,
                customerLabelExclude:this.excludeLabel
              }
              //单个触点
              let advertising = [];
              //微门户触点信息
              let doorBannerDatas = this.doorbannerChildData;
              if(doorBannerDatas){
                 advertising.push(doorBannerDatas);
              }
              //appbaner触点信息
              let appBannerDatas = this.AppbannerChildData;
              if(this.AppbannerChildData){
                 advertising.push(appBannerDatas);
              }
              //支付宝生活号
              let alipayBannerDatas = this.alipaybannerChildData;
              if(alipayBannerDatas){
                 advertising.push(alipayBannerDatas);
              }
              //支付宝小程序
              let miniBannerDatas = this.minibannerChildData;
              if(miniBannerDatas){
                 advertising.push(miniBannerDatas);
              }

              let allPostData = {
                channel,
                customer,
                marketingPlay,
                advertising
              };
              console.log(allPostData,'ele');
              var saveReponse = await MyList.lastSaveAlldatas(allPostData);
              if(saveReponse !== false){
                if(isCommit !== 1){
                  this.$message({
                    message: "保存成功!",
                    type: "success"
                  });
                  
                  this.$router.push({
                    path: "/waitmain"
                  });
                }
                
              }else{
                if(isCommit !== 1){
                  this.$message({
                    message: "保存失败!",
                    type: "error"
                  });
                }
              }
              //获取下一审核人
              if(isCommit == 1){
                debugger
                  var checkObj = {
                    flowId:this.flowId,
                    flowType:this.flowType,
                    workType:Number(getOptionsId)
                  }
                  console.log(checkObj,'审核人接口')
                  var getPeople = await MyList.nextCheckpeople(checkObj);
                  if (getPeople !== false) {
                    var peopleLists = getPeople.chopUserList;
                    this.saveCheckPeople = peopleLists;//存储审核人
                    this.inforCheck = getPeople.workCode;
                    if(peopleLists.length == 0){
                        this.listArrFlag = false;
                        this.resultPubs = getPeople.workName;
                    }else{
                        this.radioList = peopleLists;
                        this.radioPerson = peopleLists[0].email;
                        this.listArrFlag = true;
                        this.resultPubs = '';
                    }
                  }
                  this.dialogFormVisible = true;//展示弹窗
              }
              
            } else {
              this.$message({
                message: "配置信息未填写完整！",
                type: "error"
              })
            }
          })
      },
      provinceChange(item) { //省份地市选择
        this.formDetail.cityLimit = [];
        this.formDetail.cityvalue = [];
        if (item.length === 1) {
          this.getCity(item[0])
        } else {
          if (item.indexOf("000") > -1) {
            this.$message({
              message: "全网与分省无法同时选择!",
              type: "error",
              duration: 1000
            });

          }
        }
      },
      cityChange(item) {
        if (item.length > 1) {
          for (let value of item) {
            if (value.length > 3) {
              this.$message({
                message: "全省与地市无法同时选择!",
                type: "error"
              });
              return false;
            }
          }
        }
      },
      //获取对应地市
      getCity(code) {
        let provinceArr = this.formDetail.provinceArr || this.$store.state.provinceArr;
        for (let value of provinceArr) {
          if (value.chopgroupCode === code && value.children.length !== 0) {
            this.formDetail.cityLimit = [{
              groupname: "全省",
              chopgroupCode: value.chopgroupCode + "00"
            }, ...value.children];
            return false;
          }
        }
      },
      async handleCommit() {
        this.handleSave(1);
      },
      choosePlan() {
        this.dialogVisible = true;
      }
    },
    async created(){
      let marketingId = this.$route.params.rowId;
      let marketingCode = this.$route.params.marketingCode;
      this.markId = marketingId;
      let searcParams = {
        id:marketingId
      }
      //请求获取渠道
      let getAllchanel = await MyList.getAllchannels();
      if (getAllchanel !== false) {
          this.saveChuDiandatas = getAllchanel;
          var fuzhiChuDian = [];
          for(var obj of getAllchanel){
            fuzhiChuDian.push({
               value: obj.value,
               label: obj.label
            })
            this.formDetail.contactTypeArr = fuzhiChuDian;
          }
      }
      //刷新
      if(marketingId){
      let ListdetailData = await MyList.waitlistDetail(searcParams);//获取详情

      if (ListdetailData !== false) {//6666
          var firstPlan = ListdetailData.marketingPlay;//公共数据
          var secondCustomer = ListdetailData.customer;//客户群数据

          var thirdChannel =ListdetailData.channel;//渠道相关  可有多个
          var fourAadvertisingVo  =ListdetailData.advertisingVo;//触点配置相关数据  可有多个

          var stepData =  ListdetailData.currentTask;//进度条数据
          this.saveTaskdata = ListdetailData.currentTask;//存储
          this.postOperPart = ListdetailData.currentTask;
          this.operFlages = true;
          this.describesData = ListdetailData.describes.childNodeList;//操作描述数据
          //投放计划数据回显
          this.flowId = firstPlan.auditWorkOrderNo;
          this.creator = firstPlan.creator;
          this.creatorId = firstPlan.creatorId;
          this.playId = firstPlan.id;
          this.formDetail.orderNum = firstPlan.workOrderNo;//工单编号
          this.formDetail.planNum = firstPlan.marketingPlayId;//计划编号
          var getProArr = firstPlan.provinceCode.split(",");
          this.getProArr = getProArr;
          this.marketings = ListdetailData.marketingPlay;

          if(firstPlan.cityCode != null){
              var getCityArr = firstPlan.cityCode.split(",");
          }else{
            var getCityArr = [];
          }
          this.getCity(firstPlan.provinceCode);//获取地市数据
          this.formDetail.provincevalue = getProArr;//省份 
          this.formDetail.cityvalue = getCityArr;//地市
          this.formDetail.planName = firstPlan.marketingTitle;//计划名称
          this.formDetail.planScren = firstPlan.marketingDesc;//计划描述
          this.formDetail.valPrepate = firstPlan.profitEstimate;//收益预估
          this.formDetail.planClass = firstPlan.typeLevel;//计划类型
          this.formDetail.startValue = MyList.getTime(firstPlan.startTime);//开始
          this.formDetail.endValue = MyList.getTime(firstPlan.endTime);//结束
          //触点配置 渠道配置
          if(ListdetailData.channel.length == 0){
            this.formDetail.contactType = "";
            this.formDetail.contactChannel =[];
          }else{
            this.formDetail.contactType = ListdetailData.channel[0].contactorType;//触点类型
            for(var items of this.saveChuDiandatas){
               if(this.formDetail.contactType == items.value ){ 
                  var newArray = [];
                  if(items.children.length == 0){
                      this.formDetail.contactChannelArr = newArray;
                  }else{
                    for(var doms of items.children){
                          newArray.push({
                            value: Number(doms.oneLevelChannelCode),
                            label: doms.oneLevelChannelName
                          })
                    }
                    this.formDetail.contactChannelArr = newArray;
                  }

               }

            }
            var postArrs = [];
            var backShowChannel = ListdetailData.channel[0].oneLevelChannelCode;
            if(backShowChannel !== ''){
              backShowChannel.split(",").forEach(objs=>{
                postArrs.push(Number(objs));
              })
            }
            this.formDetail.contactChannel = postArrs;//渠道
          }
          //存数据
          this.saveGetChannels = ListdetailData.channel;//渠道相关
          this.saveCustomers = ListdetailData.customer;//客户群相关
          
          //客户群
          if(ListdetailData.customer == null || ListdetailData.customer == ''){
             this.formDetail.customerGroup = '';
          }else{
            //客户群包含
            var allCustomer = ListdetailData.customer;
             var includesStr = "";
            if(allCustomer.customerLabelInclude){
              var includes = JSON.parse(allCustomer.customerLabelInclude);
              var includeCollectCodes = [];
              for(var keys in includes){
                includesStr += includes[keys].labelName;
                includeCollectCodes.push({
                  labelCode:includes[keys].labelCode
                })
              }
              this.includeLabel = includeCollectCodes;
            }else{
              this.includeLabel = [];
            }
            //客户群不包含
            var excludesStr = '';
            if(allCustomer.customerLabelExclude){
                var excludes = JSON.parse(allCustomer.customerLabelExclude);
                var excludeCollectCodes = [];
                for(var keys in excludes){
                  excludesStr += excludes[keys].labelName;
                  excludeCollectCodes.push({
                    labelCode:excludes[keys].labelCode
                  })
                }
                this.excludeLabel = excludeCollectCodes;
              }else{
                this.excludeLabel = [];
              }
            this.formDetail.customerGroup = '包含:'+ includesStr + ";不包含:"+ excludesStr;
          }
          //进度条
          if(this.saveTaskdata.flowType == 1){//全网流程
              this.taskSteps.splice(1,1);
              this.getTaskSteps = this.taskSteps;
              this.flowType = 1;
          }else{//分省流程
              this.getTaskSteps = this.taskSteps;
              this.flowType = 2;
          }
          var getCurrentStep = ListdetailData.currentTask.status;
          this.getTaskSteps.forEach((obj,num)=>{
            if(obj.taskId == getCurrentStep){
              this.activeSteps = num + 1;
            }

          })

          //各触点配置区
          var getAllChuDian = ListdetailData.advertisingVo;//数组
          this.commitJudge = ListdetailData.advertisingVo;
          ListdetailData.advertisingVo.forEach((obj,inx)=>{
            if(obj.oneLevelChannelCode == '02'){//微门户banner
               this.bannerForms = obj;
               this.doorflags = true;
            }else if(obj.oneLevelChannelCode == '01'){//appbanner
               this.appForms = obj;
               this.appFlags = true;
            }else if(obj.oneLevelChannelCode == '03'){//支付宝生活号
               this.alipayForms = obj;
               this.alipayFlags = true;
            }else if(obj.oneLevelChannelCode == '04'){//支付宝小程序
               this.miniproForms = obj;
               this.miniFlags = true;
            }

          })
          //流程处理意见表
          var getAllOptions = ListdetailData.describes;
        }
      }

    }
  };
</script>

<style scoped>
@media screen and (max-width: 1600px){
    .work-order-detail-body{
      min-height: 540px;
    }
}
  /* 固定 */
  .scrollPart{
    height: 460px;
    overflow-y: scroll;
    padding-bottom: 20px;
    margin-left: 10px;
  }
/* 滚动条样式 */
  .scrollPart::-webkit-scrollbar{
    width: 4px;
    height: 6px;
  }
  .scrollPart::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .scrollPart::-webkit-scrollbar-track {
    border-radius: 0;
    background: #FFFFFF;
  }
.stepWrap{
  padding-top: 20px;
  padding-bottom: 20px;
}
.el-steps /deep/ .is-text{
  width: 19px;
  height: 19px;
}
.iconfont{
  font-size: 17px;

}
.radiosWraps{
  line-height: 20px;
  margin-top: 20px;
}
.beginBox,.endBox{
 display: inline-block;
}
.specialBtn{
    margin-top: 10px;
    margin-bottom: 10px;
}
.stepWrap /deep/ .el-step .is-process{
      color: #C0C4CC;
      border-color: #C0C4CC;
      font-weight: normal;
  }
.appbanner,.alipayBanner,.miniBanner{
  margin-top: 15px;
}
  .multiple-select-body {
    display: inline-block;
    width: 460px;
  }
  /deep/  div.el-textarea{
    width: 30%;
    vertical-align: top;
  }
  .mainPart{
    margin-top: 10px;
  }
  .itemLists .el-form-item {
    margin-bottom: 10px;
  }

  .planTypeWraps .el-select--small {
    width: 460px;
  }

  .chooseTypeWrap .el-select--small {
    width: 460px;
  }

  .chooseChudian .el-select--small {
    width: 460px;
  }

  .detailWrap /deep/ .el-dialog__header {
    text-align: left;
    border-bottom: 1px solid #d0d6d9;
  }
  #timeWrap .el-input {
    width: 210px;
  }

  .headContent h3 {
    display: inline-block;
    margin-left: 10px;
  }

  .headContent {
    height: 50px;
    border-bottom: 1px solid #dcdcdc;
  }

  .headContent div {
    float: right;
    margin-right: 10px;
  }
 .formWrap /deep/ .el-form-item__label{
   width: 140px;
  }
  .formWrap ul>li {
    list-style: none;
    margin-bottom: 15px;
  }

  .itemLists .el-input {
    width: 460px;
  }

  .timeWraps .el-date-editor {
    width: 210px;
  }

  .itemLists .el-textarea {
    width: 460px;
    vertical-align: top;
  }

  .itemType div.el-select {
    width: 195px;
  }
</style>



// WEBPACK FOOTER //
// src/components/myList/waitDetail.vue