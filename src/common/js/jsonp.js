/**
 * @fileOver jsonp统一请求
 */
import originJsonp from 'jsonp'

/**
 * jsonp 统一请求
 * @param {string} url
 * @param {Object} data
 * @param {Object} option
 */
export default function jsonp (url, data, option) {
  // 拼接url，如果url没有问号，则增加 ？符号，否则就加 & 符号
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 转化data成路径
 * @param {Object} data
 */
export function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}
