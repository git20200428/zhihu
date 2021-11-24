<template>
  <div class="news-item">
    <router-link :to="`/detail/${data.id}`">
      <div class="img-box">
        <!--  v-lazy需要注册LazyLoad      -->
        <img v-if="data.images && data.images.length > 0" v-lazy="data.images[0]" alt="">
      </div>
      <h4 class="title">{{data.title}}</h4>
      <p class="desc">{{data.hint}}</p>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "Item",
    props:  {
      data: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style lang="less" scoped>
  .news-item{
    position: relative;
    padding: 25px 0;
    box-sizing: border-box;
    height: 130px;
    overflow: hidden;

    a{
      display: block;
    }

    .img-box{
      position: absolute;
      right: 0;
      top: 15px;
      width: 65px;
      height: 65px;
      background: #d5d5d5;

      img{
        margin-right: 75px;
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .title{
      max-height: 60px;
      line-height: 30px;
      font-size: 25px;
      color: #000;
      overflow: hidden;
      margin-right: 75px;
      margin-top: 5px;
      margin-bottom: 22px;
    }

    .desc{
      line-height: 15px;
      font-size: 12px;
      color: #999;
    }
  }
</style>