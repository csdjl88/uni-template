<template>
	<view class="container-box">
		<p>user_center</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: process.uniEnv.BASE_API,
				baseIcon: process.uniEnv.BASE_ICON,
			}
		},
		created() {

		},
		onLoad() {
			// onLoad：监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
		},
		onShow() {
			//onShow：监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
			const self = this;
			self.getUserStatus()
		},
		onPullDownRefresh() {
			//下拉重新调用查询用户信息的接口
			// this.displayFlag = false
			this.getUserStatus();
		},
		methods: {
			getUserStatus() {
				console.log("getUserStatus")
			},
		}
	}
</script>

<style lang="scss">
	page {
		// 在这里给页面设置背景颜色
		// background-color: $u-bg-color;
		background-color: #F5F5F5;
	}
</style>

<style lang="scss" scoped>
	// 顶部view：头像、公司名称、认证状态相关、会员身份图标、升级PLUS店主、积分、优惠券、足迹、收藏
	.top-view {
		height: 470rpx;
		// 宽和高100%占满view，背景图片不重复
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;

		// 顶部view：头像、公司名称、认证状态相关、会员身份图标、升级PLUS店主
		.top-user-info {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 190rpx;
			padding-left: 25rpx;
		}

		// 顶部view：头像、公司名称、认证状态相关、会员身份图标
		.user-info {
			flex: 3;
			height: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		//顶部view：公司名称、认证状态相关、会员身份图标
		.customer-name-view {
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;
		}

		//顶部view：公司名称
		.customer-name {
			color: #fff;
			font-size: 35rpx;
			margin-bottom: 10px;
		}

		//顶部view：审核状态view
		.apply-state-view {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: baseline;
		}

		//顶部view：审核状态名称
		.apply-state-name {
			color: #fff;
			font-size: 28rpx;
		}

		//顶部view：审核状态按钮
		.apply-state-btn {
			color: #333;
			font-size: 28rpx;
			background-color: #FBE561;
			border-radius: 30rpx;
			padding: 8rpx 15rpx;
			margin-left: 20rpx;
		}

		// 用户角色的图标：普通会员，PLUS店主，联营商
		.user-role-img {
			width: 200rpx;
			height: 40rpx;
		}

		// 升级PLUS店主所在的view
		.upgrade-plus {
			flex: 1.3;
			height: 100%;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
		}

		//升级PLUS店主
		.upgrade-plus-tag {
			font-size: 24rpx;
			color: #FBE561;
			background-color: rgba(51, 51, 51, 0.6);
			padding: 15rpx 10rpx 15rpx 15rpx;
			border-top-left-radius: 40rpx;
			border-bottom-left-radius: 40rpx;
		}

		// 积分，优惠券，足迹，收藏
		.trail-collect {
			padding: 20rpx 10rpx;
		}
	}

	//除去的顶部view之外的其他部分view(全部订单、新人专享礼、我的钱包、工具、联营商、退出登录)
	.other-view {
		position: absolute;
		width: 94%;
		left: 3%;
		top: 330rpx;
		display: flex;
		flex-direction: column;

		// 全部订单标题栏的父view
		.all-order-title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 23rpx 20rpx;
			border-bottom: 1rpx solid #F5F5F5;
		}

		// 全部订单
		.all-order-view {
			font-size: 30rpx;
			color: #000;
		}

		// 查看全部订单>的父view
		.view-all-order-view {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		// 查看全部订单
		.view-all-order {
			font-size: 28rpx;
			color: #828282;
			margin-right: 5rpx;
		}

		// PLUS店主免费升级banner图
		.banner-img {
			width: 100%;
			height: 150rpx;
			margin-bottom: 15rpx;
		}

		// 分销商管理标题view
		.distributor-title-view {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			padding: 10rpx 0rpx;
			margin-bottom: 20rpx;
		}

		// 分销商管理标题两侧的图标
		.distributor-title-view-img {
			width: 30px;
			height: 40rpx;
		}

		// 分销商订单下面的4个单元格所在的view
		.distributor-order-view {
			display: flex;
			flex-direction: column;
		}

		//每行2个单元格所在的view
		.distributor-grid-items-view {
			display: flex;
			flex-direction: row;
			height: 180rpx;
		}

		// 单个单元格所在的view
		.distributor-grid-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			color: #828282;
		}

		// 单元格里面的数字
		.distributor-blue-number {
			font-size: 35rpx;
			color: #3283fc;
		}

		//退出登录所在的view
		.log-out-view {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			border-radius: 20rpx;
			margin-bottom: 20rpx;
			background-color: #fff;
			padding: 22rpx 0rpx;
			font-size: 30rpx;
			color: #000;
		}
	}

	//通用view
	.common {
		display: flex;
		flex-direction: column;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
	}

	// 4种订单状态状态按钮(待付款，待发货，待收货，售后)的父view
	.order-state-view {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		padding: 45rpx 20rpx 20rpx 30rpx;
	}

	// 相对定位
	.po-re {
		position: relative;
	}

	// 单个订单状态按钮(待付款，待发货，待收货，售后)的view
	.order-state {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		// “PLUS钱包”文字显示不下
		width: 150rpx;
	}

	// 分销商下的4个按钮(佣金管理，分销商管理，预存款管理，招募海报)的view
	.distributor-btn-view {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
	}

	// 4种订单状态的图标
	.order-state-img {
		width: 55px;
		height: 55rpx;
	}

	// 我的钱包、工具和商家管理工具
	.my-wallet-state {
		padding: 30rpx 10rpx;
	}

	.margin-top-five {
		margin-top: 10rpx;
	}

	.border-bottom-one {
		border-right: 1rpx solid #F5F5F5;
	}

	.flex-one {
		flex: 1;
	}

	.flex-zero {
		flex: 0;
	}

	//白色字体
	.font-color-white {
		color: #fff;
	}

	//页面最底部的占位view，该view的高度和底部选项卡的高度相同，都设置为50px
	.gap {
		height: 50px;
	}

	// 免费升级啦的整个弹框的父view
	.free-upgrade {
		height: 850rpx;
		width: 550rpx;
		// 宽和高100%占满view，背景图片不重复
		background-size: 100% 100%;
		// 设置左右内边距，必要
		padding: 0rpx 5%;
		background-color: transparent;
		// background: none !important;
		// background-color: rgba(0, 0, 0, 0.3);

		display: flex;
		flex-direction: column;

		// 免费升级啦的标题view
		.plus-title {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 40rpx 0rpx 30rpx 0rpx;
			font-size: 42rpx;
			font-weight: bold;
			color: #000;
		}

		// 显示对话框中间的提示内容
		.tip-content {
			display: flex;
			flex-direction: column;
			//垂直方向居中显示
			justify-content: center;
			// 水平方向居中显示
			align-items: center;

			height: 270rpx;

			// upgrade_state升级状态： 2：升级成功；
			// 恭喜您，成功升级为PLUS会员！
			.upgrade_success {
				font-size: 32rpx;
				color: #fe0036;
				font-weight: bold;
			}

			// upgrade_state升级状态：3：升级失败；4：升级完成
			// 升级失败或您已是PLUS会员，无需升级
			.upgrade_failure {
				font-size: 32rpx;
				color: #363636;
				font-weight: bold;
			}

			// upgrade_state升级状态： 0：未达成；1：可升级成功；
			.upgrading {
				font-size: 30rpx;
				padding: 0 5%;
				color: #363636;
				line-height: 2;
			}
		}

		//订单完成金额和订单完成金额进度条和百分比所在view
		.done-amount-pro {
			// 宽和高100%占满view，背景图片不重复
			background-size: 100% 100%;
			height: 110rpx;
			margin: 30rpx 0rpx 30rpx 0rpx;
			font-size: 24rpx;
			color: #404040;

			display: flex;
			flex-direction: column;
			// 垂直方向上居中显示
			justify-content: center;
			padding: 0 5%;

			//订单完成金额所在view
			.done-amount {
				display: flex;
				align-items: baseline;
				margin-top: 5rpx;

				.c-grey {
					color: #404040;
				}

				.c-red {
					color: #FE0A3B;
				}

			}

			//订单完成金额进度条和百分比所在view
			.done-procent {
				display: flex;
				align-items: center;
				margin-top: 10rpx;

				.progress {
					flex: 1;
				}

				.ml-fif {
					margin-left: 15rpx;
				}
			}
		}

		// 未达成按钮或立即升级按钮或确认按钮所在view
		.btn-view {
			display: flex;
			justify-content: center;
			align-items: center;

			// 立即升级按钮或确认按钮所在view
			.btn-red {
				color: #fff;
				font-size: 35rpx;
				border-radius: 50rpx;
				background-color: #FE0037;
				padding: 20rpx 60rpx;
			}

			// 未达成按钮或确认按钮所在view
			.btn-grey {
				color: #fff;
				font-size: 35rpx;
				border-radius: 50rpx;
				background-color: #CCC;
				padding: 20rpx 60rpx;
			}
		}
	}
</style>
