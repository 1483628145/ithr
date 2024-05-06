<template>
  <div>
    <el-dialog
      title="添加子部门"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      append-to-body
    >
      <!-- 修改密码表格 -->
      <el-form :ref="updateRef" label-width="120px" :model="updateUserForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="updateUserForm.oldPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="updateUserForm.newPassword" show-password size="small" />
        </el-form-item>
        <el-form-item label="重复密码" prop="conPassword">
          <el-input v-model="updateUserForm.conPassword" show-password size="small" />
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
export default {
  name: 'AddDept'
}
</script>

<style>

</style>
