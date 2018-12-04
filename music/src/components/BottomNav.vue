<template>
  <div class="bottom-nav">
    <router-link to="/main/home" class="home" :class="{active:this.$route.path === '/main/home'}">
      <span class="icon icon-home"></span>
      <span class="label">首页</span>
    </router-link>
    <router-link to="/main/search" class="search" :class="{active:this.$route.path === '/main/search'}">
      <span class="icon icon-search"></span>
      <span class="label">搜索</span>
    </router-link>
    <router-link to="/main/play" class="search" :class="{active:this.$route.path === '/main/play'}">
      <span class="icon icon-play"></span>
      <span class="label">播放</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "BottomNav"
  }
</script>
