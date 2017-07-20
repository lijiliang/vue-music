/**
 * @fileOverview 搜索页面api
 */
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

// 获取热门搜索关键字
export function getHotKey () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

// 获取根据关键字返回搜索列表
export function search (query, page, zhida, perpage) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0, // 歌手直达
    platform: 'h5',
    zhidaqu: 1,
    needNewCode: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perpage,
    n: perpage,
    remoteplace: 'txt.mqq.all',
    uid: 0
  })
  return jsonp(url, data, options)
}
