<template>
	<view class="container">
		<view class="wechatapp">
			<view class="header">
				<open-data class="avatar" type="userAvatarUrl"></open-data>
			</view>
		</view>
		<view class="auth-title">申请获取以下权限</view>
		<view class="auth-subtitle">获得你的公开信息（昵称、头像等）</view>
		<view class="login-btn">
			<button class="button btn-normal" :disabled="disabled" @tap.stop="getUserProfile">授权登录</button>
		</view>
		<view class="no-login-btn">
			<button class="button btn-normal" @tap="handleCancel">暂不登录</button>
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	import {
		getMpUserMobile,
		userMpLogin
	} from "@/api/user/user"

	export default {

		data() {
			return {
				// 微信小程序登录凭证 (code)
				// 提交到后端，用于换取openid
				code: '',
				disabled:false
			}
		},

		created() {
			// 获取code
			// this.getCode()
		},

		methods: {
			// 获取code
			// https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html
			getCode() {
				return new Promise((resolve, reject) => {
					uni.login({
						provider: 'weixin',
						success: res => {
							resolve(res.code)
						},
						fail: reject
					})
				})
			},
			// code换用户mp_session
			onAuthLogin(code) {
				return new Promise((resolve, reject) => {
					store.dispatch('mpUserInfo', {
						code: code
					}).then(res => {
						const {
							code,
							data
						} = res
						if (code === 1) {
							resolve(data)
						} else {
							reject(res.message)
						}
					}).catch((e) => {
						reject(e)
					})
				})
			},
			async getUserProfile() {
				const self = this
				self.disabled = true
				wx.canIUse('getUserProfile') && wx.getUserProfile({
					lang: 'zh_CN',
					desc: '获取用户相关信息',
					async success() {
						// 授权成功事件
						let code = await self.getCode()
						let wxInfo = await self.onAuthLogin(code)
						self.onAuthSuccess(wxInfo)
					},
					fail() {
						console.log('用户拒绝了授权')
					},
					complete(){
						self.disabled = false
					},
				})
			},
			onAuthSuccess(wxInfo) {
				const self = this
				if (wxInfo.session_key) {
					//已存在的客户
					uni.hideLoading();
					this.$toast("授权成功")
					uni.switchTab({
						url: "/pages/user/user_center/user_center"
					})
				} else {
					// 将oauth提交给父级
					//跳转手机验证码页
					self.onEmitSuccess(wxInfo)
				}
			},
			// 将oauth提交给父级
			// 这里要重新获取code, 因为上一次获取的code不能复用(会报错)
			async onEmitSuccess(userInfo) {
				const self = this
				self.$emit('success', {
					userInfo // 微信用户信息
				})
			},
		}

	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 60rpx;
		font-size: 32rpx;
		background: #fff;
		min-height: 100vh;
	}

	.wechatapp {
		padding: 80rpx 0 48rpx;
		border-bottom: 1rpx solid #e3e3e3;
		margin-bottom: 72rpx;
		text-align: center;

		.header {
			width: 190rpx;
			height: 190rpx;
			border: 4rpx solid #fff;
			margin: 0 auto 0;
			border-radius: 50%;
			overflow: hidden;
			box-shadow: 2rpx 0 10rpx rgba(50, 50, 50, 0.3);
		}
	}

	.auth-title {
		color: #585858;
		font-size: 34rpx;
		margin-bottom: 40rpx;
	}

	.auth-subtitle {
		color: #888;
		margin-bottom: 88rpx;
		font-size: 28rpx;
	}

	.login-btn {
		padding: 0 20rpx;

		.button {
			height: 88rpx;
			line-height: 88rpx;
			background: #04be01;
			color: #fff;
			font-size: 30rpx;
			border-radius: 999rpx;
			text-align: center;
		}
	}


	.no-login-btn {
		margin-top: 20rpx;
		padding: 0 20rpx;

		.button {
			height: 88rpx;
			line-height: 88rpx;
			background: #dfdfdf;
			color: #fff;
			font-size: 30rpx;
			border-radius: 999rpx;
			text-align: center;
		}
	}
</style>
