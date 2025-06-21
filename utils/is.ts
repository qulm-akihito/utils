export function isDefined(value: any) {
  return value != null
}

export function isElement(value: any) {
  return (
    value instanceof Element
    || (typeof HTMLDocument !== 'undefined' && value instanceof HTMLDocument)
  )
}

export function isFunction(value: any) {
  return typeof value === 'function'
}

export function isObject(obj: any) {
  return Object.prototype.toString.call(obj).toLowerCase() === '[object object]'
}

export function getTag(value: any) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return Object.prototype.toString.call(value)
}

export function isObjectLike(value: any) {
  return typeof value === 'object' && value != null
}

export function isPlainObject(value: any) {
  if (!isObjectLike(value) || getTag(value) !== '[object Object]') {
    return false
  }
  if (Object.getPrototypeOf(value) === null) {
    return true
  }
  let proto = value
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(value) === proto
}

export function isEmptyArray(arr: any) {
  return Array.isArray(arr) && arr.length === 0
}
