<template>
  <van-skeleton row="5" v-if="newsInfo===null"></van-skeleton>
  <div class="content" v-else v-html="newsInfo.body">
  </div>
  <div class="nav-box">
      <van-icon name="arrow-left" @click="handle"></van-icon>
      <van-icon name="comment-o" :badge="comments"></van-icon>
      <van-icon name="good-job-o" :badge="popularity"></van-icon>
      <van-icon name="star-o" :color="isStore ? '#1989fa' : '#000'" @click="storeHandle"></van-icon>
      <van-icon name="share-o"></van-icon>
  </div>
</template>

<script>
  import {useRouter,useRoute}  from "vue-router"
  import {reactive,toRefs,onBeforeMount,onBeforeUnmount,onUpdated,nextTick} from "vue"
  import api from "@/api/index"
  import {useStore} from "vuex"
  import {computed} from "vue"
  import {Toast} from "vant"
  export default {
    name: "Detail",
    setup(){
      const router = useRouter(),
          route = useRoute(),
          store = useStore();

      const handle = ()=>{
        router.back();
      }
      const storeHandle = async ()=>{
        if(!store.state.isLogin){
          Toast("小主，请先登录");
          // router.push(`/login?from=detail/${reoute.params.id}`)
          router.push({
            path: "/login",
            query: {
              from:`detail/${route.params.id}`
            }
          });
          return;
        }
        if(isStore.value) return;
        let {code} = await api.store(route.params.id);
        if(+code !== 0){
          Toast("小主，很遗憾收藏失败");
        }
        Toast("小主，收藏成功");
        store.dispatch('changeStoreListAsync');
      }
      let state = reactive({
        comments:0,
        popularity:0,
        newsInfo:null
      });
      let isStore = computed(()=>{
        let {isLogin, storeList} = store.state;
        if(isLogin){
          if(!Array.isArray(storeList)) storeList=[];

          // return storeList.some( item => {
          //   return +item.news.id === + route.params.id;
          // })
        }
        return false;
      });

      onBeforeMount(async ()=>{
        let id = route.params.id
        let result = await api.queryNewsInfo(id);
        state.newsInfo = result;
        let link = document.createElement('link');
        link.id = "link";
        link.rel = "stylesheet";
        link.href = state.newsInfo.css[0];
        document.head.appendChild(link);

        let {comments, popularity} = await api.queryNewsStory(id);
        state.popularity = popularity;
        state.comments = comments;

      });

      onUpdated(()=>{
        let imgPlaceHolder = document.querySelector(".img-place-holder");
        if(imgPlaceHolder){
          // let img = document.createElement('img');
          // img.id = "img";
          // img.src = state.newsInfo['image'];
          if(imgPlaceHolder.innerHTML.trim() === ""){
            imgPlaceHolder.innerHTML += `<img src="${state.newsInfo.image}" />`;
          }
        }
      })

      onBeforeUnmount(()=> {
        let link = document.getElementById('link');
        if(!link) return;
        document.head.removeChild(link);
      });
      onBeforeUnmount(async ()=>{
        console.log("Detail async onBeforeUnmount")
        if(store.state.isLogin === null)
          await store.dispatch("changeIsLoginAsync");
        if(store.state.isLogin){
          if(store.state.info === null)  store.dispatch("changeInfoAsync");
          if(store.state.storeList === null)  store.dispatch("changeStoreListAsync");
        }
      })

      return {
        ...toRefs(state),
        isStore,
        handle,
        storeHandle
      }
    }
  }
</script>

<style lang="less" scoped>
  .content{
    background: #fff;
    padding-bottom: 50px;

    /deep/ .img-place-holder{
      //overflow: hidden;
      height: auto;
      img{
        display: block;
        margin: 0;
        min-height: 100%;
      }
    }
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