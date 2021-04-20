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
      <el-button type="primary" @click="handleAdd">添加雇员</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>
      <el-table-column align="center" width="80px" label="用户ID" prop="id" sortable />
      <el-table-column align="center" label="账号" prop="username" />
      <el-table-column align="center" label="姓名" prop="nickname" />
      <el-table-column align="center" label="用户头像" prop="avatar" width="80">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号码" prop="phone" />
      <el-table-column align="center" label="性别" prop="gender">
        <template slot-scope="scope">
          <el-tag>{{ genderDic[scope.row.gender] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" width="200" label="上次登录时间" prop="lastLoginTime" />
      <el-table-column align="center" label="雇员角色" prop="roleIds" width="150">
        <template slot-scope="scope">
          <el-tag v-for="roleId in scope.row.categoryIds" :key="roleId" type="primary" style="margin-right: 20px;"> {{ formatRole(roleId) }} </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="isOnService">
        <template slot-scope="scope">
          <el-tag>{{ statusDic[String(Number(scope.row.isOnService))] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="info" icon="el-icon-more" circle @click="handleMore(scope.row)" />
          <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)" />
          <el-button type="danger" icon="el-icon-delete" circle @click="handleEmployeeDelete(scope.row)" />
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
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="userDetail.nickname" :readonly="true" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="userDetail.phone" :readonly="true" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="userDetail.age" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="userDetail.gender" placeholder="请选择" disabled><el-option v-for="(item, index) in genderDic" :key="index" :label="item" :value="index" /></el-select>
        </el-form-item>
        <el-form-item label="详细介绍" prop="detail">
          <el-input v-model="userDetail.detail" type="textarea" :readonly="true" />
        </el-form-item>
        <el-form-item label="雇员角色" prop="categoryIds">
          <el-select v-model="userDetail.categoryIds" multiple placeholder="请选择" disabled>
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="服务中" prop="isOnService">
          <el-switch v-model="userDetail.isOnService" disabled />
        </el-form-item>
        <el-form-item label="服务地址" prop="serviceAddress">
          <el-cascader
            v-model="userDetail.serviceAddress"
            :options="serviceAddressOptions"
            :props="{ expandTrigger: 'hover', label:'name', value:'name', multiple:true}"
            style="width:300px"
            disable
          />
        </el-form-item>
        <el-form-item label="最后上线时间" prop="lastLoginTime">
          <el-input v-model="userDetail.lastLoginTime" :readonly="true" />
        </el-form-item>
        <el-form-item label="籍贯" prop="birthplace">
          <el-input v-model="userDetail.birthplace" :readonly="true" />
        </el-form-item>
        <el-form-item label="教育水平" prop="education">
          <el-input v-model="userDetail.education" :readonly="true" />
        </el-form-item>
        <el-form-item label="薪水" prop="salary">
          <el-input v-model="userDetail.salary" :readonly="true" />
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-tag
            v-for="item in userDetail.keywords"
            :key="item"
            :label="item"
            :value="item"
          >
            {{ item }}
          </el-tag>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-avatar :size="50" :src="userDetail.avatar" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idNum">
          <el-input v-model="userDetail.idNum" :readonly="true" />
        </el-form-item>
        <el-form-item label="身份证照片" prop="idCardPicUrl">
          <el-avatar :size="50" :src="userDetail.idCardPicUrl" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userMoreDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 用户编辑对话框 -->
    <el-dialog :visible.sync="userEditDialogVisible" title="用户编辑">
      <el-form ref="userDetail" :model="userDetail" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="账号" prop="username">
          <el-input v-model="userDetail.username" :readonly="true" />
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="userDetail.nickname" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="userDetail.phone" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="userDetail.age" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="userDetail.gender" placeholder="请选择"><el-option v-for="(item, index) in genderDic" :key="index" :label="item" :value="index" /></el-select>
        </el-form-item>
        <el-form-item label="详细介绍" prop="detail">
          <el-input v-model="userDetail.detail" type="textarea" />
        </el-form-item>
        <el-form-item label="雇员角色" prop="categoryIds">
          <el-select v-model="userDetail.categoryIds" multiple placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="服务中" prop="isOnService">
          <el-switch v-model="userDetail.isOnService" />
        </el-form-item>
        <el-form-item label="服务地址" prop="serviceAddress">
          <el-cascader
            v-model="userDetail.serviceAddress"
            :options="serviceAddressOptions"
            :props="{ expandTrigger: 'hover', label:'name', value:'name', multiple:true}"
            style="width:300px"
            clearable
          />
        </el-form-item>
        <el-form-item label="籍贯" prop="birthplace">
          <el-input v-model="userDetail.birthplace" />
        </el-form-item>
        <el-form-item label="教育水平" prop="education">
          <el-input v-model="userDetail.education" />
        </el-form-item>
        <el-form-item label="薪水" prop="salary">
          <el-input v-model="userDetail.salary" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userDetail.password" />
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-tag
            v-for="tag in userDetail.keywords"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="tagsInputVisible"
            ref="saveTagInput"
            v-model="tagsInputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>
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
        <el-form-item label="身份证号" prop="idNum">
          <el-input v-model="userDetail.idNum" />
        </el-form-item>
        <el-form-item label="身份证照片" prop="idCardPicUrl">
          <el-upload
            class="avatar-uploader"
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="handleICardPicUrlSuccess"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <img v-if="userDetail.idCardPicUrl" :src="userDetail.idCardPicUrl" alt="" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userEditDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEmployeeUpdate">确定</el-button>
      </div>
    </el-dialog>
    <!-- 用户添加对话框 -->
    <el-dialog :visible.sync="userAddDialogVisible" title="用户添加">
      <el-form ref="userDetail" :model="userDetail" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="账号" prop="username">
          <el-input v-model="userDetail.username" />
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="userDetail.nickname" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="userDetail.phone" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="userDetail.age" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="userDetail.gender" placeholder="请选择"><el-option v-for="(item, index) in genderDic" :key="index" :label="item" :value="index" /></el-select>
        </el-form-item>
        <el-form-item label="详细介绍" prop="detail">
          <el-input v-model="userDetail.detail" type="textarea" />
        </el-form-item>
        <el-form-item label="雇员角色" prop="categoryIds">
          <el-select v-model="userDetail.categoryIds" multiple placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="服务中" prop="isOnService">
          <el-switch v-model="userDetail.isOnService" />
        </el-form-item>
        <el-form-item label="服务地址" prop="serviceAddress">
          <el-cascader
            v-model="userDetail.serviceAddress"
            :options="serviceAddressOptions"
            :props="{ expandTrigger: 'hover', label:'name', value:'name', multiple:true}"
            style="width:300px"
            clearable
          />
        </el-form-item>
        <el-form-item label="籍贯" prop="birthplace">
          <el-input v-model="userDetail.birthplace" />
        </el-form-item>
        <el-form-item label="教育水平" prop="education">
          <el-input v-model="userDetail.education" />
        </el-form-item>
        <el-form-item label="薪水" prop="salary">
          <el-input v-model="userDetail.salary" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userDetail.password" />
        </el-form-item>
        <el-form-item label="关键词" prop="keywords">
          <el-tag
            v-for="tag in userDetail.keywords"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="tagsInputVisible"
            ref="saveTagInput"
            v-model="tagsInputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+</el-button>
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
        <el-form-item label="身份证号" prop="idNum">
          <el-input v-model="userDetail.idNum" />
        </el-form-item>
        <el-form-item label="身份证照片" prop="idCardPicUrl">
          <el-upload
            class="avatar-uploader"
            :headers="headers"
            :action="uploadPath"
            :show-file-list="false"
            :on-success="handleICardPicUrlSuccess"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <img v-if="userDetail.idCardPicUrl" :src="userDetail.idCardPicUrl" alt="" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userAddDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEmployeeAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getEmployees, updateEmployee, addEmployee, deleteEmployee, searchEmployee } from '@/api/person'
import Pagination from '@/components/Pagination'
import { uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'
import { roleOptions } from '@/api/category'
import { listRegion } from '@/api/region'

export default {
  name: 'Employee',
  components: { Pagination },
  data() {
    return {
      uploadPath: uploadPath,
      headers: {
        'X-HouseKeeping-Admin-Token': getToken()
      },
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        username: undefined,
        phone: undefined,
        userId: undefined,
        sort: 'insert_time',
        order: 'asc'
      },
      roleOptions: null,
      downloadLoading: false,
      genderDic: ['男', '女'],
      levelDic: ['普通雇员', '高级雇员', '卓越雇员'],
      statusDic: { '1': '正在服务', '0': '空闲' },
      userEditDialogVisible: false,
      userAddDialogVisible: false,
      userMoreDialogVisible: false,
      userDetail: {
        gender: 0,
        userLevel: 0,
        status: 0,
        avatar: '',
        serviceAddress: []
      },
      filterText: '',
      select: '1',
      tagsInputVisible: false,
      tagsInputValue: '',
      // 关于地址级联选择器
      serviceAddressOptions: []
    }
  },
  created() {
    this.getList()
    roleOptions()
      .then(response => {
        this.roleOptions = response.data
      })
    this.getRegions()
  },
  methods: {
    getRegions() {
      listRegion().then(response => {
        this.serviceAddressOptions = response.data
      }).catch(response => {
        this.$notify.error({
          title: '地区加载失败',
          message: response.data.errmsg
        })
      })
    },
    formatRole(roleId) {
      for (let i = 0; i < this.roleOptions.length; i++) {
        if (roleId === this.roleOptions[i].value) {
          return this.roleOptions[i].label
        }
      }
      return ''
    },
    getList() {
      this.listLoading = true
      getEmployees(this.listQuery).then(response => {
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
    },
    handleEmployeeUpdate() {
      updateEmployee(this.userDetail)
        .then(() => {
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
    handleEmployeeAdd() {
      addEmployee(this.userDetail)
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
    handleEmployeeDelete(row) {
      this.userDetail = JSON.parse(JSON.stringify(row))
      deleteEmployee(this.userDetail)
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
      searchEmployee({ id: this.filterText }).then(response => {
        this.list = response.data
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.errmsg
        })
      })
      this.listLoading = false
    },
    handleAvatarSuccess(res) {
      this.$set(this.userDetail, 'avatar', res.data.url)
    },
    handleICardPicUrlSuccess(res) {
      this.$set(this.userDetail, 'idCardPicUrl', res.data.url)
    },
    // 标签处理部分
    handleClose(tag) {
      this.userDetail.keywords.splice(this.userDetail.keywords.indexOf(tag), 1)
    },

    showInput() {
      this.tagsInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const tagsInputValue = this.tagsInputValue
      if (this.userDetail.keywords == null) this.userDetail.keywords = []
      if (tagsInputValue) {
        this.userDetail.keywords.push(tagsInputValue)
      }
      this.tagsInputVisible = false
      this.tagsInputValue = ''
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
