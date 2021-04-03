<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :headers="headers"
      :action="uploadPath"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      accept=".jpg,.jpeg,.png,.gif"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>

<script>
import { uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'

export default {
  name: 'Comment',
  data() {
    return {
      uploadPath: uploadPath,
      imageUrl: ''
    }
  },
  computed: {
    headers() {
      return {
        'X-Hoursekeeping-Admin-Token': getToken()
      }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.data[0].url
      // this.imageUrl = URL.createObjectURL(file.raw)
    }
  }
}
</script>

<style>
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
