<template>
  <div class="app-container">
    <el-tree default-expand-all :data="list" :props="defaultProps">
      <!-- 节点结构 -->
      <!-- v-slot="{ node, data }" 只能作用在template -->
      <template v-slot="{ data }">
        <el-row style="width:100%;height:40px" type="flex" justify="space-between" align="middle">
          <el-col>{{ data.name }}</el-col>
          <el-col :span="4">
            <span class="tree-manager">{{ data.managerName }}</span>
            <!-- $event 实参 表示类型 -->
            <el-dropdown @command="handleCommand($event,data.id)">
              <!-- 显示区域内容 -->
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <!-- 下拉菜单选项 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item command="del">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </template>
    </el-tree>

    <!-- 添加子部门 -->
    <AddDept :show-dialog="showDialog" @changeDialog="changeDialog" />
  </div>
</template>

<script>
import { transListToTreeData } from '@/utils/index'
import { getDepartList } from '@/api/department'
import AddDept from '@/components/Department/AddDept.vue'
export default {
  components: {
    AddDept
  },
  data() {
    return {
      list: [],
      defaultProps: [],
      showDialog: false // 弹窗
    }
  },
  created() {
    this.getDepartList()
  },
  methods: {
    // 获取组织列表
    async getDepartList() {
      const res = await getDepartList()
      this.list = transListToTreeData(res, 0)
    },
    // 添加子部门
    handleCommand(command, id) {
      if (command === 'add') {
        // 点击添加子部门触发
        this.showDialog = true
      }
    },
    // 关闭弹窗
    changeDialog(data) {
      this.showDialog = data
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;
}
.tree-manager {
  width: 50px;
  display: inline-block;
  margin: 30px;
}
</style>

