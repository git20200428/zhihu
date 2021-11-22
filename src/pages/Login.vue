<template>
  <Nav/>
  <van-form ref="formBox" @submit="submit">
    <van-cell-group inset>
      <van-field v-model="phone" center label="手机号" label-width="50px"
                 name="phone"
                 :rules="[{required:true,message:'手机号为必填字段'},
                 {pattern:regPhone,message:'手机号不符合规范'}]">
        <template #button>
          <van-button size="small" :type="enable?'primary':''" @click="sendCode"
          :disabled="!enable" class="form-btn">{{enable? '发送验证码' : time}}</van-button>
        </template>
      </van-field>
     <van-field v-model="code" label="验证码" label-width="50px"
                 :rules="[{required:true,message:'验证码为必填字段'},
                 {pattern:regCode,message:'验证码不符合规范'}]"/>
    </van-cell-group>
    <div style="margin:20px 40px">
      <van-button round block type="primary" native-type="submit">立即登录/注册</van-button>
    </div>
  </van-form>
</template>

<script>
import Nav from "@/components/Nav";
import {reactive, ref, toRefs} from "vue";
import api from "@/api/index"
import {Toast} from "vant"
import {useStore} from "vuex"
import {useRouter} from "vue-router"
export default {
name: "Login",
  components: {Nav},
  setup() {
    const store = useStore(),
          router = useRouter();
    const state = reactive({
      phone: "",
      code: "",
      enable: true,
      time: "15s"
    });
    const formBox = ref(null);

    const sendCode = async () => {
      try {
        //校验手机号
        await formBox.value.validate("phone");
        //发送请求
        let { code } = await api.phoneCode(state.phone);
        if(+code !== 0){
          Toast("小主，当前网络繁忙，请稍后重试！！！");
        }
        //开启按钮倒计时
        state.enable = false;
        state.time = "15s";
        let n = 15;
        let timer = setInterval(()=>{
            n --;
            if(n === 0){
              clearInterval(timer);
              state.enable = true;
            }
            state.time = `${n}s`;
        }, 1000);
      }catch(err){
        console.log(err)
      }
    }
    const submit = async ()=>{
      let {code, token} = await api.login(state.phone,state.code);
      if(+code !== 0){
        Toast("小主，很遗憾，登录失败了");
        formBox.value.resetValidation();
        state.code = "";
        return;
      }
      localStorage.setItem('token',token);
      store.commit("changeIsLogin",true);
      await store.dispatch("changeInfoAsync");
      Toast("小主，欢迎回来");
      router.back();
    }
    return{
      ...toRefs(state),
      formBox,
      regPhone:/^1\d{10}$/,
      regCode:/^\d{6}$/,
      sendCode,
      submit
    }
  }
}
</script>

<style lang="less" scoped>
  .van-form{
    margin-top: 30px;

    .form-btn{
      width: 156px;
    }
  }
</style>