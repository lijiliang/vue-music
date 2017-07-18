<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

 <script type="text/ecmascript-6">
  import {prefixStyle} from 'common/js/dom'
  const progressBtnWidth = 16
  const transform = prefixStyle('transform')
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created () {
      this.touch = {}   // 共享touch
    },
    methods: {
      progressTouchStart (e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX  // 横向坐标
        this.touch.left = this.$refs.progress.clientWidth  // 开始点击按钮之前 按钮偏移的值
      },
      // TouchMove 实时改变进度条进度
      progressTouchMove (e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX   // 手指偏移量
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd (e) {
        this.touch.initiated = false
        // 拖动完后，派发一个事件出去，告诉我们拖动到哪个位置了
        this._triggerPercent()
      },
      // 点击bar改变位置
      progressClick (e) {
        // 这里当我们点击 progressBtn 的时候，offsetX 获取不对
        // this._offset(e.offsetX)  // 设置点击时偏移量

        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        this._triggerPercent()   // 派出这个事件出去
      },
      _triggerPercent () {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth // bar的宽度 - 按钮宽度
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)  // 派出这个事件出去
      },
      // 偏移量
      _offset (offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      }
    },
    watch: {
      percent (newPercent) {
        // 当歌曲时间大于0，并且没有在拖动的时候就自动播放
        if (newPercent >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth // bar的宽度 - 按钮宽度
          const offsetWidth = newPercent * barWidth   // 偏移宽度
          this._offset(offsetWidth)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
