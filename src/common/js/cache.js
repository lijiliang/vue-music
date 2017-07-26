// 操作local
import storage from 'good-storage'

const SEARCH_KEY = '__search__'  // 搜索key
const SEARCH_MAX_LENGTH = 15  // 最大存15条
const PLAY_KEY = '__play__'  // 播放历史key
const PLAY_MAX_LEN = 200  // 最大值200条

/**
 * insertArray 插入数组
 * @param {Array} arr  数组
 * @param {String} val  要插入的值
 * @param {Function} compare   比较函数
 * @param {Number} maxLen    最大值
 */
function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)  // 查找数据中是否有某个元素
  // 如果是第一条数据，则什么都不用做，因为数据是相等的
  if (index === 0) {
    return
  }
  // 如果有值，先删除
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 在数组前面插入一条数据
  arr.unshift(val)

  // 如果数组的长度大于定义的长度，则删除最后一位
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

/**
 * deleteFromArray 删除数组的一项
 * @param {Array} arr  数组
 * @param {Function} compare   比较函数
 */
function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

/**
 * savSearch 保存搜索历史
 * @param {String} query 搜索关键字
 */
export function savSearch (query) {
  let searchs = storage.get(SEARCH_KEY, [])
  insertArray(searchs, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)

  // 保存到localStorage中
  storage.set(SEARCH_KEY, searchs)
  return searchs
}

/**
 * loadSearch 通过本地缓存读取搜索历史数据
 */
export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

/**
 * deleteSearch 删除搜索历史数据
 * @param {String} query 搜索关键字
 */
export function deleteSearch (query) {
  let searchs = storage.get(SEARCH_KEY, [])
  deleteFromArray(searchs, (item) => {
    return item === query
  })

  // 保存到localStorage中
  storage.set(SEARCH_KEY, searchs)
  return searchs
}

/**
 * clearSearch 清除所有搜索历史数据
 */
export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

// 写播放记录
export function savePlay (song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

// 读播放记录
export function loadPlay () {
  return storage.get(PLAY_KEY, [])
}
