<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 用户头像 -->
          <img :src="staffPhoto" class="user-avatar">
          <!-- 用户名称 -->
          <span class="name">{{ username }}</span>
          <!-- 图标 -->
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="showUpdateDialog">
            <span style="display:block;">修改密码</span>
          </el-dropdown-item>
          <!-- 修改密码dialog -->
          <el-dialog
            title="修改密码"
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
          <!-- 退出登录 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      centerDialogVisible: true,
      updateUserForm: {
        oldPassword: '',
        newPassword: '',
        conPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'staffPhoto',
      'username'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 打开修改密码对话框
    showUpdateDialog() {
      this.centerDialogVisible = false
    },
    // 确认修改用户密码
    confirmUpdatePassword() {
      // 确定通过表单验证
      // 调接口修改密码
      // 清除表格数据
      // 关闭dialog
    },
    // 取消修改密码
    cancelUpdatePassword() {
      // 清除表格数据
      // 关闭dialog
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;
        .name {
          //  用户名称距离右侧距离
          margin-right: 10px;
          font-size: 16px;
        }
        .el-icon-setting {
          font-size: 20px;
        }
        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
