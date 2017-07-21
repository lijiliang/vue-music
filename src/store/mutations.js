/**
 * Mutations
 * 更改Vuex的store中的状态的唯一方法是提交mutation
 */
import * as types from './mutation-types'

const matutaions = {
  // 歌手信息
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  // 是否播放
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag
  },
  // 播放器展开收起
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag
  },
  // 播放列表
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  // 顺序播放列表
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list
  },
  // 播放模式
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode
  },
  // 当前播放的歌曲
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  // 歌单数据
  [types.SET_DISC] (state, disc) {
    state.disc = disc
  },
  // 排行数据
  [types.SET_TOP_LIST] (state, topList) {
    state.topList = topList
  },
  // 搜索历史
  [types.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history
  }
}

export default matutaions
