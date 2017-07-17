// Getters

export const singer = state => state.singer  // 歌手信息

export const playing = state => state.playing  // 是否播放

export const fullScreen = state => state.fullScreen  // 播放器展开收起

export const playlist = state => state.playlist   // 播放列表

export const sequenceList = state => state.sequenceList  // 顺序播放列表

export const mode = state => state.mode  // 播放模式

export const currentIndex = state => state.currentIndex  // 当前播放的歌曲

export const currentSong = (state) => {    // 当前歌曲
  return state.playlist[state.currentIndex] || {}
}
