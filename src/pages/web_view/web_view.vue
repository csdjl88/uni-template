<template>
	<view class="webview">
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: null
			}
		},
		onLoad(options) {
			let {
				id,
				url,
				session
			} = options
			let params = {
				id: id,
				session:session
			};
			let arr = []
			for (let i in params) {
				if (params[i]) {
					arr.push(i + '=' + params[i])
				}
			}
			// url  = url + "?" +arr.join('&')
			if (arr.length > 0) {
			   url = url + "?" + arr.join('&')
			}
			console.log(url)
			// console.log(111);
			// this.src = options.url.replace(/""/g, "");
			// this.src = JSON.parse(this.src);
			this.src = url;
		}
	}
</script>

<style>
</style>
