<template>
  <div>
    <div style="margin-top: 15px;float:right">
      <el-input v-model="input3" placeholder="请输入内容" class="input-with-select">
        <el-select slot="prepend" v-model="select" placeholder="请选择" style="width:130px">
          <el-option label="顾客姓名" value="3" />
          <el-option label="顾客id" value="5" />
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="handleSearch" />
      </el-input>
    </div>
    <el-table
      :data="tableData"
      :default-sort="{prop: 'date', order: 'descending'}"
      stripe
      style="width: 100%; height: 100%"
    >
      <el-table-column
        fixed
        prop="id"
        label="id"
        width="150"
      />
      <el-table-column
        fixed
        prop="date"
        sortable
        label="顾客名称"
        width="150"
      />
      <el-table-column
        prop="name"
        label="顾客id"
        width="120"
      />
      <el-table-column
        prop="name"
        label="省"
        width="120"
      />
      <el-table-column
        prop="province"
        label="市"
        width="120"
      />
      <el-table-column
        prop="city"
        label="区县"
        width="auto"
      />
      <el-table-column
        prop="city"
        label="详细地址"
        width="auto"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Address',
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      input3: '',
      select: '1'
    }
  },
  methods: {
    handleDelete(index, rows) {
      rows.splice(index, 1)
    },
    handleSearch() {
      console.log(this.input3, this.select)
    }
  }
}
</script>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
