<template>
  <div id="privateLabel">
    <div class="mainsTop">
      <ul class="searchForm">
        <li>
          <label for>标签名称:</label>
          <el-input size="small" placeholder="请输入" v-model="labelName" :validate-event = "judge" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' }]"></el-input>
        </li>
        <li class="timeWrap">
          <label for>创建时间:</label>
          <el-date-picker
            size="small"
            v-model="startValue"
            type="datetime"
            placeholder="请选择开始时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions0"
          ></el-date-picker>
          <em>—</em>
          <el-date-picker
            size="small"
            v-model="endValue"
            type="datetime"
            placeholder="请选择结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions1"
          ></el-date-picker>
        </li>
        <li class="selectPart">
          <label for>开放范围:</label>

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
        <li class="btnsWraps">
          <el-button type="primary" size="small" @click="searchList">查询</el-button>
          <el-button type="primary" size="small" @click="createLables">创建自有标签</el-button>
        </li>
      </ul>
    </div>
    <div class="mainTable">
      <div>
        <el-table :data="tableData" style="width: 100%" border size="small" v-loading="listLoading">
          <el-table-column
            prop="date"
            label="标签名称"
            width="150"
            show-overflow-tooltip
            tooltip-effect="light"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="描述"
            width="120"
            show-overflow-tooltip
            tooltip-effect="light"
          ></el-table-column>
          <el-table-column prop="address" label="数据量"></el-table-column>
          <el-table-column prop="address" label="开放范围"></el-table-column>
          <el-table-column prop="address" label="创建人"></el-table-column>
          <el-table-column prop="address" label="创建时间"></el-table-column>
          <el-table-column prop="address" label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDele(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 paging -->
        <div class="pageListWrap">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 20, 50]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100"
          ></el-pagination>
        </div>
        <!-- 分页 paging -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      judge:true,
      labelName: "",
      startValue: "",
      endValue: "",
      pickerOptions0: {
        disabledDate: time => {
          if (this.endValue) {

            var getThisTime = this.endValue;
            getThisTime = getThisTime.replace(/-/g, "/");
            //var endstimes = new Date(getThisTime).getTime();
            var endstimes = Date.parse(getThisTime);

            return time.getTime() > endstimes;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions1: {
        disabledDate: time => {
          if (this.startValue) {
            debugger
            var getThisTime = this.startValue;
            getThisTime = getThisTime.replace(/-/g, "/");
            //var begintimes = new Date(getThisTime).getTime();
            var begintimes = Date.parse(getThisTime);
            return time.getTime() < begintimes;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎王小虎王小虎",
          address: "上海市"
        },
        {
          date: "2016-05-04",
          name: "王小虎王小虎王小虎",
          address: "上海"
        },
        {
          date: "2016-05-01",
          name: "王小虎王小虎王小虎",
          address: "上海市"
        }
      ],
      showData: [],
      total: 0,
      pageSize: 10,
      listLoading: false,
      currentPage4: 1
    };
  },
  methods: {
    handleEdit() {
      //编辑
    },
    handleDele() {
      //删除

      this.$confirm("确认要删除改标签吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(
              "http://www.phonegap100.com/appapi.php?a=getPortalList&catid=20&page=1"
            )
            .then(response => {
              console.log(response.data.result);
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {});
    },
    handleClick(row) {
      //查看
      console.log(row);
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
    showTable(currentPage, pageSize) {},
    createLables() {
      this.$router.push({ name: "createLabel" });
    },
    searchList() {
      //查询数据
      // this.$message({
      //   message: "你选择的查询条件是" + this.labelName + this.startValue,
      //   type: "warning"
      // });
      console.log(this.$validator);
    }
  },
  created() {
    //this.getUsers();
    //this.showTable(this.currentPage, this.pageSize);
  }
};
</script>

<style scoped>
.searchForm > li {
  list-style: none;
  display: inline-block;
}
.searchForm .el-input {
  width: 140px;
}
.timeWrap .el-input {
  width: 180px;
}
.selectPart .el-select {
  width: 150px;
}
.btnsWraps {
  margin-left: 15px;
}
.mainsTop {
  margin-bottom: 30px;
}
.pageListWrap {
  text-align: right;
  margin-top: 20px;
}
</style>
