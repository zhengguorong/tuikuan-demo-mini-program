<template>
  <view class="index">
    <view class="counter">哈哈</view>
    <Empty content="空白内容"/>
    <view class="container">
      <view class="desc">吃</view>
    </view>
  </view>
</template>

<script lang="ts">
import './index.scss'
import Empty from '@/components/Empty/index.vue'

export default {
  name: 'Index',
  components: {
    Empty
  },
  setup() {

  }
}
</script>