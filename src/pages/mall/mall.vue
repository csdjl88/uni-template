<template>
	<view class="container-box">
		<p>hello word</p>
	</view>
</template>

<script>
	import {
		UniIcons
	} from "@/components/uni-icons/uni-icons.vue";
	export default {
		data() {
			return {
				baseUrl: process.uniEnv.BASE_API,
				baseIcon: process.uniEnv.BASE_ICON,
				now: Date.parse(Date()) / 1000,
			};
		},
		components: {
		
		},
		props: {},
		created() {},
		onShow(options) {
			this.getMallIndex()
		},
		onLoad() {
			
		},
		onUnload() {
			
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		//下拉刷新
		onPullDownRefresh() {
			this.getMallIndex()
		},
		//滚动底部刷新
		onReachBottom() {
		},
		methods: {
			//首页配置
			getMallIndex() {
				console.log('hello word')
			},
			//跳转到第三方app || 小程序
			goThirdParty(item) {
				// const self = this;
				// const platform = getPlatform();
				// if (platform === 'App') {
				// 	self.launchMiniProgram(item);
				// } else if (self.platform.indexOf('MP-') !== -1) { //小程序跳小程序
				// 	// 微信小程序端
				// 	uni.navigateToMiniProgram({
				// 		appId: item.app_id,
				// 		path: item.mp_link,
				// 		extraData: { //需要传递给目标小程序的数据
				// 		},
				// 		success(res) {
				// 			// 打开成功
				// 		}
				// 	})
				// }
			},
			launchMiniProgram(item) {
				// const self = this
				// if (this.hasWechat()) {
				// 	if (self.sweixin) {
				// 		self.sweixin.launchMiniProgram({
				// 			id: item.wx_account_id,
				// 			path: item.mp_link
				// 		}, function() {
				// 			self.$toast('成功跳转')
				// 		}, function(e) {
				// 			plus.nativeUI.alert('跳转失败!' + e);
				// 		});
				// 	} else {
				// 		plus.nativeUI.alert('当前环境不支持微信操作!');
				// 	}
				// } else {
				// 	plus.nativeUI.alert('当前环境未安装微信!');
				// }
			},
			// 判断是否安装微信
			hasWechat() {
				return plus.runtime.isApplicationExist({
					pname: 'com.tencent.mm',
					action: 'weixin://'
				});
			},
		}
	}
</script>
<style>
	page {
		background: #f8f8f9;
	}
</style>

<style lang="scss" scoped>
	.search {
		display: flex;
		align-items: center;
		width: 94%;
		margin: auto;
		padding-top: 24rpx;
		justify-content: space-between;

		.logo {
			width: 48rpx;
			height: 48rpx;
			vertical-align: middle;
		}

		.search-center {
			text-align: left;
			display: block;
			margin: 0 auto;
			padding: 5rpx 0 5rpx 10rpx;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			border-radius: 40rpx;
			font-size: 26rpx;
			color: #afafaf;
		}

		.search-center>image {
			width: 36rpx;
			height: 36rpx;
			vertical-align: middle;
			margin-left: 20rpx;
		}

		.delete {
			float: right;
		}

		.delete image {
			width: 52rpx;
			height: 52rpx;
			vertical-align: middle;
			margin-right: 10rpx;
		}

		.contact image {
			width: 55rpx;
			height: 55rpx;
		}

		.contact {
			background: rgba(0, 0, 0, 0);
			padding-left: 0;
			padding-right: 0;
			line-height: 0;
			margin-left: 0;
			margin-right: 0;
		}

		.contact::after {
			border: none;
		}
	}

	.swiper {
		width: 95%;
		margin: 20rpx auto;
		border-radius: 20rpx;
		overflow: hidden;
	}

	.swiper-area {
		padding: 3%;
	}

	.goods-list {
		text-align: left;

		.choice-item {
			padding: 10rpx 10rpx 0 10rpx;
			width: 48.5%;
			float: left;

			&:nth-child(odd) {
				padding-right: 0;
			}

			&:nth-child(even) {
				padding-left: 0;
			}
		}

		.goods-item {
			background-color: #FFFFFF;
			display: block;
			width: 95%;
			margin: 2% auto 0;
			height: 45vh;
			border-radius: 2vh;
			text-align: center;

			.showcase {
				width: 90%;
				height: 30vh;
			}

			.goods-title {
				width: 94%;
				margin: auto;
				text-align: left;
			}
		}

		.payment-num-row {
			display: flex;
			align-items: baseline;
			width: 90%;
			margin: 0 auto;

			.nahuo-price {
				color: #cf0022;
				font-size: 25rpx;
				width: 30%;
				margin-top: 3vh;
			}

			.nahuo-price view {
				font-size: 25rpx;
				display: inline-block;
			}

			.payment-num {
				width: 70%;
				font-size: 25rpx;
				color: #8c8c8c;
				text-align: right;
			}

			.u-icon {
				color: #8c8c8c;
			}
		}
	}

	.kind-pic {
		width: 95%;
		background: #fff;
		border-radius: 20rpx;
		margin: 20rpx auto;

		.kind-pic-plus {
			width: 100%;
			padding: 20rpx 0;
			display: flex;
			font-size: 28rpx;
			text-align: center;
			justify-content: end;
			color: #5e5e5e;
			flex-wrap: wrap;
		}

		.kind-img {
			height: 90rpx;
			width: 90rpx;
			overflow: hidden;
			padding: 0 40rpx;
		}

		.king-img-box {
			line-height: 1.3;
			color: #4a4a4a;
			width: 25%;
			margin: 18rpx 0 0;
		}
	}

	.bg-img {
		background-size: 100%;
		background-repeat: no-repeat;
	}

	.ms-img-box {
		width: 94%;
		margin: 0 auto 30rpx;

		.ms-img {
			width: 100%;
			height: 200rpx;
		}
	}

	.factory-floor {
		display: flex;
		width: 96%;
		margin: auto;
		justify-content: space-between;
		font-size: 36rpx;
		color: #121212;
		height: 87rpx;



		navigator {
			height: 87rpx;
			width: 100%;
		}
	}

	/**
	  * 秒杀模块
	  */
	.content-seckill {
		display: flex;
		width: 96%;
		margin: 0 auto;
		justify-content: space-around;

		.goods-sec {
			display: block;
			width: 32%;
			height: 286rpx;
			background: #fff;
			text-align: center;

			image {
				height: 200rpx;
				width: 88%;
				padding: 10rpx 0 11rpx;
			}

			.ms-price {
				font-weight: 600;
				color: #CD001E;
				font-size: 32rpx;
				background-color: #FFFFFF;
				padding-bottom: 2rpx;

				text {
					text-decoration: line-through;
					font-size: 24rpx;
					color: #a9a9a9;
					font-weight: 300;
				}
			}
		}
	}

	.seckill-end {
		width: 46%;
		margin: auto;
		font-size: 28rpx;
		text-align: center;
		padding: 0 0 50rpx 0;
		color: #fff;

		.type-title {
			display: block;
		}
	}

	.like-you {
		width: 100%;

		image {
			width: 100%;
			height: 120rpx;
		}
	}

	.assemble-box {
		width: 96%;
		margin: auto;
		background: #fff;
		padding: 20rpx 1.5%;
		margin-top: 20rpx;
		border-radius: 20rpx;

		.brand-floor {
			background-repeat: no-repeat;
			background-size: 100%;
			background-color: #fff;
			background-position: top
		}

		.grid-title-sty {
			width: 96%;
			height: 100rpx;
		}

		.brand-list {
			width: 100%;
			display: flex;
			overflow: hidden;
			justify-content: space-between;

			.top {
				width: 25%;
				border: 1rpx solid #f5f5f5;

				image {
					width: 100%;
					height: 250rpx;
				}
			}

			.motton:first-child {
				width: 50%;
				border-right: 1rpx solid #F5F5F5;
			}

			.motton {
				margin-top: 10rpx;
				width: 49%;

				image {
					width: 100%;
					height: 283rpx;
				}
			}
		}
	}
</style>
