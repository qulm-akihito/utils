import { isObject } from './is'

export function isEmpty(obj) {
  if (obj == null) {
    return true
  }
  return Object.keys(obj).length === 0
}

export const noop = () => { }

export const limit = (n, [min, max]) => {
  const limit = [+min, +max]
  if (n < limit[0]) {
    n = limit[0]
  } else if (n > limit[1]) {
    n = limit[1]
  }
  return n
}

// TODO: 类型转换、value空对象处理
/**
 * 合并相同key Data
 */
export function mergeData(target = {}, value = {}, options = { strict: true }) {
  for (const key in value) {
    if (
      options.strict
      && isObject(target)
      && !Object.prototype.hasOwnProperty.call(target, key)
    ) {
      continue
    }

    if (target[key] == null) {
      target[key] = value[key]
    }
    if (isObject(value[key])) {
      mergeData(target[key], value[key], options)
    } else if (Array.isArray(value[key])) {
      target[key] = JSON.parse(JSON.stringify(value[key]))
    } else {
      target[key] = value[key]
    }
  }
  return target
}

export function getParseData(data) {
  let value = {}
  if (data) {
    try {
      value = JSON.parse(data)
    } catch (e) {
      value = {}
    }
  } else {
    value = {}
  }
  return value
}

export const uniqueArray = (array, key) => {
  const seen = new Set()
  return array?.filter((item) => {
    const value = item?.[key]
    if (seen.has(value)) {
      return false
    }
    seen.add(value)
    return true
  }) || []
}

