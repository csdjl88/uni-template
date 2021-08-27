<template>
    <view>
        <span>
            Hello World
        </span>
        <u-table>
            <u-tr class="u-tr">
                <u-th class="u-th">订单ID</u-th>
                <u-th class="u-th">时间戳</u-th>
                <u-th class="u-th">用户名</u-th>
                <u-th class="u-th">价格</u-th>
            </u-tr>
            <block v-for="(item,index) in list">
                <u-tr class="u-tr">
                    <u-td class="u-td">{{item.order_no}}</u-td>
                    <u-td class="u-td">{{item.timestamp}}</u-td>
                    <u-td class="u-td">{{item.username}}</u-td>
                    <u-td class="u-td">{{item.price}}</u-td>
                </u-tr>
            </block>

        </u-table>

    </view>
</template>

<script>
  import {fetchList} from "@/api/mock/mock.js";

  export default {
    data() {
      return {
        list: []
      };
    },
    components: {},
    props: {},
    created() {
    },
    onLoad() {
      this.getMockList()
    },
    methods: {
      getMockList() {
        fetchList().then((res) => {
          const {
            code,
            data
          } = res
          if (code === 1) {
            this.list = data.data_list
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
