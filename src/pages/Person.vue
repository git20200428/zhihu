<template>
  <Nav/>
  <div class="base-info" v-if="info">
    <img :src="info.pic" alt="" @click="$router.push('/updatePerson')">
    <p>{{info.name}}</p>
  </div>
  <van-cell-group>
    <van-cell title="我的收藏" is-link url="#/store"></van-cell>
    <van-cell title="退出登录" @click="signout"></van-cell>
  </van-cell-group>
</template>

<script>
  import Nav from "@/components/Nav"
  import {useRouter} from "vue-router"
  import {useStore} from "vuex"
  import {Toast} from "vant"
  import {computed, onBeforeMount} from "vue"

  export default {
    name: "Person",
    components: {Nav},
    setup(){
      const router = useRouter(),
            store = useStore();

      let info = computed(()=>{
        let {isLogin, info} = store.state;
        if(isLogin && info){
          return info;
        }
        return null;
      });
      onBeforeMount(()=>{
        let {isLogin, info} = store.state;
        if(isLogin === null) store.dispatch("changeIsLoginAsync");
        if(info === null) store.dispatch("changeInfoAsync");
      });
      const signout = ()=>{
        Toast("小主，你已经安全退出~");
        localStorage.removeItem('token')
        store.commit('changeIsLogin', null);
        store.commit("changeInfo",null);
        store.commit("changeStoreList",null);
        router.replace('/login');
      }
      return {
        signout,
        info
      }
    }
  }
</script>

<style lang="less" scoped>
  .base-info{
    box-sizing: border-box;
    margin: 20px 0;

    img{
      height: 150px;
      width: 150px;
    }
  }
</style>