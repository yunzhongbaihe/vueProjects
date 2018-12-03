<template>
  <div class="song-classify">
    <ul>
      <li v-for="item in list" :key="item.type" :class="{'active':Number(songType) === item.type}">
        <a href="javascript:void(0);" @click="sendTypeToHome(item.type)">{{item.text}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['songType'],
    name: "SongClassify",
    data: function(){
      return {
        list: [
          {
            type: 1,
            text: '最新歌曲'
          },
          {
            type: 2,
            text: '热门歌曲'
          },
          {
            type: 11,
            text: '摇滚音乐'
          },
          {
            type: 12,
            text: '爵士音乐'
          },
          {
            type: 16,
            text: '流行音乐'
          },
          {
            type: 21,
            text: '欧美金曲'
          },
          {
            type: 22,
            text: '经典老歌'
          },
          {
            type: 23,
            text: '情歌对唱'
          },
          {
            type: 24,
            text: '影视金曲'
          },
          {
            type: 25,
            text: '网络歌曲'
          }
        ]
      }
    },
    methods: {
      sendTypeToHome: function(type){
        this.$emit('listenSongClassify', type);
      }
    }
  }
</script>
