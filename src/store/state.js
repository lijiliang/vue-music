// 定义 state
import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},   // 歌手信息
  playing: false, // 是否播放
  fullScreen: false, // 播放器展开收起
  playlist: [],       // 播放列表
  sequenceList: [],  // 顺序播放列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1,   // 当前播放的歌曲
  disc: {},            // 歌单数据
  topList: {},         // 排行数据
  searchHistory: loadSearch(),    // 搜索历史
  playHistory: loadPlay(),   // 播放历史
  favoriteList: loadFavorite()  // 收藏列表
}

export default state
