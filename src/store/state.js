// 定义 state
import {payMode} from 'common/js/config'

const state = {
  singer: {},   // 歌手信息
  playing: false, // 是否播放
  fullScreen: false, // 播放器展开收起
  playlist: [],       // 播放列表
  sequenceList: [],  // 顺序播放列表
  mode: payMode.sequence, // 播放模式
  currentIndex: -1   // 当前播放的歌曲
}

export default state
