<template>
  <div class="song-play">
    <div class="top">
      <router-link to="/main/home" class="el-icon-arrow-left"></router-link>
      <span>{{title}}</span>
    </div>
    <div class="lrc-list-wrap">
      <ul id="lrcList" class="lrc-list" :style="{'transform': 'translateY('+translatey + 'rem)'}">
        <li v-for="item in lrcList" :data-minutes="item.minutes"
            :data-seconds="item.seconds">{{item.text}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SongPlay",
    data: function(){
      return {
        title: '歌曲播放',
        lrcContent: '',
        lrcList: [],
        autoTimer: null,
        translatey: 0
      }
    },
    mounted: function(){
      this.getLrc();
      $('html, body, #app').css({
        width: '100%', height: '100%', overflow: 'hidden'
      });
    },
    methods: {
      getLrc: function(){
        var _this = this;
        $.ajax({
          url: this.HOME,
          type: 'get',
          data: {
            "method": "baidu.ting.song.lry",
            "songid": this.$route.query['songId']
          },
          cache: false,
          async: false,
          dataType: 'jsonp',
          success: function(data){
            _this.title = data['title'];
            _this.lrcContent = data['lrcContent'];
            _this.getSongPlaySrc();
            _this.handlerLrc();
            _this.playing();
          }
        });
      },
      handlerLrc: function(){
        var _this = this;
        this.lrcContent.replace(/[\r\n\s&nbsp;]/igm, '').replace(/\[(\d+):(\d+)\.\d+]([^\[]+)?/igm, function(...arg){
          var [, minutes, seconds, text] = arg;
          if(text){
            _this.lrcList.push({
              minutes: minutes,
              seconds: seconds,
              text: text
            });
          }
        });
      },
      // 歌曲播放以及歌词对应
      playing: function(){
        var _this = this;
        clearInterval(_this.autoTimer);
        this.autoTimer = setInterval(function(){
          var duration = $('#audioBox')[0].duration;
          var curTime = $('#audioBox')[0].currentTime;
          _this.lyricSpondence(duration, curTime);
          // 播放完成后暂停
          if(curTime >= duration){
            clearInterval(_this.autoTimer);
            $('#lrcList').find('li').removeClass('active');
            $('#lrcList').css('transform', `translateY(0)`);
          }
        }, 1000);
      },
      // 获取歌曲播放地址
      getSongPlaySrc: function(){
        var _this = this;
        $.ajax({
          url: this.HOME,
          type: 'get',
          data: {
            "method": "baidu.ting.song.play",
            "songid": this.$route.query['songId']
          },
          cache: false,
          async: false,
          dataType: 'jsonp',
          success: function(data){
            $('#audioBox').attr('src', data['bitrate']['file_link']);
            document.getElementById('audioBox').oncanplay = function(){
              document.getElementById('audioBox').play();
            }
          }
        });
      },
      // 歌词对应
      lyricSpondence(duration, curTime){
        var minutes = Math.floor(curTime / 60);
        var seconds = Math.ceil(curTime - minutes * 60);
        minutes < 10 ? minutes = '0' + minutes : null;
        seconds < 10 ? seconds = '0' + seconds : null;
        var liList = $('#lrcList').find('li');
        var curLi = liList.filter(`[data-minutes="${minutes}"]`).filter(`[data-seconds="${seconds}"]`);
        if(curLi.length){
          curLi.addClass('active').siblings().removeClass('active');
          if(curLi.index() >= 8){
            this.translatey -= 0.6;
          }
        }
      }
    }
  }
</script>
