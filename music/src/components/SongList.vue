<template>
  <div class="song-list">
    <ul>
      <li v-for="item in songList" :key="item.song_id">
        <router-link :to="{path: '/main/play', query: {songId: item.song_id}}">{{item.title.replace(/[（）《》]/ig, '')}}
          {{item.author}}
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
