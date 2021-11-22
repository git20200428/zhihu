<template>
  <router-view v-slot="{Component}">
<!--  keep-alive实现组件跳转回来后还定位到上次的位置，不会重新加载改组件  -->
<!--  vue2和vue3写法不一样：vue2最简单写法是直接用keep-alive包住router-view。下面写法vue2/vue3都支持  -->
    <keep-alive include="Home">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="less">
  html,body{
    min-height: 100%;
    overflow-x: hidden;
    background: #f4f4f4;
  }

  #app{
    margin: 0 auto;
    background: #fff;
  }

</style>
