<template>
  <header class="header-box">
    <div class="left">
      <div class="time">
        <span>{{timeNow.day}}</span>
        <span>{{timeNow.month}}</span>
      </div>
      <h1 class="title">知乎日报</h1>
    </div>
    <router-link to="/person"  class="link-btn">
      <img  :src="pic" alt="">
    </router-link>
  </header>
</template>

<script>
import { computed,onBeforeMount} from "vue";
import timg from "@/assets/images/timg.png";
import {formatTime} from "@/assets/utils";
import {useStore} from "vuex"

export default {
  name: "Head",
  props: {
    time:{
      type: String,
      default: ""
    },
  },
  setup(props){
    let timeNow = computed(()=>{
      let [month,day] = formatTime(props.time || null,"{1}-{2}").split("-");
      let area =['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
      return {
        month:area[month - 1],
        day
      };
    });
    let pic = computed(()=>{
      let {isLogin, info} = store.state;
      if(isLogin&& info){
        return info.pic || timg;
      }
      return timg;
    });
    // let state = reactive({
    //   //vue工程化动态绑定的图片不能用相对地址,写"../assets/images/timg.png"会导致图片找不到
    //   //pic: require("../assets/images/timg.png"), commonJS规范引入图片，有效
    //   //import timg from "../assets/images/timg.png"; pic: timg; import语法引入图片，有效
    //   pic: timg,
    // });
    const store = useStore();
    onBeforeMount(()=>{
      let {isLogin, info} = store.state;
      if(isLogin === null) store.dispatch("changeIsLoginAsync");
      if(info === null) store.dispatch("changeInfoAsync");
    });

    return {
      // ...toRefs(state),
      timeNow,pic
    }
  }
}
</script>

<style lang="less" scoped>
.header-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  .left{
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .time{
    padding-right: 15px;
    border-right: 1px solid #ddd;
    span{
      display: block;
      height: 20px;
      line-height: 20px;
      font-size: 20px;
      text-align: center;
      margin-bottom: 10px;
      &:nth-child(2){
        height: 15px;
        line-height: 15px;
        font-size: 12px;
      }
    }
  }
  .title{
    padding-left:10px;
    font-size: 22px;
  }
  .link-btn{
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    img{
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}

</style>