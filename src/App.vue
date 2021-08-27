<script>
  import {
    getOptionsQS
  } from "@/common/app.js";
  import {
    getAgentId
  } from "@/common/common.js";
  //#ifdef APP-PLUS
  const jpushModule = uni.requireNativePlugin("JG-JPush")
  //#endif
  export default {
    computed: {},
    onLaunch: function () {
      console.log('App Launch')
      const agentId = getAgentId();
      if (agentId === 3) {
        plus.runtime.getProperty(plus.runtime.appid, function (info) {
          uni.setStorageSync('appVersion', info.version);
        });
      } else if (agentId === 1) { //小程序端 查看版本是否要更新
        const updateManager = uni.getUpdateManager();
        let updFlag = false
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          updFlag = res.hasUpdate
        });
        updateManager.onUpdateReady(function (res) {
          uni.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            }
          });

        });
        updateManager.onUpdateFailed(function (res) {
          // 新的版本下载失败
        });
      }
      this.JYPushInit()
    },
    onShow: function (options) {
      let inviteCode = getOptionsQS(options, 'invite_code', 0, 'i')
      if (inviteCode) {
        uni.setStorageSync('inviteCode', inviteCode)
      } else {
        uni.removeStorageSync('inviteCode')
      }
    },
    onHide: function () {
      console.log('App Hide')
    },
    methods: {
      JYPushInit() {
        //#ifdef APP-PLUS
        const self = this
        jpushModule.requestNotificationAuthorization((result) => {
          let {status} = result
          if (status < 2) {
            uni.showModal({
              title: '提示',
              content: '您还没有打开通知权限',
              confirmText: "去打开",
              cancelText: "不考虑",
              success: function (res) {
                if (res.confirm) {
                  jpushModule.openSettingsForNotification((result) => {
                    this.showToast(result)
                  })
                }
              }
            });
          }
        })
        //初始化服务
        jpushModule.initJPushService();
        //debug模式
        // jpushModule.setLoggerEnable(true);
        //监听推送消息
        jpushModule.addNotificationListener(result => {
          const {
            messageID,
            title,
            content,
            extras
          } = result
          //分为notificationArrived和notificationOpened两种
          const {notificationEventType} = result
          // console.log(notificationEventType)
          if (notificationEventType == "notificationOpened") {
            this.goUri(extras)
          }
        });
        //#endif
      },

      goUri(data) {
        const self = this;
        let type = parseInt(data.skip_type)
        switch (type) {
          case 0:
            return; //不跳转
          case 1:
            self.launchMiniProgram(data);
            break; //跳转外部页面
          case 2:
            self.$navTo(data.uni_link)
            break; //跳转内部小程序页面
          case 3:
            uni.navigateTo({
              url: '/pages/web_view/web_view?url=' + data.link_url
            });
            break; // 跳转外链
        }
      },
      hasWechat() {
        return plus.runtime.isApplicationExist({
          pname: 'com.tencent.mm',
          action: 'weixin://'
        });
      },
      launchMiniProgram(item) {
        const self = this
        if (this.hasWechat()) {
          if (self.sweixin) {
            self.sweixin.launchMiniProgram({
              id: item.wx_account_id,
              path: item.uni_link
            }, function () {
              self.$toast('成功跳转')
            }, function (e) {
              plus.nativeUI.alert('跳转失败!' + e);
            });
          } else {
            plus.nativeUI.alert('当前环境不支持微信操作!');
          }
        } else {
          plus.nativeUI.alert('当前环境未安装微信!');
        }
      },
    }
  }
</script>
<style lang="scss">
	@import "uview-ui/index.scss";

	// uview的 SubmitBar 提交订单栏
	.navigation {
		display: flex;
		justify-content: space-evenly;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;

		.left {
			display: flex;
			font-size: 20rpx;

			.item {
				margin: 0 30rpx;
				text-align: center;

				.text {
					color: #CD001E
				}
			}
		}

		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;

			.btn {
				line-height: 66rpx;
				padding: 0 30rpx;
				border-radius: 36rpx;
				color: #ffffff;
			}

			.cart {
				color: #cf0021;
				background: #fcf0f2;
				margin-right: 30rpx;
			}

			.buy {
				color: #fcf0f2;
				background: #cf0021;
			}
		}
	}
</style>
<style>
	@import './common/css/uni.css';

	page {
		background-color: #f5f5f5;
	}

	.wh100 {
		width: 100%;
		height: 100%;
	}

	/* 单行文本超出隐藏,要使用的div必须要有宽和高*/
	.ellipsis-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	/* 两行文本超出隐藏,要使用的div必须要有宽和高 */
	.ellipsis-2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	/* 空白页 */
	.no-data {
		width: 100%;
		background: #FFFFFF;
		padding-bottom: 100rpx;
		text-align: center;
	}

	.no-data .no-data-title {
		color: #9b9b9b;
		margin-top: 30rpx;
		font-size: 30rpx;
	}

	.no-data .cart-image {
		/*width: 140px;*/
		/*height: 140px;*/
		margin-top: 100rpx;
	}

	/*.no-tips {  background: #fff;  height: auto;  text-align: center;  width: 100%;  overflow: hidden;  color: #ccc;  margin-top:1px;}*/
	/*.no-tips label{  display: block;  font-size: 30rpx;  margin-top: 30rpx;}*/
	.goods-title {
		color: #656565;
		font-size: 25rpx;
		line-height: 1.6;
		overflow: hidden;
		text-overflow: clip;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		text-align: left;
	}

	.self {
		display: initial;
		border-radius: 5rpx;
		font-size: 20rpx;
		border: 1rpx solid #cf0022;
		color: #cf0022;
		padding: 0 4rpx;
	}

	.block {
		background-color: #F5F5F5;
		padding: 10rpx 0;
		width: 100%;
	}

	/* 产品详情 页面加载中样式 */
	.mes-img {
		background: #fff;
		height: 100vh;
		text-align: center;
		width: 100%;
		overflow: hidden;
		font-size: 26rpx;
		margin-top: 1px;
	}

	.btn-go {
		border: 1rpx solid #cd001e;
		color: #cd001e;
		font-size: 34rpx;
		width: 34%;
		margin: 20rpx auto 0;
		padding: 14rpx 0;
		border-radius: 10rpx;
	}

	.mes-load {
		width: 160rpx;
		height: 160rpx;
		margin-top: 30vh
	}

	.load {
		font-size: 26rpx;
		color: #999;
	}

	.swiper_box {
		background-color: #fff;
		height: 220px;
		padding:20rpx 0;
	}

	.swiper_box image {
		width: 100%;
		height: 100%;
	}

	.loadMore {
		padding: 20rpx 0;
		margin: 0 auto;
	}

	.container-box {
		text-align: center;
	}
</style>
