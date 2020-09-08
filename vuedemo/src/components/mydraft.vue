<template>
  <div id="mydraft">
    <h4>我的草稿</h4>
    <div class="draftHeader">
      <ul>
        <li>
          <label for>计划名称:</label>
          <el-input size="small" placeholder="请输入" v-model="planName"></el-input>
        </li>
        <li>
          <label for>计划编号:</label>
          <el-input size="small" placeholder="请输入" v-model="planNumber"></el-input>
        </li>
        <li class="selectPart">
          <label for>计划类型:</label>
          <el-select v-model="typeValue" placeholder="请选择" size="small">
            <el-option
              v-for="item in planType"
              :key="item.key"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li class="selectPart">
          <label for>省份:</label>
          <el-select v-model="provinceValue" placeholder="请选择" size="small">
            <el-option
              v-for="item in provinceData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li class="selectPart">
          <label for>地市:</label>
          <el-select v-model="cityValue" placeholder="请选择" size="small">
            <el-option
              v-for="item in cityData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li class="selectPart">
          <label for class="channels">渠道:</label>
          <el-select v-model="channelValue" placeholder="请选择" size="small">
            <el-option
              v-for="item in channelTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li class="selectPart">
          <label for>二级渠道:</label>
          <el-select v-model="twochannelValue" placeholder="请选择" size="small">
            <el-option
              v-for="item in twoChannelType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li class="selectPart">
          <label for>触点类型:</label>
          <el-select v-model="chutypeValue" placeholder="请选择" size="small">
            <el-option
              v-for="item in chuDianType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>
        <li class="btnsWraps">
          <el-button type="primary" size="small" @click="searchData">查询</el-button>
        </li>
      </ul>
    </div>

    <div class="draftBody">
      <div>
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column
            prop="date"
            label="计划名称"
            width="180"
            show-overflow-tooltip
            tooltip-effect="light"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
              >{{ scope.row.date }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="计划编号"></el-table-column>
          <el-table-column prop="planType" label="计划类型" :formatter="typeFormat"></el-table-column>
          <el-table-column prop="address" label="省份"></el-table-column>
          <el-table-column prop="address" label="地市"></el-table-column>
          <el-table-column prop="address" label="渠道"></el-table-column>
          <el-table-column prop="address" label="二级渠道"></el-table-column>
          <el-table-column prop="address" label="触点类型"></el-table-column>
          <el-table-column prop="address" label="触点位置"></el-table-column>
          <el-table-column prop="address" label="活动名称"></el-table-column>
          <el-table-column prop="address" label="活动链接"></el-table-column>
          <el-table-column prop="address" label="申请状态"></el-table-column>
        </el-table>
      </div>
      <!-- 分页 paging -->
      <div class="pageListWrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
      <!-- 分页 paging -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "TradeCode1",
          name: "王小虎",
          address: "河北",
          planType: "1"
        },
        {
          id: 2,
          date: "TradeCode1",
          name: "王小虎",
          address: "北京",
          planType: "2",
          children: [
            {
              id: 21,
              date: "TradeCode1",
              name: "王小虎",
              address: "河南",
              planType: "2"
            },
            {
              id: 22,
              date: "TradeCode1",
              name: "王小虎",
              address: "上海市",
              planType: "2"
            }
          ]
        },
        {
          id: 3,
          date: "TradeCode1",
          name: "王小虎",
          address: "上海市",
          planType: "3"
        }
      ],
      planName: "",
      planNumber: "",
      planType: [
        {
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
      provinceData: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      cityData: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      channelTypes: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "102",
          label: "微门户"
        },
        {
          value: "101",
          label: "10086APP"
        }
      ],
      twoChannelType: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      chuDianType: [
        {
          value: "",
          label: "请选择"
        },
        {
          value: "1",
          label: "BANNER"
        }
      ],
      typeValue: "",
      provinceValue: "",
      cityValue: "",
      channelValue: "",
      twochannelValue: "",
      chutypeValue: "",
      currentPage4: 1
    };
  },
  methods: {
    handleClick(row) {
      //this.$message(row.date);
      this.$router.push({ name: "orderdetail",query:{currentNum:1}});
    },
    handleSizeChange: function(size) {
      this.pageSize = size;
      console.log(this.pageSize); //每页下拉显示数据
      this.showTable(this.currentPage, this.pageSize);
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.showTable(this.currentPage, this.pageSize);
    },
    searchData() {
      //点击查询
      if (
        this.typeValue == "" &&
        this.provinceValue == "" &&
        this.cityValue == "" &&
        this.channelValue == "" &&
        this.twochannelValue == "" &&
        this.chutypeValue == "" &&
        this.planName == "" &&
        this.planNumber == ""
      ) {
        this.$message({
          message: "请至少填写、选择一个搜索条件",
          type: "warning"
        });
        return;
        console.log("222222");
      }
    },
    typeFormat(row, column, cellValue) {
      //字段转义 index console.log(row, column, cellValue);
      if (cellValue == 1) {
        return "活动";
      } else if (cellValue == 2) {
        return "广告";
      } else if (cellValue == 3) {
        return "单品";
      } else {
        return "店铺";
      }
    }
  }
};
</script>

<style scoped>
.draftHeader ul > li {
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
}
.el-tooltip__popper {
  background-color: red;
}
</style>

