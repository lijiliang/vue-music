/**
 * @fileOverview dom操作相关方法
 */
/**
 * 增加一个类
 * @param {Object} el
 * @param {String} className
 */
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

/**
 * 判断类是否存在
 * @param {Object} el
 * @param {String} className
 */
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
