<template>
  <div class="login_box">
    <!-- navbar栏 -->
    <van-nav-bar title="登录" />
    <!-- /navbar栏 -->

    <!-- 登录表单 -->
    <ValidationObserver ref="loginRef">
      <!-- 输入框 -->
      <van-cell-group style="padding:0 10px">
        <ValidationProvider name="手机号" rules="required|max:11" v-slot="{ errors }">
          <!-- 输入手机号，调起手机号键盘 -->
          <van-field
            left-icon="phone-o"
            v-model="user.mobile"
            placeholder="手机号"
            size="large"
            required
            :error-message="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required|max:6" v-slot="{ errors }">
          <van-field
            left-icon="contact"
            v-model="user.code"
            placeholder="验证码"
            size="large"
            required
            :error-message="errors[0]"
            type="password"
          />
        </ValidationProvider>
        <!-- 提交按钮 -->
        <div class="go_box">
          <van-button @click="commit" class="btn_go" size="large" round>登录</van-button>
        </div>
        <!-- /提交按钮 -->
      </van-cell-group>
      <!--/ 输入框 -->
    </ValidationObserver>
    <!-- 底部链接 -->
    <div class="privacy">隐私</div>
    <!-- /底部链接 -->
  </div>
</template>

<script>
// import request from '@/utils/requset'
import { Toast } from 'vant'
import { login } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async commit () {
      const isVail = await this.$refs.loginRef.validate()
      if (!isVail) { return }
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      })
      try {
        // const data = await request({
        //   method: 'POST',
        //   url: '/app/v1_0/authorizations',
        //   data: { mobile: this.tel, code: this.code }
        // })

        // 封装api
        const data = await login(this.user)
        console.log(data)

        // loding 结束
        toast.clear()
        Toast.success({
          message: '登录成功',
          duration: '2000'
        })
        this.$router.push('/')
      } catch (error) {
        if (error.response && error.response.status === 400) {
          Toast.fail('您的输入有误')
        }
      }
    }
  }
}
</script>

<style lang='less' scope>
.go_box {
  padding: 0 10px;
  .van-button--default {
    color: white;
  }
}
.btn_go {
  margin-top: 100px;
  background: #3296fa;
}
.privacy {
  color: #ccc;
  font-size: 18px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -20px;
}
</style>
