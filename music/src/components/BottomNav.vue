<template>
  <div class="bottom-nav">
    <router-link to="/main/home" class="home" :class="{active:this.$route.path === '/main/home'}"></router-link>
    <router-link to="/main/search" class="search" :class="{active:this.$route.path === '/main/search'}"></router-link>
  </div>
</template>

<script>
  export default {
    name: "BottomNav"
  }
</script>
