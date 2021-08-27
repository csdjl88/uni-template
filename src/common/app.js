import store from '../store'
import {
	getTabBarLinks,
	inArray,
	isEmpty,
	urlEncode
} from "./common";

/**
 * 获取当前运行的终端(App H5 小程序)
 * https://uniapp.dcloud.io/platform
 */
export const getPlatform = () => {
	// #ifdef APP-PLUS
	const platform = 'App'
	// #endif
	// #ifdef APP-PLUS-NVUE
	const platform = 'App'
	// #endif
	// #ifdef H5
	const platform = 'H5'
	// #endif
	// #ifdef MP-WEIXIN
	const platform = 'MP-WEIXIN'
	// #endif
	// #ifdef MP-ALIPAY
	const platform = 'MP-ALIPAY'
	// #endif
	// #ifdef MP-BAIDU
	const platform = 'MP-BAIDU'
	// #endif
	// #ifdef MP-TOUTIAO
	const platform = 'MP-TOUTIAO'
	// #endif
	// #ifdef MP-QQ
	const platform = 'MP-QQ'
	// #endif
	// #ifdef MP-360
	const platform = 'MP-360'
	// #endif
	return platform
}


/**
 * 显示成功提示框
 */
export const showSuccess = (msg, callback) => {
	uni.showToast({
		title: msg,
		icon: 'success',
		mask: true,
		duration: 1500,
		success() {
			callback && callback()
		}
	})
}

/**
 * 显示失败提示框
 */
export const showError = (msg, callback) => {
	uni.showModal({
		title: '友情提示',
		content: msg,
		showCancel: false,
		success(res) {
			callback && callback()
		}
	})
}

/**
 * 显示纯文字提示框
 */
export const showToast = (msg) => {
	uni.showToast({
		title: msg,
		icon: 'none',
	})
}
/**
 * 生成转发的url参数 
 */
export const getShareUrlParams = (params) => {
	return urlEncode({
		...params
	})
}

// 分享
export const overShare = () => {
		wx.onAppRoute(function(res) {
			//获取加载的页面
			let pages = getCurrentPages(),
				//获取当前页面的对象
				view = pages[pages.length - 1],
				data;
			if (view) {
				data = view.data;
				if (!data.isOverShare) {
					data.isOverShare = true;
					view.onShareAppMessage = function() {
						//分享配置
						return {
							title: data.title, // 子页面的title
							path: view['route']
						};
					}
				}
			}
		})
}

/**
 * 验证是否已登录
 */
export const checkLogin = () => {
	return !!store.getters.token
}

/**
 * 显示加载中动画
 * @param title
 */
export const showLoading = (title = "加载中") => {
	uni.showLoading({
		title: title,
		mask: true
	});
}

/**
 * 隐藏加载中
 */
export const hideLoading = () => {
	uni.hideLoading();
}

/**
 * 跳转到指定页面url
 * 支持tabBar页面
 * @param {string}  url
 * @param {object}  query
 */
export const navTo = (url, query = {}) => {
	if (!url || url.length == 0) {
		return false
	}
	// tabBar页面, 使用switchTab
	if (inArray(url, getTabBarLinks())) {
		uni.switchTab({
			url: `/${url}`
		})
		return true
	}
	// 生成query参数
	const queryStr = !isEmpty(query) ? '?' + urlEncode(query) : ''
	// 普通页面, 使用navigateTo
	uni.navigateTo({
		url: `${url}${queryStr}`,
		animationType: "pop-in",
		animationDuration: 300
	})
	return true
}
//小程序太阳码扫码指定页面 
export const getOptionsQS = (options, name, defVal, sKey = '') => {
  try {
    let optionsq = options && options.q && typeof(options.q) === 'string'
    let optionqueryscene = options && options.query && options.query.scene && typeof(options.query.scene) === 'string'
    let optionscene = options && options.scene && typeof(options.scene) === 'string'
    if (optionsq || optionscene || optionqueryscene) {
      wx.removeStorageSync('userSession')
      let url = null
      if (optionsq) {
        url = decodeURIComponent(options.q)
      } else if (optionscene) {
        url = decodeURIComponent(options.scene)
      } else if (optionqueryscene) {
        url = decodeURIComponent(options.query.scene)
      }
      if (url !== null) {
        let nameReg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
        let qsArr = url.match(nameReg)
        if (qsArr != null) {
          return qsArr[2]
        } else if ( sKey !== '') {
          return getOptionsQS(options, sKey, defVal)
        }
      }
     }
     return defVal
  } catch (err) {
    console.log('=========get options q error')
    console.log(err)
    return defVal
  }
}