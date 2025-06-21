import { DAY_IN_MS } from './date'
import { isFunction } from './is'
import type { LeviCacheConstructor, LeviCacheable } from './cache'
import { LeviCache } from './cache'

const isExpired = (time: number, now: number) => time !== 0 && time < now

interface ExpireOption {
  /**
   * @default 0
   */
  limit?: number
  /**
   * @default Date.now
   */
  now?: Function
  /**
   * 默认过期时间，0 不过期
   * @default 0
   */
  defaultExpire?: number
}
export interface LeviExpireCacheConstructor extends LeviCacheConstructor {
  new(collection?: Record<string, any>, option?: ExpireOption): LeviCacheable
}

export class LeviExpireCache implements LeviCacheable {
  protected _limit: number
  protected _now: Function
  protected _defaultExpire: number
  protected _data: LeviCache

  constructor(collection?: Record<string, any>, option?: ExpireOption) {
    const { limit = 0, now = Date.now, defaultExpire = 0 } = option || {}
    this._limit = Number(limit) || 0
    this._now = now
    this._defaultExpire = defaultExpire
    this._data = new LeviCache()
    if (collection != null) {
      Object.keys(collection).forEach(k => this.set(k, collection[k]))
    }
    return this
  }

  /**
   * 包含过期未清除的数据
   */
  get size() {
    return this._data.size
  }

  _prune() {
    this._data.each((_, k: string) => this.has(k))
    return this
  }

  clear() {
    this._data.clear()
    return this
  }

  each(cb: (value: any, key: string) => void) {
    this._data.each((_, k) => isFunction(cb) && cb(this.get(k), k))
    return this
  }

  has(key: string) {
    if (!this._data.has(key)) {
      return false
    }
    const value = this._data.get(key)
    if (isExpired(value.expireTime, this._now())) {
      this.delete(key)
      return false
    }
    return true
  }

  get(key: string) {
    if (!this.has(key)) {
      return undefined
    }
    return this._data.get(key).value
  }

  /**
   *
   * @param {String} key
   * @param {*} value
   * @param {Number} expireTime 不大于一天的毫秒数会转成(当前时间+expireTime), 不传为默认过期时间, 0 不过期
   */
  set(key: string, value: any, expireTime?: number) {
    if (expireTime == null || isNaN(Number(expireTime))) {
      expireTime = this._defaultExpire
    }
    if (expireTime > 0 && expireTime <= DAY_IN_MS) {
      expireTime = this._now() + expireTime
    }
    if (
      this._limit !== 0
      && this.size >= this._limit
      && this._prune().size >= this._limit
    ) {
      return false
    }
    const target = { value, expireTime: Number(expireTime) || 0 }
    return this._data.set(key, target)
  }

  delete(key: string) {
    return this._data.delete(key)
  }
}
