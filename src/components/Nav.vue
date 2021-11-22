<template>
  <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="handle"></van-nav-bar>
</template>

<script>
  import {useRouter} from 'vue-router'
  export default {
    name: "Nav",
    props: {
      title:{
        type:String,
        default:""
      }
    },
    setup(){
      const router = useRouter();
      const handle = ()=>{

        router.back();
      }

      return {
        handle,
      }
    }
  }
</script>

<style lang="less" scoped>
  /deep/ .van-icon,
  /deep/ .van-nav-bar__text {
    color: #000;
  }
</style>