<template>
    <view>
        <image class="mes-load" :src="baseUrl + imgUrl" mode="widthFix"/>
        <view class="load">加载中...</view>
    </view>
</template>

<script>
  export default {
    name: 'pageLoading',
    data() {
      return {
        baseUrl: process.uniEnv.BASE_API,
        imgUrl: "/static/images/loading.gif"
      };
    },
    components: {},
    props: {},
    created() {
    },
    onLoad() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

</style>
