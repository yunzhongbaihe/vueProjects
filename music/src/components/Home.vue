<template>
  <div class="home-page">
    <SongClassify></SongClassify>
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
          url: `http://tingapi.ting.baidu.com/v1/restserver/ting`,
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
          "type": 1,
          "size": 20,
          "offset": 0
        }, 'song_list', 'songList');
      }
    },
    components: {
      SongClassify,
      SongList
    }
  }
</script>
