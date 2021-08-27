<template>
	<view class="container">
		<!-- 页面头部 -->
		<view class="header">
			<view class="title">
				<text>欢迎登录商城</text>
			</view>
			<view class="sub-title">
				<text>未注册的手机号验证后自动创建商城账号</text>
			</view>
		</view>
		<view class="content">
			<!-- 手机号 -->
			<view class="form-item">
				<input class="form-item--input" type="number" v-model="mobile" maxlength="11" placeholder="请输入手机号码" />
			</view>
			<view class="form-item">
				<input class="form-item--input" type="number" v-model="smsCode" maxlength="5" placeholder="请输入短信验证码" />
				<view class="form-item--parts">
					<view class="captcha-sms" @click="handelSmsCaptcha()">
						<text v-if="!smsState" class="activate">获取验证码</text>
						<text v-else class="un-activate">重新发送({{ times }})秒</text>
					</view>
				</view>
			</view>
			<view class="form-item">
				<input class="form-item--input" type="number" v-model="inviteCode" placeholder="请输入邀请码" />
			</view>
			<view class="login-button" @click="handleLogin">
				<text>登录</text>
			</view>
		</view>
		<view class="hint">
			<view class="rd-agree">
				<radio value="r1" color="#FF0066" style="transform:scale(0.75)" :checked="isAgree" @click="agreeBtn" />
				我已阅读并同意
			</view>
			<view class="link">
				<navigator hover-class="none" url="">
					<view class="c-blue">《商城用户协议》</view>
				</navigator>
				和
				<navigator hover-class="none" url="">
					<view class="c-blue">《商城隐私政策》</view>
				</navigator>
			</view>
			并授权商城使用该拿货商城账号信息（如昵称、头像、收获地址）进行统一管理
		</view>
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	var jpushModule = uni.requireNativePlugin("JG-JPush")
	// #endif
	import store from '@/store'
	import {
		sendLoginSMS
	} from "@/api/api.js";
	import * as Verify from "@/common/verify.js";
	// 倒计时时长(秒)
	const times = 300
	// 表单验证场景
	const GET_CAPTCHA = 10
	const SUBMIT_LOGIN = 20
	export default {
		props: {
			// 是否存在第三方用户信息
			isParty: {
				type: Boolean,
				default: () => false
			},
			// 第三方用户信息数据
			partyData: {
				type: Object
			},
		},
		data() {
			return {
				// 正在加载
				isLoading: false,
				inviteCode: "",
				// 倒计时
				times,
				// 手机号
				mobile: "",
				// 短信验证码
				smsCode: '',
				// 短信验证码发送状态
				smsState: false,
				//极光设备ID
				registrationId: '',
				isAgree: false, //是否勾选登录即代表您已阅读并同意的单选框
			};
		},
		components: {},
		created() {},
		onLoad() {
			this.inviteCode = uni.getStorageSync('inviteCode')
		},
		methods: {
			//检测发送短信验证码
			handelSmsCaptcha() {
				const self = this
				if (!self.isLoading && !self.smsState && self.formValidation(GET_CAPTCHA)) {
					self.sendSmsCaptcha()
				}
			},
			//发送短信验证码
			sendSmsCaptcha() {
				const self = this
				//获取极光设备ID
				// #ifdef APP-PLUS
				self.getRegistrationID()
				// #endif
				let mobile = self.mobile
				self.isLoading = true
				sendLoginSMS({
					mobile_no: mobile
				}).then(res => {
					let {
						code,
						message
					} = res
					if (code === 1) {
						message = message ? message : "发送成功"
						self.$toast(message)
						self.timer()
					} else {
						message = message ? message : "发送失败"
						self.$toast(message)
					}
				}).catch(() => {
					self.$toast("系统繁忙，请稍后再试!");
				}).finally(() => {
					self.isLoading = false
				})
			},
			//登录验证
			handleLogin() {
				const self = this
				if (!self.isLoading && self.formValidation(SUBMIT_LOGIN)) {
					if (self.isParty && self.partyData) {
						// 微信授权登录
						self.onAuthSuccess(self.partyData)
					} else {
						//普通登录
						self.submitLogin()
					}
				}
			},
			//微信登录
			onAuthSuccess(wxInfo) {
				const self = this
				let params = {
					mobile_no: self.mobile,
					verify: self.smsCode,
					invite_code: self.inviteCode, //邀请码
					mp_session_key: wxInfo.userInfo.mp_session
				}
				// 提交到后端
				store.dispatch('userWxLogin', params)
					.then(res => {
						const {
							code,
							data
						} = res
						if (code === 1) {
							uni.hideLoading();
							self.$toast("授权成功")
							uni.switchTab({
								url: "/pages/user/user_center/user_center"
							})
							//登录成功后触发首页监听器上的自定义事件updateMall
							//通知首页去刷新首页为你推荐商品列表接口(显示出第一页数据)
							uni.$emit('updateMall', {});
						} else {
							self.$toast(res.message)
						}
					}).catch(() => {
						self.$toast("系统繁忙，请稍后再试!");
					}).finally(() => {
						self.isLoading = false
					})
			},
			submitLogin() {
				// 确认登录
				const self = this
				let mobile = self.mobile
				self.isLoading = true
				uni.showLoading({
					title: '登录中'
				});
				store.dispatch('Login', {
					mobile_no: mobile,
					verify: self.smsCode,
					invite_code: self.inviteCode, //邀请码
					registration_id: self.registration_id,
					customer_type: 1, //注册类型
					action: 'customer_info_verify'
				}).then(res => {
					const {
						code,
						data
					} = res
					if (code === 1) {
						// 显示登录成功
						self.$toast("登录成功")
						uni.switchTab({
							url: "/pages/user/user_center/user_center"
						})
						//登录成功后触发首页监听器上的自定义事件updateMall
						//通知首页去刷新首页为你推荐商品列表接口(显示出第一页数据)
						uni.$emit('updateMall', {});
						// #ifdef APP-PLUS
						//App端登录成功：友盟埋点：Android端和IOS端
						plus.statistic.eventTrig("Click_Login", {
							"from": "app"
						});
						// #endif
					} else {
						self.$toast(res.message)
					}
				}).catch(() => {
					self.$toast("系统繁忙，请稍后再试!");
				}).finally(() => {
					self.isLoading = false
					uni.hideLoading();
				})
			},
			// 执行定时器
			timer() {
				const self = this
				self.smsState = true
				const inter = setInterval(() => {
					self.times = self.times - 1
					if (self.times <= 0) {
						self.smsState = false
						self.times = times
						clearInterval(inter)
					}
				}, 1000)
			},
			/**
			 * 登录成功-跳转回原页面
			 */
			onNavigateBack(delta) {
				uni.navigateBack({
					delta: Number(delta || 1)
				})
			},
			// 验证手机号
			validteMobile(str) {
				if (Verify.isEmpty(str)) {
					this.$toast('请先输入手机号')
					return false
				}
				if (!Verify.isMobile(str)) {
					this.$toast('请输入正确格式的手机号')
					return false
				}
				return true
			},
			// 验证短信验证码
			validteSmsCode(str) {
				if (Verify.isEmpty(str)) {
					this.$toast('请先输入短信验证码')
					return false
				}
				return true
			},
			validteIsAgree() {
				// 验证是否勾选登录即代表您已阅读并同意的单选框
				const self = this;
				if (!self.isAgree) {
					self.$toast('请阅读并勾选下方协议')
					return false
				}
				return true
			},
			// 表单验证
			formValidation(scene = GET_CAPTCHA) {
				const self = this
				// 验证获取短信验证码
				if (scene === GET_CAPTCHA) {
					if (!self.validteMobile(self.mobile)) {
						return false
					}
				}
				// 验证提交登录
				if (scene === SUBMIT_LOGIN) {
					if (!self.validteMobile(self.mobile) || !self.validteSmsCode(self.smsCode) || !self.validteIsAgree()) {
						return false
					}
				}
				return true
			},
			getRegistrationID() {
				jpushModule.getRegistrationID(result => {
					let registerID = result.registerID
					this.registration_id = registerID
				})

			},
			agreeBtn() {
				// 点击登录即代表您已阅读并同意的单选框
				let self = this;
				self.isAgree = !self.isAgree;
				//暂时先保存到本地备用
				uni.setStorageSync('isAgree', self.isAgree);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 100rpx 60rpx;
		min-height: 100vh;
		background-color: #fff;
	}

	// 页面头部
	.header {
		margin-bottom: 50rpx;

		.title {
			color: #191919;
			font-size: 50rpx;
		}

		.sub-title {
			margin-top: 20rpx;
			color: #b3b3b3;
			font-size: 26rpx;
		}
	}

	.content {
		.form-item {
			display: flex;
			padding: 18rpx;
			border-bottom: 1rpx solid #f3f1f2;
			margin-bottom: 25rpx;
			height: 96rpx;

			&--input {
				font-size: 26rpx;
				letter-spacing: 1rpx;
				flex: 1;
				height: 100%;
			}

			&--parts {
				min-width: 100rpx;
				height: 100%;

				// 短信验证码
				.captcha-sms {
					font-size: 26rpx;
					line-height: 50rpx;
					padding-right: 20rpx;

					.activate {
						color: #cea26a;
					}

					.un-activate {
						color: #9e9e9e;
					}
				}
			}
		}

		.login-button {
			width: 100%;
			height: 86rpx;
			margin-top: 70rpx;
			// background: #cea26a;
			background: linear-gradient(to right, #FF0066, #FE0034);
			text-align: center;
			line-height: 86rpx;
			color: #fff;
			border-radius: 80rpx;
			box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
			letter-spacing: 5rpx;
		}
	}

	.hint {
		margin-top: 200rpx;
		padding: 20rpx 0rpx;
		font-size: 27rpx;
		color: $u-tips-color;
		display: flex;
		flex-wrap: wrap;

		.rd-agree {
			display: flex;
			align-items: center;
		}

		.link {

			display: flex;

			.c-blue {
				color: #3283fc;
			}
		}
	}
</style>
