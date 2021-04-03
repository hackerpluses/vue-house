<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.username" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户名" />
      <el-input v-model="listQuery.userId" clearable class="filter-item" style="width: 200px;" placeholder="请输入用户Id" />
      <el-input v-model="listQuery.mobile" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label="用户ID" prop="id" sortable />

      <el-table-column align="center" label="用户昵称" prop="nickname" />

      <el-table-column align="center" label="用户头像" width="80">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.avatar" />
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号码" prop="mobile" />

      <el-table-column align="center" label="性别" prop="gender">
        <template slot-scope="scope">
          <el-tag>{{ genderDic[scope.row.gender] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="生日" prop="birthday" />

      <el-table-column align="center" label="用户等级" prop="userLevel">
        <template slot-scope="scope">
          <el-tag>{{ levelDic[scope.row.userLevel] }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" prop="status">
        <template slot-scope="scope">
          <el-tag>{{ statusDic[scope.row.status] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleDetail(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDetail(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <!-- 用户编辑对话框 -->
    <el-dialog :visible.sync="userDialogVisible" title="用户编辑">
      <el-form ref="userDetail" :model="userDetail" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userDetail.username" :disabled="true" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="userDetail.nickname" />
        </el-form-item>
        <el-form-item label="用户密码" prop="mobile">
          <el-input v-model="userDetail.password" />
        </el-form-item>
        <el-form-item label="用户手机" prop="mobile">
          <el-input v-model="userDetail.mobile" />
        </el-form-item>
        <el-form-item label="用户性别" prop="gender">
          <el-select v-model="userDetail.gender" placeholder="请选择"><el-option v-for="item in genderDic" :key="item" :label="item" :value="admin" /></el-select>
        </el-form-item>
        <el-form-item label="用户等级" prop="userLevel">
          <el-select v-model="userDetail.userLevel" placeholder="请选择"><el-option v-for="item in levelDic" :key="item" :label="item" :value="admin" /></el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="userDetail.status" placeholder="请选择"><el-option v-for="item in statusDic" :key="item" :label="item" :value="admin" /></el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAdminUpdate">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getEmployees, updateEmployee } from '@/api/person'
import Pagination from '@/components/Pagination'

export default {
  name: 'User',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        username: undefined,
        mobile: undefined,
        userId: undefined,
        sort: 'add_time',
        order: 'desc'
      },
      downloadLoading: false,
      genderDic: ['未知', '男', '女'],
      levelDic: ['普通管理员', '高级管理员', '超级管理员'],
      statusDic: ['可用', '禁用', '注销'],
      userDialogVisible: false,
      userDetail: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getEmployees().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDetail(row) {
      this.userDetail = JSON.parse(JSON.stringify(row))
      this.userDialogVisible = true
    },
    handleAdminUpdate() {
      updateEmployee(this.userDetail)
        .then((response) => {
          this.userDialogVisible = false
          this.$notify.success({
            title: '成功',
            message: '更新用户成功'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    }
  }
}
</script>
