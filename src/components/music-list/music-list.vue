<!-- 音乐列表组件 -->
<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length > 0" ref="playBtn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll" :data="songs" class="list" ref="list">
      <div class="song-list-wrapper">
        <song-list :rank="rank" @select="selectItem" :songs="songs"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import SongList from 'base/song-list/song-list'
import {prefixStyle} from 'common/js/dom'
import {mapActions} from 'vuex'
import {playlistMixin} from 'common/js/mixin'

const RESERVED_HEIGHT = 40 // 预留的偏移量
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

export default {
  mixins: [playlistMixin],
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scrollY: 0
    }
  },
  computed: {
    bgStyle () {
      return `background-image: url(${this.bgImage})`
    }
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight   // 计算背景的高度
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`  // 设置滚动组件的top值
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  methods: {
    scroll (pos) {
      this.scrollY = pos.y
    },
    back () {
      this.$router.back()
    },
    // 点击歌单 提交actions，改变vuex播放器相关状态，让actions通过mutation去修改state的值
    selectItem (item, index) {
      this.selectPlay({
        list: this.songs,
        index: index
      })
    },
    // 随机播放
    random () {
      this.randomPlay({
        list: this.songs
      })
    },
    // 如果有小播放器在，scroll 底下要加 bottom: 60px
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.list.$el.style.bottom = bottom
      this.$refs.list.refresh()
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
  },
  watch: {
    scrollY (newY) {
      let translateY = Math.max(this.minTranslateY, newY)// 滚动的向上偏移最大高度
      let zIndex = 0
      let scale = 1   // 放大比例
      let blur = 0    // 高斯模糊
      this.$refs.layer.style[transform] = `translate3d(0,${translateY}px, 0)`

      // 计算scale比例值
      const percent = Math.abs(newY / this.imageHeight)
      if (newY > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20 * percent, 20)
      }
      this.$refs.filter.style[backdrop] = `blur(${blur}px)` // 高斯模糊 目前应该只有ios才支持
      if (newY < this.minTranslateY) {
        // 往上拉 设置背景图片相关属性
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style.zIndex = zIndex
      // 设置背景的scale值
      this.$refs.bgImage.style[transform] = `scale(${scale})`
    }
  },
  components: {
    Scroll,
    SongList,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      // overflow: hidden
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
