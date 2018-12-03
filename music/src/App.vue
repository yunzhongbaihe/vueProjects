<template>
  <div id="app">
    <!--<img src="./assets/logo.png" alt="">-->
    <router-view/>
    <BottomNav></BottomNav>
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
