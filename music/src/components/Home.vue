<template>
  <div id="homePage" class="home-page">
    <SongClassify @listenSongClassify="showFromSongClassify" :song-type="songType"></SongClassify>
    <SongList :song-list="songList"></SongList>
  </div>
</template>

<script>
  import SongClassify from './SongClassify'
  import SongList from './SongList'

  export default {
    name: "Home",
    data: function(){
      return {
        songType: 1,
        songId: '',
        songTingId: '',
        songList: []
      }
    },
    mounted(){
      this.getSongList();
    },
    methods: {
      Server: function(params, keyname, varname){
        var _this = this;
        $.ajax({
          url: this.HOME,
          type: 'get',
          data: params,
          cache: false,
          async: false,
          dataType: 'jsonp',
          success: function(data){
            _this[varname] = data[keyname];
          }
        });
      },
      getSongList: function(){
        this.Server({
          "method": "baidu.ting.billboard.billList",
          "type": this.songType,
          "size": 20,
          "offset": 0
        }, 'song_list', 'songList');
      },
      showFromSongClassify: function(data){
        this.songType = data;
        this.getSongList();
      }
    },
    components: {
      SongClassify,
      SongList
    }
  }
</script>
