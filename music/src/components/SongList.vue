<template>
  <div class="song-list">
    <ul class="mui-table-view" v-for="item in songList" :key="item.song_id">
      <li class="mui-table-view-cell">
        <router-link :to="{path:'/main/play', query:{songId: item.song_id}}">
          <span>{{item.title.replace(/[（）《》]/ig, '')}} ---- {{item.author}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['songList'],
    name: "SongList"
  }
</script>
