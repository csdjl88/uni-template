# my-project

## Project setup
```
npm install --registry=https://registry.npm.taobao.org/
```

### Compiles and hot-reloads for development
```
npm run dev:h5
npm run dev:mp-weixin
```

### Compiles and minifies for production
```
npm run build:mp-weixin
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 代码编写规范
##### https://www.yuque.com/lingxiteam/ly4wok/mkcqv2#v22qmb

#### 5.全局函数

- 页面跳转 this.$navTo

```
//this.$navTo
// 目标链接
let url = "/pages/activity/category/category"
// 所需参数
let params = {
   "activeId": activeId
}
if (url && activeId) {
   this.$navTo(url, params)
}
```

- 提示

```
this.$success  //操作成功
this.$error  //操作失败
this.$toast //普通文字提示
```

-   加载效果

```
this.$loading //数据加载中
this.$hideloading //隐藏数据加载中

// 数据列表
<view class="loadMore">
	<u-loadmore :status="loadingStatus" :load-text="loadText"/>
</view>
data(){
	return {
	   	loadingStatus: "loading",
     	loadText:this.$loadText,
	}
}

//页面加载中
<view class="container-box">
    <block v-if="displayFlag">
    	...
    </block>
    <block v-else>
    	<page-loading></page-loading>
    </block>
</view>

import pageLoading from '@/components/pageLoading/pageLoading'
displayFlag: false, //显示页面
components:{pageLoading}
```

-   跳转 封装方法

```
<navigator :url="'/pages/pop/shop_list/shop_list'" 
         hover-class="none"
         animation-type="pop-in"
         animation-duration="300">
</navigator>
```
### Mock文档
##### http://mockjs.com/0.1/

