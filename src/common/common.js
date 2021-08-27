import store from '@/store'
import {getPlatform} from "./app";

/**
 * 逗号参数重新组装
 * @param dataList
 * @param dots
 * @returns {string}
 */
export function getStrFromStr(dataList, dots) {
  dots = dots ? dots : ','
  let dataStr = ''
  if (dataList && dataList.length > 0) {
    for (let item of dataList) {
      dataStr += item + dots
    }
    dataStr = dataStr.substring(0, dataStr.lastIndexOf(dots))
  }
  return dataStr
}

/**
 * 对象转URL
 * @param params
 * @returns {string}
 * @constructor
 */
export function UrlArrToStr(params) {
  // let arr = []
  // for (let i in params) {
  //   if (params[i]) {
  //     arr.push(i + '=' + params[i])
  //   }
  // }
  // return arr.join('&')

  const result = []
  for (const key in params) {
    const item = params[key]
    if (!item) {
      continue
    }
    if (isArray(item)) {
      item.forEach(val => {
        result.push(key + '=' + val)
      })
    } else {
      result.push(key + '=' + item)
    }
  }
  return result.join('&')
}

/**
 * 获取随机数
 * @returns {number}
 */
export function rndNum() {
  let rnd = 0;
  let n = 10
  for (let i = 0; i < n; i++) {
    rnd += Math.floor(Math.random() * 10);
  }
  return rnd;
}

/**
 * 替换图片链接
 * @param html
 * @param domain
 * @returns {*}
 */
export function rebuildImgUrl(html, domain) {
  const imgReg = /<img.*?(?:>|\/>)/gi;
  // 匹配src属性
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
  if (html) {
    let arr = html.match(imgReg);
    if (arr && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        let src = arr[i].match(srcReg);
        // 替换链接图片地址
        if (src[1] && src[1].indexOf('http') === -1) {
          html = html.replace('src="' + src[1] + '"', 'src="' + domain + src[1] + '"')
        }
      }
    }
  }
  return html
}


/**
 * 对象转换成路径参数
 * @param param
 * @param key
 * @param encode
 * @returns {string}
 */
export function urlEncode(param, key, encode) {
  if (param == null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
  } else {
    for (let i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
}


/**
 * 登录与否 并跳转登录界面
 */
export function islogin() {
  // !store.state.user.user
  if (!store.getters.token) {
    uni.redirectTo({
      url: "/pages/user/login/login"
    })
  }
}

/**
 * 判断一个字符串字段或文本字段是否为空：分为null和""两种情况
 * @param text
 * @returns {boolean}
 */
export function textIsEmpty(text) {
  let isEmpty = true;
  if (null !== text && "" !== text && undefined !== text) {
    isEmpty = false;
  }
  return isEmpty;
}

/**
 * 获取当前运行环境
 * @returns {number}
 */
export function getAgentId() {
  //WECHAT_AGENT = "0"  //MP_AGENT = "1"     //ANDROID_AGENT = "3"
  //IOS_AGENT = "2"  //PC_AGENT = "4"   //WAP_AGENT = "5"
  let platform = getPlatform()
  let agentId = 1 //H5
  if (platform === "App") {
    if (uni.getSystemInfoSync().platform === 'android') {
      agentId = 3 //安卓
    } else if (uni.getSystemInfoSync().platform === 'ios') {
      agentId = 2 //IOS
    }
  } else if (platform === "MP-WEIXIN") {
    agentId = 1 //微信小程序
  }
 /* else if (platform === "H5"){
    agentId = 5
  }*/
  return agentId
}

/**
 * tabBar页面路径列表 (用于链接跳转时判断)
 * tabBarLinks为常量, 无需修改
 */
export const getTabBarLinks = () => {
  const tabBarLinks = [
    'pages/mall/mall',
    'pages/goods/goods_category/goods_category',
    'pages/cart/cart',
    'pages/user/user_center/user_center'
  ]
  return tabBarLinks
}
/**
 * 判断是否为数组
 * @param {*} array
 */
export const isArray = (array) => {
  return Object.prototype.toString.call(array) === '[object Array]'
}
/**
 * 是否在数组内
 */
export const inArray = (search, array) => {
  for (var i in array) {
    if (array[i] == search) return true
  }
  return false
}
/**
 * 判断是否为对象
 * @param {*} object
 */
export const isObject = (object) => {
  return Object.prototype.toString.call(object) === '[object Object]'
}
/**
 * 判断是否为空对象
 * @param {*} object 源对象
 */
export const isEmptyObject = (object) => {
  return Object.keys(object).length === 0
}
/**
 * 判断是否为空
 * @param {*} object 源对象
 */
export const isEmpty = (value) => {
  if (isArray(value)) {
    return value.length === 0
  }
  if (isObject(value)) {
    return isEmptyObject(value)
  }
  return !value
}

export function showErrorModel(content, isBack) {
  uni.showModal({
    title: "",
    content: content,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        if (isBack == true) {
          uni.navigateBack({
            delta: 1
          })
        }
      } else if (res.cancel) {
      }
    }
  });
}


/**
 * 节流函数
 * @param {function} callback
 * @param {number} time
 * @returns {function}
 */
export function throttle(callback, time) {
  let start = 0;
  return (...args)=> {
    let now = Date.now();
    if(now - start > time) {
      callback.call(this, ...args);
      start = now;
    }
  }
}
