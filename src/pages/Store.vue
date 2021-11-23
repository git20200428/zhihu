<template>
  <Nav title="收藏列表" />
  <van-empty description="暂无收藏" v-if="storeList.length===0"></van-empty>
  <div v-else>
    <van-swipe-cell v-for=" item in storeList" :key="item.id">
      <div class="con">
        <Item :data="{...item.news,images:[item.news.image],hint:''}"/>
      </div>
      <template #right>
        <van-button square type="danger" text="删除" @click="removeHandle(item.id)"/>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import Nav from "@/components/Nav"
import Item from "@/components/Item"
import {computed, onBeforeMount} from "vue"
import {useStore} from "vuex"
import api from "@/api/index"
import {Toast} from "vant"
export default {
  name: "Store",
  components: {Nav,Item},
  setup(){
    const store = useStore();
    let storeList = computed(()=>store.state.storeList||[]);
    onBeforeMount(()=>{
      if(store.state.storeList === null){
        store.dispatch("changeStoreListAsync");
      }
    })
    const removeHandle = async (id) =>{
      let {code} = await api.storeRemove(id);
      if(+code!==0){
        Toast("小主，很遗憾，删除失败");
        return;
      }
      Toast("小主，删除成功");
      store.commit("removeStoreList",id);
    }
    return {
      storeList,
      removeHandle
      // data : {
      //   image_hue: "0xb09b7b",
      //   title: "以藤原豆腐店的收入，是否能够支付藤原在赛车上的投入？",
      //   url: "https://daily.zhihu.com/story/9741729",
      //   hint: "Astro . 2 分钟前阅读",
      //   gp_prefix: "102907",
      //   images:["https://pica.zhimg.com/v2-91978c94dd4064d0c687be6ef17301d4.jpg?source=8673f162",],
      //   type:0,
      //   id:9741729
      // }
    }
  }
}
</script>

<style lang="less" scoped>

</style>