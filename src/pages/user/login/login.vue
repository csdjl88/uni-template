<template>
    <view>
        <MpWeixin v-if="isShowUserInfo" @success="onGetUserInfoSuccess"/>
        <Main v-else :isParty="isExistUserInfo" :partyData="partyData"/>
    </view>
</template>

<script>
  import Main from './components/Main'
  import MpWeixin from './components/MpWeixin'

  export default {
    components: {
      Main,
      MpWeixin
    },
    data() {
      return {
        // 是否显示获取用户信息组件
        isShowUserInfo: false,
        // 是否已获取到了用户信息
        isExistUserInfo: false,
        // 第三方用户信息数据
        partyData: {}
      };
    },
    computed: {},

    props: {},
    created() {
    },
    onLoad() {
      const self = this
      // 只有微信小程序才显示获取用户信息按钮
      // #ifdef MP-WEIXIN
      self.isShowUserInfo = wx.canIUse('getUserProfile')
      // #endif
    },
    methods: {
      // 获取到用户信息的回调函数
      onGetUserInfoSuccess({userInfo}) {
        // 记录第三方用户信息数据
        this.partyData = {userInfo}
        // 显示注册页面
        this.onShowRegister()
      },
      // 显示注册页面
      onShowRegister() {
        // 是否显示获取用户信息组件
        this.isShowUserInfo = false
        // 是否已获取到了用户信息
        this.isExistUserInfo = true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
