const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  platform: state => state.app.platform
}

export default getters
