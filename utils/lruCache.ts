import { DAY_IN_MS } from './date'
import { LeviExpireCache } from './expireCache'

export class LeviLruExpireCache extends LeviExpireCache {
  _lruDelete() {
    let minHits = Number.MAX_SAFE_INTEGER
    let targetKey = ''
    let hasDeleteKey = false
    this._data.each((v, k) => {
      if (v.hits < minHits) {
        minHits = v.hits
        targetKey = k
        hasDeleteKey = true
      }
    })
    hasDeleteKey && this.delete(targetKey)
  }

  override get(key: string) {
    if (!this.has(key)) {
      return undefined
    }
    const result = this._data.get(key)
    result.hits++
    return result.value
  }

  /**
   *
   * @param {String} key
   * @param {*} value
   * @param {Number} expireTime 不大于一天的毫秒数会转成(当前时间+expireTime), 不传为默认过期时间, 0 不过期
   */
  override set(key: string, value: any, expireTime?: number) {
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
      this._lruDelete()
    }
    return this._data.set(key, {
      value,
      expireTime: Number(expireTime) || 0,
      hits: 0,
    })
  }
}
