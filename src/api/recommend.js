/**
 * @fileOverview 推荐页面api
 */

import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

/**
 * getRecommend 获取推荐幻灯片内容
 */
export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })
  return jsonp(url, data, options)
}
