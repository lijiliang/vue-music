// 排行榜数据
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

// 获取排行榜列表数据
export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 710134792,
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

// 获取榜单数据
export function getMusicList (topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const data = Object.assign({}, commonParams, {
    page: 'detail',
    g_tk: 710134792,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    type: 'top',
    topid: topid,
    notice: 0
  })
  return jsonp(url, data, options)
}
