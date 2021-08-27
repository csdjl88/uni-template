<template>
    <view class="container-box">
        <p>goods_category</p>
    </view>
</template>

<script>
  export default {
    data() {
      return {
        baseUrl: process.uniEnv.BASE_API,

      };
    },
    components: {},
    props: {},
    onShow() {

    },
    onLoad() {
    },
    onShareAppMessage: function () {
    },
    methods: {}
  }
</script>


<style lang="scss">
    .u-wrap {
        height: calc(100vh);
        /* #ifdef H5 */
        height: calc(100vh - var(--window-top));
        /* #endif */
        display: flex;
        flex-direction: column;
    }

    .u-search-box {
        padding: 18 rpx 16 rpx;
    }

    .u-menu-wrap {
        flex: 1;
        display: flex;
        overflow: hidden;
    }

    .u-search-inner {
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        padding: 10 rpx 16 rpx;
    }

    .u-search-text {
        font-size: 26 rpx;
        color: $u-tips-color;
        margin-left: 10 rpx;
    }

    .u-tab-view {
        width: 200 rpx;
        height: 100%;
    }

    .u-tab-item {
        height: 110 rpx;
        background: #f6f6f6;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 26 rpx;
        color: #444;
        font-weight: 400;
        line-height: 1;
    }

    .u-tab-item-active {
        position: relative;
        color: #CD001E;
        // font-size: 30rpx;
        // font-weight: 600;
        background: #fff;
    }

    .u-tab-item-active::before {
        content: "";
        position: absolute;
        border-left: 4px solid #CD001E;
        height: 46px;
        left: 0;
        // top: 39rpx;
    }

    .u-tab-view {
        height: 100%;
    }

    .right-box {
        background-color: #fff;
    }

    .page-view {
        padding: 16 rpx;
    }

    .class-item {
        margin-bottom: 30 rpx;
        background-color: #fff;
        border-radius: 8 rpx;
    }

    .item-title {
        font-size: 26 rpx;
        color: $u-main-color;
        font-weight: bold;
    }

    .item-title-image {
        width: 100%;
        height: 220 rpx;
    }

    .item-menu-name {
        font-weight: normal;
        font-size: 24 rpx;
        color: $u-main-color;
        text-align: center;
    }

    .item-container {
        display: flex;
        flex-wrap: wrap;
    }

    .thumb-box {
        width: 33.333333%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 20 rpx;
    }

    .item-menu-image {
        width: 100 rpx;
        height: 100 rpx;
    }

    .left-view {
        height: 50px;
        line-height: 50px;
        text-align: center;
        width: 100%;
        overflow: hidden;
        display: block;
        font-size: 14px;
    }
</style>
