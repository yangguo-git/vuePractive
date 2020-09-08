<template>
  <div id="mydraft">
    <model-head :head-name="headName"></model-head>
    <div class="draftHeader">
      <ul>
        <li>
          <label for>工单编号</label>
          <el-input size="small" placeholder="请输入工单编号" v-model="planName"></el-input>
        </li>
        <li class="number_li">
          <label for>计划名称</label>
          <el-input size="small" placeholder="请输入计划名称" v-model="planNumber"></el-input>
        </li>
        <li class="number_li">
          <label for>计划编号</label>
          <el-input size="small" placeholder="请输入计划编号" v-model="planBian"></el-input>
        </li>
        <li class="selectPart">
          <label for>计划类型</label>
          <el-select v-model="typeValue" placeholder="请选择" size="small">
            <el-option v-for="item in planType" :key="item.key" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </li>
         <li class="selectPart">
          <label for>触点类型</label>
          <el-select v-model="chutypeValue" placeholder="请选择" size="small" @change="changeContactType">
            <el-option v-for="item in channelTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </li>
        
        <li class="selectPart province_li">
          <label for>省份</label>
          <el-select v-model="provinceValue" placeholder="请选择" size="small" @change="changeProvince">
            <el-option v-for="item in provinceArr" :key="item.chopgroupCode" :label="item.groupname" :value="item.chopgroupCode"></el-option>
          </el-select>
        </li>
        <li class="selectPart city_li">
          <label for>地市</label>
          <el-select v-model="cityValue" placeholder="请选择" size="small" :disabled="cityData.length===0">
            <el-option v-for="item in cityData" :key="item.chopgroupCode" :label="item.groupname" :value="item.chopgroupCode"></el-option>
          </el-select>
        </li>
        <li class="selectPart">
          <label for class="channels">渠道</label>
          <el-select v-model="channelValue" placeholder="请选择" size="small" @change="changeChannel" :disabled="chuDianType.length===0">
            <el-option v-for="item in chuDianType" :key="item.oneLevelChannelCode" :label="item.oneLevelChannelName" :value="item.oneLevelChannelCode"></el-option>
          </el-select>
        </li>
        <li class="selectPart">
          <label for>二级渠道</label>
          <el-select v-model="twochannelValue" placeholder="请选择" size="small" :disabled="twoChannelType.length===0">
            <el-option v-for="item in twoChannelType" :key="item.channelCode" :label="item.channelName" :value="item.channelCode"></el-option>
          </el-select>
        </li>
        <li class="btnsWraps">
          <el-button type="primary" size="small" @click="searchData">查询</el-button>
        </li>
      </ul>
    </div>

    <div class="draftBody">
      <div>
        <el-table :data="tableData" style="width: 100%" tooltip-effect="light"  row-key="id" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          empty-text="暂无草稿">
          <el-table-column prop="workOrderNo" label="工单编号" width="180" show-overflow-tooltip 
            :formatter="planFormat">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">{{ scope.row.workOrderNo }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="marketingTitle" label="计划名称"></el-table-column>
          <el-table-column prop="marketingPlayId" label="计划编号"></el-table-column>
          <el-table-column prop="type" label="计划类型" :formatter="typeFormat"></el-table-column>
          <el-table-column prop="provinceCode" label="省份" :formatter="proFormatter" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="cityCode" label="地市" :formatter="cityFormatter" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="oneLevelChannelCode" label="渠道" :formatter="channelFormat"></el-table-column>
          <el-table-column prop="channelCode" label="二级渠道" :formatter="twochannelFormat"></el-table-column>
          <el-table-column prop="contactorType" label="触点类型" :formatter="chudianFormat"></el-table-column>
          <el-table-column prop="operationCode" label="所属页面" :formatter="postiFormat" show-overflow-tooltip ></el-table-column>
          <el-table-column prop="title" label="活动名称"></el-table-column>
          <el-table-column prop="status" label="申请状态" :formatter="statusFormat" width="150"></el-table-column>
        </el-table>
      </div>
      <!-- 分页 paging -->
      <div class="pageListWrap">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage"
          :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total" background></el-pagination>
      </div>
      <!-- 分页 paging -->
    </div>
  </div>
