<template>
  <div>
    <el-dialog
      title="添加子部门"
      :visible="showDialog"
      width="30%"
      center
      append-to-body
      @close="closeDialog"
    >
      <!-- 修改密码表格 -->
      <el-form ref="updateRef" label-width="120px" :model="updateUserForm" :rules="rules">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="addForm.name" size="small" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="addForm.code" size="small" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="managerId">
          <el-input v-model="addForm.managerId" size="small" />
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="addForm.introduce" size="small" />
        </el-form-item>

        <el-form-item>
          <el-button size="mini" type="primary" @click="confirmUpdatePassword">确认</el-button>
          <el-button size="mini" @click="cancelUpdatePassword">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { addDepart, getManagerList, getDepartList, getDepartDetail } from '@/api/department'
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      addForm: {
        name: '',
        code: '',
        managerId: '',
        introduce: ''
      },
      managerList: [],
      // 校验规则
      rules: {
        // 部门编码
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 2, max: 10, message: '部门编码的长度为2-10个字符', trigger: 'blur'
          },
          {
            trigger: 'blur',
            // 自定义校验模式
            validator: async(rule, value, callback) => {
              // value就是输入的编码
              const result = await getDepartList()
              // result数组中是否存在 value值
              if (result.some(item => item.name === value)) {
                callback(new Error('部门中已经有该名称了'))
              } else {
                callback()
              }
            }
          }
        ],
        // 部门介绍
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, {
          min: 1, max: 100, message: '部门介绍的长度为1-100个字符', trigger: 'blur'
        }],
        // 部门负责人id
        managerId: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: async(rule, value, callback) => {
              // value就是输入的编码
              const result = await getDepartList()
              // result数组中是否存在 value值
              if (result.some(item => item.code === value)) {
                callback(new Error('部门中已经有该编码了'))
              } else {
                callback()
              }
            }

          }
        ],
        // 部门名称
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            min: 2, max: 10, message: '部门名称的长度为2-10个字符', trigger: 'blur'
          }

        ]

      }
    }
  },
  created() {
    this.getManagerList()
    this.getDepartDetail()
  },
  methods: {
    // 关闭弹层
    closeDialog() {
      // 请求修改父组件的showDialog
      this.$emit('changeDialog', false)
    },

    // 获取部门负责人列表
    async getManagerList() {
      this.managerList = await getManagerList()
    },

    // 确认添加部门
    confirmUpdatePassword() {
      console.log(this.$refs)
      // 判断是否通过校验
      this.$refs.updateRef.validate(async(isOK) => {
        // 通过校验
        if (isOK) {
          await addDepart()
        }
      })
      // 关闭弹层
      this.closeDialog()
      // 重置表单
      this.$refs.updateRef.resetField()
    },
    // 取消新增部门
    cancelUpdatePassword() {
      // this.$refs.updateRef.resetFields()
      // 关闭弹层
      this.closeDialog()
    },
    // 获取部门详情
    async getDepartDetail() {
      await getDepartDetail(this.id)
    }

  }
}
</script>

<style>

</style>
