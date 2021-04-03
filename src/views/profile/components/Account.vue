<template>
  <el-form ref="dataForm" :model="dataForm" :rules="rules">
    <el-form-item label="昵称" prop="name">
      <el-input v-model.trim="dataForm.name" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model.trim="dataForm.email" />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model.trim="dataForm.phone" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateAccount } from '@/api/profile'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          phone: ''
        }
      }
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入内容'))
      } else {
        callback()
      }
    }
    return {
      dataForm: JSON.parse(JSON.stringify(this.user)),
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        email: [
          { pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/, message: '请填写正确的邮箱', trigger: 'blur' }
        ],
        phone: [
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/, message: '请填写正确的手机号码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      this.$refs.dataForm.validate((valid) => {
        if (!valid) {
          return
        }
        updateAccount(this.user).then(() => {
          this.$message({
            message: '信息已经成功更新',
            type: 'success',
            duration: 5 * 1000
          })
        }).catch((res) => {
          this.$message({
            message: '更新失败' + res.errmsg,
            type: 'error',
            duration: 5 * 1000
          })
        })
      })
    }
  }
}
</script>
