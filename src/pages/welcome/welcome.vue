<template>
	<view>
		<u-image :src="'https://img2.baidu.com/it/u=4066215404,1722966478&fm=26&fmt=auto&gp=0.jpg?v=' +  randomNum" mode="widthFix"
			:fade="true" duration="1200">
			<u-loading slot="loading"></u-loading>
		</u-image>
	</view>
</template>

<script>
	import {
		rndNum,
		getAgentId,
		textIsEmpty
	} from "@/common/common.js"
	import {
		checkVersion
	} from "@/api/api.js";
	export default {
		data() {
			return {
				randomNum: rndNum(),
				baseUrl: process.uniEnv.BASE_API,
			};
		},
		components: {},
		props: {},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {

		},
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {

		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			const self = this;
			//首页地址
			let url = '/pages/mall/mall';
			//设定一个定时器。在定时3秒到期以后执行注册的回调函数
			setTimeout(function() {
				// agentId = 3 为安卓APP端
				const agentId = getAgentId();
				if (agentId === 3) {
					//安卓端app检测有没有上线新版本
					checkVersion().then(res => {
						//code message update_url
						//message="检测到新版本2.42,请更新"
						//update_url=/static/app-download/index.html
						if (res.code === 0) {
							//组装版本号
							let vers = "";
							if (!textIsEmpty(res.update_version)) {
								vers = res.update_version;
							}
							// 弹出对话框
							uni.showModal({
								title: '发现新版本' + vers,
								content: "1、修复一些已知的问题\n" + "2、优化功能体验",
								cancelText: "稍后再说",
								confirmText: "立即更新",
								success: function(resp) {
									if (resp.confirm) {
										//用户点击了“立即更新”按钮，跳转到安卓app下载网址
										//安卓app下载网址
										const testUrl = self.baseUrl + res.update_url;
										//调用外部浏览器打开指定的URL
										plus.runtime.openURL(testUrl);
										//退出app，没有效果
										plus.runtime.quit();
									} else if (resp.cancel) {
										//用户点击了“稍后再说”按钮，跳转到首页
										uni.switchTab({
											url: url
										});
									}
								}
							});
						} else {
							//res.code===1，跳转到首页
							uni.switchTab({
								url: url
							});
						}
					}).catch(error => {
						//catch()方法用来处理 Promise 被拒绝的情况，相当于 then(undefined, onRejected)
						//Error: Request failed with status code 500或404或Network Error
						self.$toast("系统繁忙，请稍后再试!");
						//跳转到首页
						uni.switchTab({
							url: url
						});
					}).finally(() => {
						//finally()方法用来指定在 promise 结束时，无论结果是 fulfilled 或者是 rejected，
						//都会执行的回调函数。这样可以避免同样的语句需要在 then() 和 catch() 中都要写一次的情况
					});
				} else {
					//跳转到首页 H5端或IOS端
					uni.switchTab({
						url: url
					});
				}
			}, 3000);
		},
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {}
	}
</script>

<style>
	u-image {
		height: 100vh;
		width: 100vw
	}
</style>
