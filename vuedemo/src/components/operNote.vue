<template>
  <div class="opintionTable">
    <!-- 操作详情区 -->
    <h4>流程处理意见列表</h4>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="操作人"></el-table-column>
        <el-table-column prop="name" label="环节名称"></el-table-column>
        <el-table-column prop="address" label="处理结果"></el-table-column>
        <el-table-column prop="address" label="操作时间"></el-table-column>
        <el-table-column prop="address" label="操作描述"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市"
        }
      ]
    };
  }
};
</script>


<style  scoped>
.opintionTable h4{
 margin-right: 10px;
  margin-bottom: 10px;
}
</style>