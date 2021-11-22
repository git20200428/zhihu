<template>
  <van-skeleton row="5" v-if="newsInfo===null"></van-skeleton>
<!--  <div class="content" v-else v-html="newsInfo.body">-->
  <div class="content" v-else >
    {{newsInfo.body}}
  </div>
  <div class="nav-box">
      <van-icon name="arrow-left" @click="handle"></van-icon>
      <van-icon name="comment-o" :badge="comments"></van-icon>
      <van-icon name="good-job-o" :badge="popularity"></van-icon>
      <van-icon name="star-o" color="#1989fa"></van-icon>
      <van-icon name="share-o"></van-icon>
  </div>
</template>

<script>
  import {useRouter,useRoute}  from "vue-router"
  import {reactive,toRefs,onBeforeMount,onBeforeUnmount} from "vue"
  import api from "@/api/index"
  export default {
    name: "Detail",
    setup(){
      const router = useRouter(),
          route = useRoute();
      const handle = ()=>{
        router.back();
      }
      let state = reactive({
        comments:0,
        popularity:0,
        newsInfo:null
      });

      onBeforeMount(async ()=>{
        let id = route.params.id
        let result = await api.queryNewsInfo(id);
        state.newsInfo = result;
        // let link = document.createElement('link');
        // link.id = "link";
        // link.rel = "stylesheet";
        // link.href = state.newsInfo.css[0];
        // document.head.appendChild(link);

        let {comments, popularity} = await api.queryNewsStory(id);
        state.popularity = popularity;
        state.comments = comments;

      });
      onBeforeUnmount(()=> {
        // let link = document.getElementById('link');
        // if(!link) return;
        // document.head.removeChild(link);
      });

      return {
        ...toRefs(state),
        handle
      }
    }
  }
</script>

<style lang="less" scoped>
  .content{
    background: #fff;
    padding-bottom: 50px;
  }
  .van-skeleton{
    padding: 30px 15px;
  }
  .nav-box{
    background: #f4f4f4;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 15px;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;

    .van-icon:nth-child(1){
      position: relative;
      &::after{
        position: absolute;
        content:"";
        width: 1px;
        height: 120%;
        background: #d5d5d5;
        right: -15px;
      }
    }

    /deep/ .van-badge{
      background-color: transparent;
      border: none;
      color:#000;
    }
  }
</style>