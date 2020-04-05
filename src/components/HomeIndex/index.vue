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
    <div class="bars">
      <van-icon name="bars" @click="clickBars" />
    </div>
    <!-- tab标签栏 -->
    <van-tabs v-model="active" sticky swipeable animated>
      <van-tab v-for="item in channle" :title="item.name" :key="item.id">
        <!-- 点击打开频道 -->

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

    <!-- popup弹层 -->
    <van-popup
      v-model="channel_isShow"
      round
      position="bottom"
      :style="{ height: '95%' }"
      closeable
    >
      <div class="popUp_box">
        <van-cell title="我的频道" :border="false">
          <van-button type="danger" size="mini">编辑</van-button>
        </van-cell>
        <van-grid :column-num="3" :border="false">
          <van-grid-item v-for="(value,index) in this.channle" :key="index" :text="value.name" />
        </van-grid>
        <van-cell title="推荐频道" :border="false" />
        <van-grid :column-num="3" :border="false">
          <van-grid-item @click="addChannel(value)" v-for="(value,index) in getRecommendChannels" :key="index" :text="value.name" />
        </van-grid>
      </div>
    </van-popup>
    <!-- /popup弹层 -->
  </div>
</template>

<script>
import { getChannel, getArticelsList, getAllChannels } from '@/api/article'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channle: [],
      list: [],
      loading: false,
      finished: false,
      //   refLoading: true
      channel_isShow: false,
      allChannel: []
    }
  },
  watch: {
    channle (newValue, oldValue) {
      console.log(newValue)
      setItem('channels', newValue)
    }
  },
  methods: {
    async getChannelData () {
      let channle = []
      const a = getItem('channels')
      if (a) {
        channle = a
      } else {
        const { data } = await getChannel()
        channle = data.data.channels
      }

      channle.forEach(ele => {
        ele.article = []
        ele.time = null
        ele.refLoading = false
      })
      this.channle = channle
    //   console.log(this.channle)
    },
    async getAllChannels () {
      const { data } = await getAllChannels()
      data.data.channels.forEach(ele => {
        ele.article = []
        ele.refLoading = false
        ele.time = null
      })
      this.allChannel = data.data.channels
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
    },
    // 点击clickBars 弹出层
    clickBars () {
      this.channel_isShow = true
    },
    // 添加频道
    addChannel (value) {
      this.channle.push(value)
    }
  },
  created () {
    this.getChannelData()
    this.getAllChannels()
  },
  computed: {
    getRecommendChannels () {
    //   const arr = []
    //   this.allChannel.forEach(i => {
    //     const res = this.channle.find(item => item.id === i.id)
    //     console.log(res)

      //     if (!res) {
      //       arr.push(res)
      //     }
      // for (let item = 0; item < this.channle.length; item++) {
      //   if (i.id !== item.id) {
      //     arr.push(item)
      //   }
      // }
      //   })
      //   return arr
      const arr = []
      // 遍历所有频道
      this.allChannel.forEach(channel => {
      // 判断 channel 是否存在我的频道中
      // 如果不存在，就证明它是剩余推荐的频道

        // 数组的 find 方法
        // 它会遍历数组，每遍历一次，它就判定 item.id === channel.id
        // 如果 true，则停止遍历，返回满足该条件的元素
        // 如果 false，则继续遍历
        // 如果直到遍历结束都没有找到符合 item.id === channel.id 条件的元素，则返回 undefined
        const ret = this.channle.find(item => item.id === channel.id)
        if (!ret) {
          arr.push(channel)
        }
      })

      return arr
    // return 所有频道 - 我的频道
    }
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

.popUp_box {
  margin-top: 50px;
}
body {
    position: relative;
}
.bars {
  font-size: 30px;
  position: absolute;
  z-index: 3;
  right: 0;
  top: 50px;
}
</style>
