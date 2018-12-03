<template>
  <div class="song-list">
    <ul>
      <li v-for="item in songList" :key="item.song_id">
        {{item.title.replace(/[（）《》]/ig, '')}} {{item.author}}
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
