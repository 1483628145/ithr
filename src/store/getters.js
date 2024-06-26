const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userInfo.userId, // 用户ID
  staffPhoto: state => state.user.userInfo.staffPhoto, // 用户头像
  username: state => state.user.userInfo.username // 用户名
}
export default getters