</template>
<script>
  import ModelHead from '../commonModel/modelHead'
  import lib from '../../axios/api/lib'
  import MyList from "../../axios/api/myListApi";

  export default {
    components: {
      ModelHead
    },
    data() {
      return {
        headName: '触点投放管理-我的草稿',
        tableData: [],
        planName: "",
        planNumber: "",
        planBian: '',
        planType: [{
            value: "",
            label: "请选择"
          },
          {
            value: "1",
            label: "活动"
          },
          {
            value: "2",
            label: "广告"
          },
          {
            value: "3",
            label: "单品"
          },
          {
            value: "4",
            label: "店铺"
          }
        ],
        saveTableChannels:[],
        cityData: [],
        channelTypes: [],
        twoChannelType: [],
        chuDianType: [],
        typeValue: "",
        provinceValue: "",
        cityValue: "",
        channelValue: "",
        twochannelValue: "",
        chutypeValue: "",
        pagination: {
          pageSizes: [10, 20, 30, 50],
          pageSize: 10,
          total: 0,
          currentPage: 0
        },
        childrenArrs: []
      };
    },
    methods: {
      changeContactType(val){
        for (let item of this.channelTypes){
          if (item.value===val){
            this.chuDianType=item.children;
            break;
          }
        }
      },
      async load(tree, treeNode, resolve) {
        var postObjs = {
          id: tree.id
        };
        let labelsListData = await MyList.getChildDraft(postObjs);
        if (labelsListData !== false) {
          this.childrenArrs = [];
          this.childrenArrs = labelsListData;
          resolve(this.childrenArrs)
        }
        
      },
      changeProvince(val) {
        this.cityData = [];
        this.cityValue = "";
        for (let item of this.provinceArr) {
          if (item.chopgroupCode === val && item.children.length !== 0) {
            this.cityData = item.children;
            return false;
          }
        }
      },
      async changeChannel(val) { //切换渠道
        if (val==="02"){
          let resultData = await MyList.getDoorChannel({oneLevelChannelCode:val});
          if (resultData!==false){
            this.twoChannelType=resultData;
          }
        }else{
          this.twoChannelType = [];
          this.twochannelValue = '';
        }

      },
      handleClick(row) {
        this.$router.push({
          name: "dragdetail",
          params: {
            marketingCode:row.marketingPlayId,
            rowId:row.id
          }
        });
      },
      handleSizeChange(size) { //分页操作
        this.pagination.pageSize = size; //每页下拉显示数据
        this.searchData();
      },
      handleCurrentChange: function(currentPage) {
        this.pagination.currentPage = currentPage; //点击第几页
        this.searchData();
      },
      async searchData() { //查询
        //条件
        let draftObj = {
          work: 0,
          type: Number(this.typeValue) || '',
          provinceCode: this.provinceValue,
          cityCode: this.cityValue,
          oneLevelChannelCode: this.channelValue,
          channelCode: this.twochannelValue,
          contactorType: this.chutypeValue,
          marketingTitle: this.planNumber,
          workOrderNo: this.planName,
          marketingPlayId: this.planBian,
          page: this.pagination.currentPage,
          limit: this.pagination.pageSize
        };
        let labelsListData = await MyList.getListData(draftObj);
        if (labelsListData !== false) {
          this.tableData = labelsListData.list;
          this.pagination.total = labelsListData.total;
          this.pagination.currentPage = labelsListData.pageNum;
        }

      },
      typeFormat(row, column, cellValue) {
        if (cellValue == 1) {
          return "活动";
        } else if (cellValue == 2) {
          return "广告";
        } else if (cellValue == 3) {
          return "单品";
        } else if (cellValue == 4) {
          return "店铺";
        } else if (cellValue == '' || cellValue == null) {
          return "--";
        }
      },
      chudianFormat(row, column, cellValue) {
        if (cellValue == 1) {
          return "ICON";
        } else if (cellValue == 2) {
          return "BANNER";
        } else if (cellValue == 3) {
          return "弹窗";
        } else if (cellValue == 4) {
          return "浮窗";
        } else if (cellValue == 5) {
          return "广告";
        } else if (cellValue == '' || cellValue == null) {
          return "--";
        }
      },
      postiFormat(row, column, cellValue) {
        if (cellValue == '' || cellValue == null) {
          return "--";
        } else {
          return cellValue;
        }

      },
      planFormat(row, column, cellValue) {
        if (cellValue == '' || cellValue == null) {
          return "--";
        } else {
          return cellValue;
        }
      },
      statusFormat(row, column, cellValue) {
        
        if (cellValue == '' || cellValue == null) {
          return '--';
        } else { 
          if(cellValue == 6){//创建投放计划
            var strblock = <span><i class="points"></i>创建投放计划</span>;
          }else if(cellValue == 7){//创建变更计划
            var strblock = <span><i class="points"></i>创建变更计划</span>;
          }
          return strblock;
        }
      },
      channelFormat(row, column, cellValue) {
        if (cellValue == '01') {
          return "10086APP";
        } else if (cellValue == '02') {
          return "微门户";
        }else if (cellValue == '03') {
          return "支付宝生活号";
        }else if (cellValue == '04') {
          return "支付宝小程序";
        } else if (cellValue == "" || cellValue == null) {
          return "无";
        }
      },
      twochannelFormat(row, column, cellValue) {
        let allChannel = this.saveTableChannels;
        let channerStr = '';
        allChannel.forEach(objs => {
          if (cellValue == objs.infoKey) {
            channerStr = objs.infoValue;
          } else if (cellValue == null || cellValue == '') {
            channerStr = '--';
          }
        })
        return channerStr;

      },
      proFormatter(row, column, cellvalue) {
        let provinceName = [];
        let provinceArr = this.$store.state.provinceArr;
        if (cellvalue == null || cellvalue == '') {
          return '--'
        } else {
          cellvalue.split(",").forEach(value => {
            provinceArr.forEach((item) => {
              if (item.chopgroupCode === value) {
                provinceName.push(item.groupname);
              } else if (item.children) {
                item.children.forEach(childItem => {
                  if (childItem.chopgroupCode === value) {
                    provinceName.push(item.groupname);
                  }
                });
              }
            })
          });
          return provinceName.join(",")

        }
      },
      cityFormatter(row, column, cellvalue) {
        let lastReturn = [];
        let parentCode = row.provinceCode;
        let cityNames = [];
        let citystr = '';
        let provinceArrs = this.$store.state.provinceArr;
        provinceArrs.forEach(function(objs) {
          if (objs.chopgroupCode == parentCode) {
            cityNames = objs.children;
          }
        })
        //循环地市
        if(cellvalue == null || cellvalue == ''){
           citystr = '--';
        }else{
          if (cityNames) {
            if (cityNames.length == 0) {
              citystr = '--';
            } else {
              if(cellvalue == parentCode+"00"){//全省
                  citystr = '全省';
              }else{
                  cellvalue.split(",").forEach(value => {
                    for (let item of cityNames) {
                      if (item.chopgroupCode === value) {
                        lastReturn.push(item.groupname);
                        return false;
                      }
                    }
                })
                citystr = lastReturn.join(",");
              }
            }
          }

        }
        return citystr;
      }
    },
    computed: {
      provinceArr() {
        return this.$store.state.provinceArr;
      }
    },
    async created() {
      //获取触点类型
      let resultData=await MyList.getAllchannels();
      if (resultData!==false){
        this.channelTypes=resultData;
        console.log(this.channelTypes)
      }
      //获取二级渠道
      let channelDatas = await MyList.getChannels();
      if (channelDatas !== false) {
        this.saveTableChannels = channelDatas;
      }
      //列表
      let draftObj = {
        work: 0
      };
      let labelsListData = await MyList.getListData(draftObj);
      if (labelsListData !== false) {
        this.tableData = labelsListData.list;
        this.pagination.total = labelsListData.total;
        this.pagination.currentPage = labelsListData.pageNum;
      }


    },
    mounted() { 

    }


  };
</script>

<style scoped>
.points{
  height: 6px;
  width: 6px;
  border: 1px solid #d0d6d9;
  border-radius: 50%;
  display: inline-block;
  background: #FFC822;
}
  .city_li {
    margin-left: 27px;
  }

  .province_li {
    margin-left: 28px;
  }

  .number_li {
    margin-left: 3px;
  }

  .draftHeader {
    margin-top: 10px;
  }

  .draftHeader ul>li {
    list-style: none;
    display: inline-block;
    margin-bottom: 15px;
    margin-right: 15px;
  }

  .draftHeader .el-input {
    width: 149px;
  }

  .selectPart .el-select {
    width: 150px;
  }

  .channels {
    margin-left: 31px;
  }

  .btnsWraps {
    margin-left: 20px;
  }

  .btnsWraps button {
    padding-left: 25px;
    padding-right: 25px;
  }

  .pageListWrap {
    text-align: right;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .el-tooltip__popper {
    background-color: red;
  }

  #mydraft {
    margin-left: 10px;
  }
</style>



// WEBPACK FOOTER //
// src/components/myList/myDraft.vue