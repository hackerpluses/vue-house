<template>
  <div>
    <el-card class="box-card" body-style="padding:10px 10px 10px 10px;">
      <div slot="header" style="height: 8px;line-height: 8px;font-size: 14px;font-weight: bold;">
        <span />
        <el-button class="filter-item" style="float: right;margin-top: -8px;margin-right: 10px;" type="primary" icon="el-icon-refresh" size="mini" @click="searchReset">重置</el-button>
        <el-button class="danger" type="primary" size="mini" icon="el-icon-search" style="float: right;margin-top: -8px;margin-right: 10px;" @click="query">搜索</el-button>
        <el-input v-model="listQuery.theme" placeholder="请输入考核主题查找" size="mini" style="float: right;margin-top: -8px;margin-right: 10px;width:200px;" />
        <el-select
          v-model="listQuery.type"
          placeholder="请选择试题类型"
          size="mini"
          style="float: right;margin-top: -8px;margin-right: 10px;width:200px;"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="listQuery.degree"
          placeholder="请选择试题等级"
          size="mini"
          style="float: right;margin-top: -8px;margin-right: 10px;width:200px;"
        >
          <el-option
            v-for="item in degreeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="success" size="mini" style="float:left;margin-top: -8px;margin-right: 10px;" @click="handleCreate"><i class="el-icon-plus" />新增试题</el-button>
        <!--删除-->
        <el-button class="filter-item" style="float:left;margin-top: -8px;position: relative;" type="danger" size="mini" icon="el-icon-delete" @click="deleteAll">删除</el-button>
      </div>
      <div>
        <!--试题表格-->
        <el-table
          v-loading="loading"
          :data="testdata"
          row-key="id"
          stripe
          style="width: 100%"
          element-loading-text="拼命加载中..."
          :row-class-name="tableRowClassName"
          @sort-change="tableSortChange"
          @selection-change="tableSelectionChange"
        >
          <el-table-column
            type="selection"
            width="50"
          />
          <el-table-column
            align="center"
            prop="theme"
            label="考核主题"
          />
          <el-table-column
            align="center"
            prop="type"
            label="试题类型"
          />
          <el-table-column
            align="center"
            prop="degree"
            label="试题等级"
          />
          <el-table-column label="操作" fixed="right" align="center" width="300">
            <template slot-scope="scope">
              <el-button type="info" plain size="mini" @click="handleForm(scope.row)"><i class="el-icon-view" />查看</el-button>
              <el-button type="primary" plain size="mini" @click="handleUpdate(scope.row)"><i class="el-icon-edit" />编辑</el-button>
              <el-button type="danger" plain size="mini" @click="handleDelete(scope.row)"><i class="el-icon-delete" />删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="totalTest>0" :total="totalTest" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getTestDataByPage" />

      </div>
    </el-card>
    <!--新增/编辑弹框-->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="resetTemp"
    >
      <el-form ref="temp" :rules="rules" :model="temp" label-width="100px" :disabled="forbidden">
        <el-form-item label="考核主题" prop="theme">
          <el-input v-model="temp.theme" size="small" />
        </el-form-item>
        <el-form-item label="试题类型" prop="type">
          <el-select v-model="temp.type" size="small" placeholder="请选择题目类型" style="width:100%" @change="getTypeState">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="试题等级" prop="degree">
          <el-select v-model="temp.degree" size="small" placeholder="请选择题目等级" style="width:100%">
            <el-option
              v-for="item in degreeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="试题内容" prop="content">
          <div class="bigdiv">
            <el-input v-model="temp.content" type="textarea" :autosize="{ minRows: 8, maxRows:10}" size="small" style="width:60%" />
            <div v-if="currentImage!=null&&currentImage!==''" class="imgblock">
              <el-image class="viewimg" :src="currentImage" />
            </div>
            <el-upload
              ref="upload"
              :headers="headers"
              :action="uploadPath"
              :show-file-list="false"
              style="float: right; padding: 0 1px "
              class="upload-demo"
              list-type="picture-card"
              :on-success="uploadSuccess"
              :on-progress="uploadOnProgress"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.image"
              :before-remove="cancelFile"
              :on-change="changeLoading"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <i class="el-icon-plus avatar-uploader-icon" />
              <div slot="tip" class="el-upload__tip">从本地选取需要上传的图片</div>
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item label="参考答案" prop="solution">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>备选答案
                <el-button style="float: right; padding: 10px 60px" type="text" plain @click="handleAddOption">新增选项</el-button>
              </span>
            </div>
            <el-checkbox-group v-model="checkMany" class="check" style="position: relative" :max="typeState">
              <el-checkbox
                v-for="(item,index) in testOptionList"
                :key="item.enOption"
                :label="item.enOption"
                class="checkrow"
                @change="handleCheckedChange()"
              >
                {{ item.enOption }}: {{ item.optionContent }}
                <el-button type="danger" class="optiondel" size="small" plain @click="delOption(index)">删除</el-button>
                <el-button type="success" class="optionedit" size="small" plain @click="handleEditOption(index)">编辑</el-button>
              </el-checkbox>
            </el-checkbox-group>
          </el-card>
        </el-form-item>
        <el-form-item label="文字解析" prop="analysis">
          <el-input v-model="temp.analysis" type="textarea" :autosize="{ minRows: 6, maxRows:8}" size="small" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" @click="closeDialog">取消</el-button>
        <el-button v-if="dialogStatus==='create'" :loading="Loading" type="success" size="small" @click="createData">确定</el-button>
        <el-button v-if="dialogStatus==='update'" :loading="Loading" type="success" size="small" @click="updateData()">确定</el-button>
      </div>
    </el-dialog>
    <!--选项录入-->
    <el-dialog
      title="选项录入"
      :visible.sync="viewOptionVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form ref="testoption" :model="testoption" label-width="100px">
        <el-form-item label="选项录入" prop="optionContent">
          <div style="margin-top: 15px;">
            <el-input v-model="testoption.optionContent" size="small">
              <template slot="prepend">{{ testoption.enOption }}</template>
            </el-input>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" @click="viewOptionVisible=false">取消</el-button>
        <el-button v-if="optiondialogStatus==='create'" type="success" size="small" :loading="addloading" @click="addOption()">确定</el-button>
        <el-button v-if="optiondialogStatus==='update'" type="success" size="small" :loading="addloading" @click="editOption()">确定</el-button>
      </div>
    </el-dialog>
    <!--查看试题-->
    <el-dialog
      title="查看试题信息"
      :visible.sync="viewTestVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template>
        <table width="100%" class="table">
          <tr>
            <th width="100px">考核主题</th><td>{{ temp.theme }}</td>
          </tr>
          <tr>
            <th width="100px">试题类型</th><td>{{ temp.type }}</td>
          </tr>
          <tr>
            <th width="100px">试题等级</th><td>{{ temp.degree }}</td>
          </tr>
          <tr>
            <th width="100px">试题内容</th><td>{{ temp.content }}</td>
          </tr>
          <tr>
            <th width="100px">试题选项</th>
            <td>
              <span
                v-for="option in temp.optionList"
                :key="option"
              >
                {{ option.enOption }}: {{ option.optionContent }}
                <br>
              </span>
            </td>
          </tr>
          <tr>
            <th width="100px">试题图片</th>
            <td>
              <div v-if="temp.picUrl!=null&&temp.picUrl!==''" class="imgblock">
                <el-image class="viewimg" :src="temp.picUrl" />
              </div>
              <div v-if="temp.picUrl==null||temp.picUrl===''">
                当前试题暂无图片
              </div>
            </td>
          </tr>
          <tr>
            <th width="100px">备选答案</th>
            <td>
              <el-checkbox-group v-model="checkMany" class="check" style="position: relative" :max="typeState">
                <el-checkbox
                  v-for="(item,index) in testOptionList"
                  :key="item.enOption"
                  :label="item.enOption"
                  :value="index"
                  @change="handleCheckedChange()"
                >
                  {{ item.enOption }}: {{ item.optionContent }}
                </el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
          <tr>
            <th width="100px">参考答案</th><td>{{ temp.solution }}</td>
          </tr>
          <tr>
            <th width="100px">答案解析</th><td>{{ temp.analysis }}</td>
          </tr>
        </table>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="viewTestVisible= false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { searchExercise, updateExercise, addExercise, deleteExercise } from '@/api/exercise'
