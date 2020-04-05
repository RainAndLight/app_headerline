<template>
  <div>
    <!-- navbar -->
    <van-nav-bar fixed>
      <template #title>
        <!-- <div class="top_search"> -->
        <!-- <van-icon name="search" size="28" /> -->
        首页
        <!-- </div> -->
      </template>
    </van-nav-bar>

    <!-- tab标签栏 -->
    <van-tabs v-model="active" sticky swipeable animated>
      <van-tab v-for="item in channle" :title="item.name" :key="item.id">
        <!-- list栏 -->
        <!-- 下拉刷新 -->

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-pull-refresh v-model="channle[active].refLoading" @refresh="onRefresh">
            <van-cell
              v-for="(item,index) in channle[active].article"
              :key="index"
              :title="item.title"
            >
              <div slot="label">
                <van-grid>
                  <van-grid-item v-for="(src,index) in item.cover.images" :key="index">
                    <van-image height="80" :src="src" />
                  </van-grid-item>
                </van-grid>
                <div class="listInfo">
                  <span>{{ item.aut_name }}</span>
                  <span>{{ item.comm_count }}评论</span>
                  <span>{{ item.pubdate | relativeTime }}</span>
                </div>
              </div>
            </van-cell>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
    <!-- fild栏 -->
  </div>
</template>

<script>
import { getChannel, getArticelsList } from '@/api/article'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channle: [],
      list: [],
      loading: false,
      finished: false
      //   refLoading: true
    }
  },
  methods: {
    async getChannelData () {
      const { data } = await getChannel()
      const channle = data.data.channels
      channle.forEach(ele => {
        ele.article = []
        ele.time = null
        ele.refLoading = false
      })
      this.channle = data.data.channels
      console.log(this.channle)
    },
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.channle[this.active].push(this.channle[this.active].length + 1)
      //     }

      //     // 加载状态结束
      //     this.loading = false

      //     // 数据全部加载完成
      //     if (this.channle[this.active].length >= 40) {
      //       this.finished = true
      //     }
      //   }, 2000)
      //   setTimeout(() => {
      //     for (let i = 0; i < 10; i++) {
      //       this.channle[this.active].article.push(this.channle[this.active].article.length + 1)
      //     }
      //     this.loading = false
      //     console.log(this.channle, '添加数据')
      //     if (this.channle[this.active].article.length >= 40) {
      //       this.channle = true
      //     }
      //   }, 1000)
      const thisArtice = this.channle[this.active]
      const { data } = await getArticelsList({
        channel_id: thisArtice.id,
        timestamp: thisArtice.time || Date.now(),
        with_top: 1
      })
      const list = data.data.results
      thisArtice.article.push(...list)

      this.loading = false

      //   判断是否需要继续更新
      if (data.data.pre_timestamp) {
        thisArtice.time = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      console.log(111)
      const thisArtice = this.channle[this.active]
      const { data } = await getArticelsList({
        channel_id: thisArtice.id,
        timestamp: Date.now(),
        with_top: 1
      })
      thisArtice.article.unshift(...data.data.results)
      this.channle[this.active].refLoading = false
      this.$toast('刷新成功')
    }
  },
  created () {
    this.getChannelData()
  }
}
</script>

<style >
.top_search {
  margin-top: 7px;
  width: 200px;
  height: 30px;
  border: 1px solid #fff;
}
.van-sticky {
  margin-top: 46px;
}
.listInfo span {
    margin-right: 10px;
    margin-top: 10px;
}
.van-tabs /deep/ .van-tabs__wrap--scrollable {
    position: fixed;
    top: 46px;
    left: 0;
    right: 16px;
    z-index: 2;
  }

  .van-tabs /deep/ .van-tabs__content {
    margin-top: 90px;
    margin-bottom: 50px;
  }
</style>
