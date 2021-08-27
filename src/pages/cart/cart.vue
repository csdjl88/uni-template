<template>
	<view class="container-box">
		<p>cart</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseIcon: process.uniEnv.BASE_ICON,

			};
		},
		components: {
		},
		props: {},
		onShow(options) {

		},
		created() {},
		onLoad() {

		},
		onUnload() {

		},
		onPullDownRefresh() {

		},
		methods: {

		}
	}
</script>
<style>
	page {
		background: #f6f6f6;
	}
</style>
<style lang="scss" scoped>
	.cart-list {
		margin-bottom: 88rpx;
		overflow: hidden;
	}

	.header {
		image {
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 0;
		}

		.cart-number {
			color: #fff;
			display: block;
			width: 96%;
			text-align: center;
			font-size: 30rpx;
			padding: 20rpx 0;
			margin: auto;
			z-index: 1;
			position: relative;
		}

		.editBind {
			float: right;
			font-size: 28rpx;
			vertical-align: middle;
		}
	}

	.cart-content {
		background-color: #cf0022;
		width: 96%;
		margin: auto;
		background: #fff;
		border-radius: 20rpx;
		margin-bottom: 50rpx;
		padding-bottom: 40rpx;
		border-bottom: #dddee1 solid 1rpx;
		background: #fff;
		position: relative;
		overflow: hidden;
	}

	.store-mes {
		border-bottom: 1rpx solid #f5f5f5;
		padding: 16rpx 24rpx;
		display: flex;
		flex-direction: row;
		justify-content: start;

		.checkbox {
			display: inline-block;
			/*float: left;*/
		}

		.store-mes-text {
			display: inline-block;
			padding-left: 10rpx;
			font-size: 32rpx;
		}
	}

	.goods_box {
		margin-top: 30rpx;
		display: flex;
		width: 100%;
		height: 180rpx;
		align-items: center;
		padding: 16rpx 24rpx;
		border-bottom: 1rpx solid #dddee1;
		box-sizing: content-box;

		.checkbox {
			float: left;
		}

		.goods-thumb {
			margin-left: 20rpx;

			image {
				width: 150rpx;
				height: 150rpx;
				padding: 10rpx;
				border: 1rpx solid #eee;
			}
		}

		.goods-detail {
			display: flex;
			margin-left: 20rpx;
			height: 180rpx;
			flex-direction: column;
			justify-content: space-between;
			overflow: hidden;
			width: 60%;
			box-sizing: content-box;

			// .goods-title {
			// 	font-size: 28rpx;
			// 	line-height: 1.5;
			// 	box-sizing: content-box;
			// 	text-align: left;

			// 	span {
			// 		border-radius: 5rpx;
			// 		border: 1rpx solid #cf0022;
			// 		color: #cf0022;
			// 		padding: 0 4rpx;
			// 		box-sizing: content-box;
			// 	}
			// }

			.goods-price {
				display: flex;
				align-items: center;
				justify-content: space-between;
				box-sizing: content-box;

				.price {
					font-size: 30rpx;
					color: #cf0022;
				}

				.count {
					color: #495060;

					.sub {
						border-right: none;
					}

					.add {
						border-left: none;
					}
				}

				.count>view,
				.count>input {
					box-sizing: content-box;
					font-size: 30rpx;
					float: left;
					width: 55rpx;
					height: 55rpx;
					line-height: 50rpx;
					text-align: center;
					border: 1rpx solid #dddee1;
					border-radius: 2rpx 0 0 2rpx;
				}
			}
		}
	}

	.pay-for {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 88rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		font-size: 28rpx;
		color: #666;
		background-color: #fff;
		z-index: 999;
		//#ifdef H5
		bottom: 110rpx;

		//#endif
		.choosebox {
			display: flex;
			padding-left: 0%;
			font-size: 26rpx;

			.checkbox {
				float: left;
				padding-left: 40rpx;
				line-height: 100rpx;
				display: flex;
				align-items: center;
			}
		}

		.consumer {
			float: right;
			margin-right: 60rpx;
			line-height: 50rpx;

			.co-red {
				color: #cf0022;
			}
		}

		.pay-btn {
			float: right;
			width: 240rpx;
			height: 100%;
			line-height: 88rpx;
			text-align: center;
			background-color: #cf0022;
			color: #fff;
			border-radius: 0;
			margin: 0;
			font-size: 26rpx;
		}

		.batch-delete {
			background: linear-gradient(to right, #d00022, #ec2343);
			color: #fff;
			width: 160rpx;
			height: 80%;
			line-height: 2.5;
			text-align: center;
			font-size: 26rpx;
			border-radius: 50rpx;
			margin: 0 20rpx;
		}
	}

	.order {
		.popup-title {
			font-size: 32rpx;
			padding: 28rpx 0;
			display: block;
			text-align: center;
		}

		.confrim-btn {
			z-index: 999;
			position: fixed;
			width: 98%;
			bottom: 6rpx;
			left: 0;
			right: 0;
			margin: 0 auto;

			.closeCart {
				background-color: #cd001e !important;
				color: #fff;
				border: none !important;
				font-size: 30rpx;
				padding: 8rpx 0;
			}
		}

		.shop-buy-shopping {
			display: flex;
			font-size: 30rpx;
			width: 96%;
			background: #fff;
			border-radius: 20rpx;
			margin: 0 auto 32rpx;
			justify-content: space-between;
			padding: 20rpx 0;
			align-items: center;

			.shop-buy-shopping>view {
				text-align: left;
				width: 60%;
			}

			.text {
				padding-left: 40rpx;
				text-align: left;

				.sum-price {
					color: #999;
					padding: 10rpx 0;

					span {
						color: #000;
					}

					text {
						color: #cd001e;
					}
				}
			}

			.btn-box {
				padding-right: 40rpx;

				.btn {
					margin-left: 0;
					margin-right: 0;
					font-size: 26rpx;
					background: #FFFBFC;
					color: #D00726;
				}
			}
		}
	}

	.no-data {
		background: none;
	}
</style>
