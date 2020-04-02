<template>
  <div id="div">
    <router-view />
  </div>
</template>

<script>
import request from '@/utils/requset'

export default {
  name: 'app',
  methods: {
    async getChannles () {
      const { data } = await request({
        url: '/app/v1_0/channels'
      })
      console.log(data)
    }
  },
  created () {
    this.getChannles()
  }
}
</script>

<style>
</style>
