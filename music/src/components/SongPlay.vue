<template>
  <div class="song-play">
    <div class="header nav">
      <div class="back">
        <router-link to="/main/home" class="icon icon-back"></router-link>
      </div>
      <h1 class="title">{{title}}</h1>
    </div>
    <div class="lrc-list-wrap" v-if="lrcList.length">
      <ul id="lrcList" class="mui-table-view" :style="{'transform': 'translateY('+translatey + 'rem)'}">
        <li class="mui-table-view-cell" v-for="item in lrcList" :data-minutes="item.minutes"
            :data-seconds="item.seconds">
          <span>{{item.text}}</span>
        </li>
      </ul>
    </div>
    <div class="music-none" v-if="!lrcList.length"></div>
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
    /**
     * 进入路由之前触发
     * @param to：目标路由
     * @param from：来自路由
     * @param next：函数，形参 vm
     */
    beforeRouteEnter: function(to, from, next){
      // 传值形式
      // this.$router.push({name: 'dispatch', params: {paicheNo: obj.paicheNo}});
      // this.$router.push({path: '/transport/dispatch', query: {paicheNo: obj.paicheNo}});
      next(function(vm){
        if(vm.$route.query && vm.$route.query['songId']){
          vm.getLrc();
        }else{
          mui.alert('请点击首页中歌曲的列表进行播放！', '提示', '确定', function(){
            vm.$router.push({path: '/main/home', query: {msg: '来自播放页面的提示'}});
          });
        }
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
            _this.title = data['title'].replace(/[（）《》]/ig, '');
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
          if(curLi.index() >= 5){
            this.translatey -= 0.86;
          }
        }
      }
    }
  }
</script>
