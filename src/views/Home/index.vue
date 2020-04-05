<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item name='homeIndex' icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name='homeQuestion' icon="search">问答</van-tabbar-item>
      <van-tabbar-item name='homeMessage' icon="friends-o">消息</van-tabbar-item>
      <van-tabbar-item name='homeMy' icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style>
</style>
