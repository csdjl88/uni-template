<template>
    <navigator :url="url"
               hover-class="none"
               animation-type="pop-in"
               animation-duration="300">
        <slot></slot>
    </navigator>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    components: {},
    props: {
      url: {
        type: String,
        default: ''
      },
    },
    created() {
    },
    onLoad() {

    },
    methods: {}
  }
</script>

<style lang="scss" scoped>

</style>
