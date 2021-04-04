<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div style="width:600px;display:flex;margin-bottom:20px;">
      <el-input v-model="filterText" placeholder="请输入内容" class="input-with-select">
        <el-select slot="prepend" v-model="select" placeholder="请选择" style="width:130px">
          <el-option label="用户id" value="1" />
          <el-option label="用户姓名" value="2" />
          <el-option label="手机号" value="3" />
        </el-select>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="handleSearch" />
      </el-input>
      <el-button type="primary" @click="handleAddressAdd">添加用户地址</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label="地址ID" prop="id" sortable />

      <el-table-column align="center" min-width="100px" label="用户ID" prop="userId" />

      <el-table-column align="center" min-width="100px" label="用户姓名" prop="name" />

      <el-table-column align="center" min-width="100px" label="手机号码" prop="tel" />

      <el-table-column align="center" min-width="300px" label="区域地址">
        <template slot-scope="scope">
          {{ scope.row.province + scope.row.city + scope.row.county }}
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="300px" label="详细地址" prop="addressDetail" />

      <el-table-column align="center" min-width="80px" label="默认" prop="isDefault">
        <template slot-scope="scope">
          {{ scope.row.isDefault ? '是' : '否' }}
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { getAddressList } from '@/api/customer'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'UserAddress',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        userId: undefined,
        sort: 'insert_time',
        order: 'desc'
      },
      downloadLoading: false,
      filterText: '',
      select: '1'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getAddressList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleAddressAdd() {
      this.$notify.error({
        title: '失败',
        message: '暂时不支持，需要用户在移动端自行添加'
      })
    }
  }
}
</script>
