import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import config from "@/api/config.js"
import {
	showErrorModel,
	islogin,
	getAgentId,
	textIsEmpty
} from "@/common/common.js"
import md from "@/common/md5.js"

//服务器地址
let BASE_API = process.uniEnv.BASE_API;
//接口地址
let apiUrl = "/upload-imgs/";


function uploadImg(options) {
	// 请求头配置
	let headConfig = {};
	if (store.state.user.token) {
		headConfig["session"] = store.state.user.token;
	}
	let timestamp = Date.parse(new Date());
	const agentId = getAgentId();
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: BASE_API + apiUrl,
			filePath: options.imgPath,
			name: 'image',
			header: headConfig,
			formData: options.formData,
			success(response) {
				//success：接口调用成功的回调函数
				resolve(response);
			},
			fail: (error) => {
				//fail：接口调用失败的回调函数
				reject(error);
			},
			complete: (res) => {
				//complete:接口调用结束的回调函数（调用成功、失败都会执行）
			}
		})
	});
}
export default uploadImg
