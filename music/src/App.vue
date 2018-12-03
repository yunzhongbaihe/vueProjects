<template>
  <div id="app">
    <!--<img src="./assets/logo.png" alt="">-->
    <router-view/>
    <BottomNav></BottomNav>
    <audio id="audioBox" preload="auto">您的浏览器不支持Audio标签</audio>
  </div>
</template>

<script>
  import BottomNav from './components/BottomNav'

  export default {
    name: 'App',
    components: {
      BottomNav
    }
  }
</script>
