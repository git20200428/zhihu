<template>
  <Head :time="today"></Head>
  <section class="banner_box">
    <!--    lazy-render轮播图图片懒加载-->
    <van-swipe v-if="bannerList.length > 0" autoplay="3000" lazy-render>
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <router-link :to="`/detail/${item.id}`"  class="content">
          <img :src="item.image" alt="">
          <div class="mark">
            <h3 class="title">{{item.title}}</h3>
            <span class="tip">{{item.hint}}</span>
          </div>
        </router-link>
      </van-swipe-item>
    </van-swipe>
  </section>
  <van-skeleton :row="5" v-if="newsList.length === 0"></van-skeleton>
  <div v-else>
    <section class="news-box" v-for="(item,index) in newsList" :key="index">
      <van-divider content-position="left" v-if="index!==0">{{formatTime(item.date,"{1}月{2}日")}}</van-divider>
      <div class="content">
        <Item v-for="item2 in item.stories" :key="item2.id" :data="item2"></Item>
      </div>
    </section>
  </div>
  <div class="lazy-more" v-show="newsList.length !==0" ref="loadMore">
    <van-loading size="14px">小主，精彩数据准备中...</van-loading>
  </div>
</template>

<script>
import Head from "@/components/Head";
import Item from "@/components/Item"
import {reactive, toRefs,
  onBeforeMount, ref, onMounted} from "vue";
import api from "@/api/index";
import {formatTime} from "@/assets/utils";

export default {
  name: "Home",
  components: {Head,Item},
  setup(){
    let state = reactive({
      today: '',
      newsList: [],
      bannerList: [],
    });
    let loadMore = ref(null);
    //第一次加载获取数据
    onBeforeMount(async()=>{
      // let res = await api.queryNewsLatest();
      // console.log(res);
      let {date,stories, top_stories} = await  api.queryNewsLatest();
      state.today = date;
      state.newsList.push(Object.freeze({
        date,stories
      }));
      //vue不会对冻结了的数据再做数据代理
      //这样有助于提升效率 200ms  2ms
      state.bannerList = Object.freeze(top_stories);
    });
    //第一次渲染完：加载更多数据
    onMounted(()=>{
      let ob = new IntersectionObserver(async changes => {
        let item = changes[0];
        if(item.isIntersecting){
          let result = await api.queryNewsBefore(state.newsList[state.newsList.length - 1]["date"]);
          state.newsList.push(Object.freeze(result));
        }
      });
      ob.observe(loadMore.value);
    })

    return {
      ...toRefs(state),
      formatTime,
      loadMore
    }
  }
}
</script>

<style lang="less" scoped>
.banner_box{
  box-sizing: border-box;
  height: 375px;
  background: #d5d5d5;

  .van-swipe{
    height: 100%;
    background: #fff;

    .content{
      display: block;
      height: 100%;
      color:#fff;
      position: relative;

      img{
        display: block;
        width: 100%;
        height: 100%;
      }
      .mark{
        position: absolute;
        padding: 10px 20px;
        bottom: 0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        height: 210px;
        background: rgba(0,0,0,0.3);
        background: -webkit-linear-gradient(
            top,
            rgba(0,0,0,0.0),
            rgba(0,0,0,0.5)
        );

        .title{
          max-height: 50px;
          font-size: 20px;
          line-height: 25px;
          overflow: hidden;
        }
        .tip{
          font-size: 12px;
          line-height: 30px;
        }
      }
    }

     .van-swipe__indicators{
      left:auto;
      right: 15px;
      transform: none;

      .van-swipe__indicator--active{
        width:28px;
        border-radius: 6px;
        background: #fff;
      }
    }
  }
}

.news-box{
  padding: 0 15px;

  .van-divider{
    margin: 5px 0;
    &::before{
      display: none;
    }
  }
}

.van-skeleton{
  padding: 20px 15px;
}

.lazy-more{
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #f4f4f4;
}
</style>