<template>
  <div class="login_box">
    <!-- navbar栏 -->
    <van-nav-bar class="tab" title="登录" @click-left="onClickLeft" @click-right="onClickRight" />
    <!-- /navbar栏 -->

    <!-- 输入框 -->
    <van-cell-group style="padding:0 10px">
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field
        left-icon="phone-o"
        v-model="tel"
        placeholder="请输入手机号"
        size="large"
        autofocus
        required
      />
      <van-field left-icon="contact" v-model="value" placeholder="请输入验证码" size="large" required />
    </van-cell-group>
    <!--/ 输入框 -->

    <!-- 提交按钮 -->
    <div class="go_box">
      <van-button class="btn_go" size="large" round>登录</van-button>
    </div>
    <!-- /提交按钮 -->

    <!-- 底部链接 -->
    <div class="privacy">隐私</div>
    <!-- /底部链接 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      tel: '',
      value: ''
    }
  }
}
</script>

<style lang='less'>
.van-nav-bar{
  background-color: #3296fa;
  font-size: 25px;

}
.van-nav-bar__title {
  color: white;
}
.go_box {
  padding: 0 10px;
}
.btn_go {
  // margin: 100px 10px 0px 10px;
  margin-top: 100px;
  background: #3296fa;
}
.login_box {
  // position: relative;
  .privacy {
    color: #ccc;
    font-size: 18px;
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -20px;
  }
}
</style>