import { uploadPath } from '@/api/storage'
import { getToken } from '@/utils/auth'
import Pagination from '@/components/Pagination'

export default {
  name: 'TestBank',
  components: { Pagination },
  data() {
    return {
      currentImage: '',
      fileList: [],
      imgUrl: '',
      uploadPath: uploadPath, // 上传问题图的后台接口
      downloadUrl: '', // 下载文件的后台接口，64位图可以直接读取
      Loading: false,
      selected: [
      ], // 已选择项
      ids: '',
      listQuery: {
        type: '',
        degree: '',
        theme: '',
        page: 1,
        size: 20,
        sort: 'insert_time',
        order: 'desc'
      },
      forbidden: false,
      totalTest: '',
      testdata: [],
      totalCount: [],
      loading: true,
      dialogFormVisible: false,
      viewTestVisible: false,
      viewOptionVisible: false,
      dialogStatus: '',
      optiondialogStatus: '',
      textMap: {
        update: '编辑试题',
        create: '新增试题'
      },

      /*        degree:'',//放在temp外部防止选项框select不能及时回显
        type:'',//放在temp外部防止选项框select不能及时回显*/

      temp: {
        id: '',
        theme: '', // 试题主题
        type: '', // 试题类型
        degree: '', // 试题等级
        content: '', // 试题内容
        picUrl: '', // 问题图64位
        solution: '', // 试题参考答案
        analysis: '', // 试题解析
        optionList: []
      },

      typeState: 1, // 这里限制单选多选后的选择数量,默认单选
      typeOptions: [
        {
          value: '单选',
          label: '单选'
        },
        {
          value: '多选',
          label: '多选'
        }
      ],

      degreeOptions: [
        {
          value: '初级',
          label: '初级'
        },
        {
          value: '中级',
          label: '中级'
        },
        {
          value: '高级',
          label: '高级'
        }
      ],
      addloading: false,
      checkMany: [], // 参考答案数组
      testoption: {
        id: '',
        enOption: '', // 选项ABCD
        optionContent: ''// 选项内容
      },
      activeIndex: '', // 当前选中的选项index
      testOptionList: [], // 存放当前题目的备选答案列表
      filter: {
        per_page: 20, // 页大小
        page: 1 // 当前页
      },
      rules: {
        theme: [
          { required: true, message: '请输入考核主题', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择试题类别', trigger: 'blur' }
        ],
        degree: [
          { required: true, message: '请输入难度等级', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入考核内容', trigger: 'change' }
        ],
        solution: [
          { required: true, message: '请选择一个参考答案', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    headers() {
      return {
        'X-Hoursekeeping-Admin-Token': getToken()
      }
    }
  },
  mounted: function() {
    this.getTestDataByPage()
  },
  methods: {
    // 搜索的项目
    query() {
      this.filter.page = 1
      this.getTestDataByPage()
    },
    // 重置搜索框
    searchReset() {
      this.keywordsOfType = ''
      this.keywordsOfDegree = ''
      this.keywordsOfTheme = ''
      this.filter.page = 1
      this.getTestDataByPage()
    },
    // 获取试题库列表
    getTestDataByPage() {
      this.loading = true
      const params = this.listQuery
      searchExercise(params).then(response => { // 请求成功
        console.log(response.data.items)
        this.testdata = response.data.records
        this.totalTest = response.data.total
        this.loading = false
      }).catch(() => { // 请求失败
        this.$message.error('错误请求')
        this.loading = false
      }) // 获取访问记录
    },
    /** *****************************************这里是试题选项框************************************************/
    // 录入选项打开
    handleAddOption() {
      this.optiondialogStatus = 'create'
      this.addloading = false
      this.testoption.enOption = String.fromCharCode(65 + this.testOptionList.length)
      this.testoption.optionContent = ''
      this.viewOptionVisible = true
    },
    // 编辑选项打开
    handleEditOption(index) {
      this.optiondialogStatus = 'update'
      this.activeIndex = index
      this.addloading = false
      this.testoption.enOption = this.testOptionList[index].enOption
      this.testoption.optionContent = this.testOptionList[index].optionContent
      this.viewOptionVisible = true
    },
    // 新增选项
    addOption() {
      // this.testoption.id  (Math.random() * 10000000).toString(16).substr(0, 4) + (new Date()).getTime() + Math.random().toString().substr(2, 5)
      this.testoption.id = 0
      this.testOptionList.push(JSON.parse(JSON.stringify(this.testoption)))
      this.viewOptionVisible = false
    },
    // 编辑选项
    editOption() {
      this.testOptionList[this.activeIndex].enOption = this.testoption.enOption
      this.testOptionList[this.activeIndex].optionContent = this.testoption.optionContent
      this.viewOptionVisible = false
    },
    // 删除选项
    delOption(index) {
      this.testOptionList.splice(index, 1)
      // 这里给已有的选项按照ABCD重新赋值
      for (let i = 0; i < this.testOptionList.length; i++) {
        this.testOptionList[i].enOption = String.fromCharCode(65 + i)
      }
      this.checkMany = []// 这里删除选项防止check数组的内容出错，清空重选
    },
    handleCheckedChange() {
      console.log(this.checkMany)
    },
    /** *****************************************这里是试题图片文件************************************************/
    // 上传成功
    uploadSuccess(response) {
      this.currentImage = response.data[0].url
      this.temp.picUrl = response.data[0].url
    },
    // 删除图片
    cancelFile() {
      this.temp.picUrl = ''// 64位图可以直接清空
      this.fileList = []
    },
    changeLoading() {
      this.Loading = this.Loading === false;
    },
    uploadOnProgress(e, file) { // 开始上传的进度
      console.log(e.percent, file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    /** *****************************************这里是试题************************************************/
    getTypeState() {
      if (this.temp.type === '单选') {
        this.typeState = 1
      } else {
        this.typeState = 99
      }
      this.checkMany = []// 这里删除选项防止check数组的内容出错，清空重选
    },
    // 新增试题打开
    handleCreate() {
      this.dialogStatus = 'create'
      this.forbidden = false
      this.fileList = []
      this.temp = {
        id: '',
        theme: '', // 试题主题
        type: '单选', // 试题类型
        degree: '初级', // 试题等级
        content: '', // 试题内容
        picUrl: '', // 问题图64位
        solution: '', // 试题答案
        analysis: '', // 试题解析
        optionList: []
      }
      this.testoption = {
        id: '',
        enOption: '', // 选项ABCD
        optionContent: ''// 选项内容
      }
      this.checkMany = []
      this.testOptionList = []
      this.dialogFormVisible = true
      this.Loading = false
    },

    // 新增试题列表确认提交
    createData() {
      this.Loading = true
      this.temp.optionList = this.testOptionList
      this.temp.solution = this.checkMany.join()
      const postData = JSON.parse(JSON.stringify(this.temp))
      if (this.checkMany === '' || this.checkMany.length < 1) {
        alert('请至少选择一个备选答案作为参考答案')
        this.Loading = false
      } else {
        this.$refs['temp'].validate((valid) => {
          if (valid) {
            addExercise(postData).then(() => {
              this.getTestDataByPage()
              this.dialogFormVisible = false
              this.$message.success('创建试题成功!')
              this.resetTemp()
            }).catch(() => {
              this.dialogFormVisible = false
              this.$message.error('创建试题失败!您没有该操作权限')
            })
            this.dialogFormVisible = false
          } else {
            this.$message.error({ message: '存在输入校验错误!', center: true })
            this.Loading = false
            return false
          }
        })
      }
    },
    // 修改试题打开
    handleUpdate(row) {
      this.dialogFormVisible = true
      this.Loading = false
      this.temp = Object.assign({}, row) // copy obj
      this.currentImage = this.temp.picUrl
      if (this.temp.type === '单选') {
        this.typeState = 1
      } else {
        this.typeState = 99
      }
      this.fileList = []
      this.dialogStatus = 'update'
      this.forbidden = false
      this.testOptionList = JSON.parse(JSON.stringify(this.temp.optionList))
      this.checkMany = this.temp.solution.split(',')
    },
    // 修改试题列表确认提交
    updateData() {
      this.Loading = true
      this.temp.optionList = this.testOptionList
      this.temp.solution = this.checkMany.join()
      if (this.checkMany === '' || this.checkMany.length < 1) {
        alert('请至少选择一个备选答案作为参考答案')
        this.Loading = false
      } else {
        this.$refs.temp.validate((valid) => {
          if (valid) {
            updateExercise(this.temp).then(
              () => { // 请求成功
                this.$message.success({ message: '修改试题成功！', center: true })
                this.dialogFormVisible = false
                this.resetTemp()
                this.getTestDataByPage()
              }).catch(() => { // 请求失败
              this.dialogFormVisible = false
              this.$message.error({ message: '修改试题失败！您没有该操作权限', center: true })
            }
            )
          } else {
            this.$message.error({ message: '存在输入校验错误!', center: true })
            this.Loading = false
            return false
          }
        })
        this.testOptionList = []
      }
    },

    // 查看弹窗
    handleForm(row) {
      this.viewTestVisible = true
      this.temp = Object.assign({}, row) // copy obj
      this.fileList = []
      this.forbidden = true
      this.viewTestVisible = true
    },
    // 重置弹窗
    resetTemp() {
      this.$refs.temp.resetFields()
    },
    // 关闭弹窗
    closeDialog() {
      // this.resetTemp()
      this.dialogFormVisible = false
    },

    // 删除试题
    handleDelete(row) {
      this.ids = row.id
      const params = { ids: [this.ids] }
      this.$confirm('此操作将永久删除该试题, 是否继续?', '提示', { type: 'warning' }).then(() => { // 向请求服务端删除
        deleteExercise(params).then(
          () => { // 请求成功
            this.$message.success('成功删除了试题!')
            this.getTestDataByPage()// 加载属性
          }).catch(() => { // 请求失败
          this.$message.error({ message: '删除试题失败！您没有该操作权限', center: true })
        })
      }).catch(() => {
        this.$message.info('已取消操作!')
      })
    },
    // 删除多条
    deleteAll() {
      this.ids = this.selected.map(item => item.id)
      const params = { ids: this.ids }
      if (this.ids == null || this.ids === '') {
        this.$confirm('请先选择需要删除的选项', '提示', { type: 'warning' })
      } else {
        this.$confirm('此操作将永久删除该试题, 是否继续?', '提示', { type: 'warning' }).then(() => {
          deleteExercise(params).then(() => {
            this.getTestDataByPage()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }).catch(() => { // 请求失败
            this.$message.error({ message: '删除试题失败！您没有该操作权限', center: true })
          })
        })
          .catch(() => {
            this.$message.info('已取消操作!')
          })
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'success-row'
      }
      return ''
    },
    // 选中信息
    tableSelectionChange(val) {
      console.log(val)
      this.selected = val
    },
    tableSortChange(val) {
      console.log(`排序属性: ${val.prop}`)
      console.log(`排序: ${val.order}`)
      if (val.prop != null) {
        if (val.order === 'descending') {
          this.filter.sort = '-' + val.prop
        } else {
          this.filter.sort = '' + val.prop
        }
      } else {
        this.filter.sort = ''
      }
      this.getTestDataByPage()
    },
    // 分页项目
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.filter.per_page = val
      this.getTestDataByPage()
    },
    pageCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.filter.page = val
      this.getTestDatabypage()
    },

    // 检测当前登录用户是否已经过期
    getredirect() {
      var postdata = sessionStorage.getItem('user')
      this.$http.post(this.ApiUrl + '/homes/getRedirect/', postdata, { headers: { Authorization: sessionStorage.getItem('token') }})
        .then(
          function(data) {
            if (data.bodyText === 'outtime') {
              sessionStorage.clear()
              this.$router.push('/login')
              this.$message.success('会话已过期,请您重新登录')
            }
          },
          function(data) {}
        )
    }
  }

}
</script>
<style scoped>
  .viewimg{
    height:100%;
    width:100%
  }
  .imgblock{
    height:146px;
    width:146px;
  }
  .bigdiv{
    display:flex;
    justify-content:space-between;
  }
  .optiondel{
    position: absolute;
    overflow:hidden;
    right:15px;
  }
  .optionedit{
    position: absolute;
    overflow:hidden;
    right:100px;
  }

  .check{
    display:flex;
    justify-content:space-between;
    flex-direction: column;
  }
  .checkrow{
    width:100%
  }
  /*elementUI CSS*/
  .el-row{
    padding-bottom: 10px;
  }
  .el-table .cell{
    line-height: 33px;
  }
  .el-table td{
    padding:0;
  }
  .el-table th{
    padding:0;
  }
  /*myTable样式*/
  table{
    font-size:12px;
  }
  table{
    table-layout:fixed;
    empty-cells:show;
    border-collapse: collapse;
    margin:0 auto;
  }
  td{
    height:30px;
  }
  h1,h2,h3{
    font-size:12px;
    margin:0;
    padding:0;
  }
  .table{
    border:1px solid #cad9ea;
    color:#666;
  }
  .table th {
    background-repeat:repeat-x;
    height:30px;
  }
  .table td,.table th{
    border:1px solid #cad9ea;
    padding:0 1em 0;
  }
  .table tr.alter{
    background-color:#f5fafe;
  }
</style>

