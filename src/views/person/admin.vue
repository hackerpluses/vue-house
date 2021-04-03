<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div style="width:600px;display:flex;margin-bottom:20px;">
      <el-input v-model="filterText" placeholder="请输入内容" class="input-with-select">
        <el-select slot="prepend" v-model="select" placeholder="请选择" style="width:130px">
          <el-option label="id" value="1" />
          <el-option label="用户名" value="2" />
          <el-option label="手机号" value="3" />
        </el-select>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="handleSearch" />
      </el-input>
      <el-button type="primary" @click="handleAdd">添加管理员</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="80px" label="用户ID" prop="id" sortable />
      <el-table-column align="center" label="账号" prop="username" />
      <el-table-column align="center" label="用户昵称" prop="nickname" />
      <el-table-column align="center" label="用户头像" prop="avatar" width="80">
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
      <el-table-column align="center" width="260" label="上次登录时间" prop="lastLoginTime" />
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
      <el-table-column align="center" label="操作" width="200px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="info" icon="el-icon-more" circle @click="handleMore(scope.row)" />
          <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)" />
          <el-button type="danger" icon="el-icon-delete" circle @click="handleAdminDelete(scope.row)" />
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 用户详情对话框 -->
    <el-dialog :visible.sync="userMoreDialogVisible" title="用户详情">
      <el-form ref="userDetail" :model="userDetail" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="账号" prop="username">
          <el-input v-model="userDetail.username" :readonly="true" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="username">
          <el-input v-model="userDetail.nickname" :readonly="true" />
        </el-form-item>
        <el-form-item label="用户手机" prop="mobile">
          <el-input v-model="userDetail.mobile" :readonly="true" />
        </el-form-item>
        <el-form-item label="用户性别" prop="gender">
          <el-select v-model="userDetail.gender" placeholder="请选择" disabled><el-option v-for="(item, index) in genderDic" :key="index" :label="item" :value="index" /></el-select>
        </el-form-item>
        <el-form-item label="用户等级" prop="userLevel">
          <el-select v-model="userDetail.userLevel" placeholder="请选择" disabled><el-option v-for="(item, index) in levelDic" :key="index" :label="item" :value="index" /></el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="userDetail.status" placeholder="请选择" disabled><el-option v-for="(item, index) in statusDic" :key="index" :label="item" :value="index" /></el-select>
        </el-form-item>
        <el-form-item label="最后上线时间" prop="lastLoginTime">
          <el-input v-model="userDetail.lastLoginTime" :readonly="true" />
        </el-form-item>
        <el-form-item label="最后上线ip" prop="lastLoginIp">
          <el-input v-model="userDetail.lastLoginIp" :readonly="true" />
        </el-form-item>
        <el-form-item label="头像" prop="username">
          <el-avatar :size="50" :src="userDetail.avatar" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userMoreDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 用户编辑对话框 -->
    <el-dialog :visible.sync="userEditDialogVisible" title="用户编辑">
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
          <el-select v-model="userDetail.gender" placeholder="请选择"><el-option v-for="(item, index) in genderDic" :key="index" :label="item" :value="index" /></el-select>
        </el-form-item>
        <el-form-item label="用户等级" prop="userLevel">
          <el-select v-model="userDetail.userLevel" placeholder="请选择"><el-option v-for="(item, index) in levelDic" :key="index" :label="item" :value="index" /></el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="userDetail.status" placeholder="请选择"><el-option v-for="(item, index) in statusDic" :key="index" :label="item" :value="index" /></el-select>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <img v-if="userDetail.avatar" :src="userDetail.avatar" alt="" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userEditDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAdminUpdate">确定</el-button>
      </div>
    </el-dialog>
    <!-- 用户添加对话框 -->
    <el-dialog :visible.sync="userAddDialogVisible" title="用户添加">
      <el-form ref="userDetail" :model="userDetail" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userDetail.username" />
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
          <el-select v-model="userDetail.gender" placeholder="请选择"><el-option v-for="(item, index) in genderDic" :key="index" :label="item" :value="index" /></el-select>
        </el-form-item>
        <el-form-item label="用户等级" prop="userLevel">
          <el-select v-model="userDetail.userLevel" placeholder="请选择"><el-option v-for="(item, index) in levelDic" :key="index" :label="item" :value="index" /></el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="userDetail.status" placeholder="请选择"><el-option v-for="(item, index) in statusDic" :key="index" :label="item" :value="index" /></el-select>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <img v-if="userDetail.avatar" :src="userDetail.avatar" alt="" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userAddDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAdminAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAdmins, updateAdmin, addAdmin, deleteAdmin, searchAdmin } from '@/api/person'
import Pagination from '@/components/Pagination'
import { uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'

export default {
  name: 'Admin',
  components: { Pagination },
  data() {
    return {
      uploadPath: uploadPath,
      headers: {
        'X-Hoursekeeping-Admin-Token': getToken()
      },
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        username: undefined,
        mobile: undefined,
        userId: undefined,
        sort: 'insert_time',
        order: 'desc'
      },
      downloadLoading: false,
      genderDic: ['未知', '男', '女'],
      levelDic: ['普通管理员', '高级管理员', '超级管理员'],
      statusDic: ['可用', '禁用', '注销'],
      userEditDialogVisible: false,
      userAddDialogVisible: false,
      userMoreDialogVisible: false,
      userDetail: {
        gender: 0,
        userLevel: 0,
        status: 0,
        avatar: ''
      },
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
      getAdmins(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      }).finally(() => { this.listLoading = false })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleMore(row) {
      this.userDetail = JSON.parse(JSON.stringify(row))
      this.userMoreDialogVisible = true
    },
    handleEdit(row) {
      this.userDetail = JSON.parse(JSON.stringify(row))
      this.userEditDialogVisible = true
    },
    handleAdd() {
      // this.userDetail = JSON.parse(JSON.stringify(row))
      this.userAddDialogVisible = true
      console.log(this.userDetail)
    },
    handleAdminUpdate() {
      updateAdmin(this.userDetail)
        .then((response) => {
          this.userDialogVisible = false
          this.$notify.success({
            title: '成功',
            message: '更新用户成功'
          })
          this.userEditDialogVisible = false
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    handleAdminAdd() {
      addAdmin(this.userDetail)
        .then((response) => {
          this.userDialogVisible = false
          this.$notify.success({
            title: '成功',
            message: '添加用户成功'
          })
          this.userAddDialogVisible = false
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    handleAdminDelete(row) {
      this.userDetail = JSON.parse(JSON.stringify(row))
      deleteAdmin(this.userDetail)
        .then((response) => {
          this.userDialogVisible = false
          this.$notify.success({
            title: '成功',
            message: '删除用户成功'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.errmsg
          })
        })
    },
    handleSearch() {
      this.listLoading = true
      if (this.filterText.length < 1) { this.getList(); return }
      searchAdmin({ id: this.filterText }).then(response => {
        this.list = response.data
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      }).finally(() => { this.listLoading = false })
    },
    handleAvatarSuccess(res, file) {
      this.$set(this.userDetail, 'avatar', res.data[0].url)
    }
  }
}
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
