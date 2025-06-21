import { isFunction } from './is'

const HASH_UNDEFINED = '__levi_cache_undefined__'

export interface LeviCacheable {
  get: (key: string) => any
  set: (key: string, value: any, expireTime?: number) => boolean
  has: (key: string) => boolean
  delete: (key: string) => boolean
  clear: () => this
  each: (cb: (value: any, key: string) => void) => this
  readonly size: number
}
export interface LeviCacheConstructor {
  new(collection?: Record<string, any>): LeviCacheable
  new(collection?: Record<string, any>, ...options: any[]): LeviCacheable
}

/**
 * key: string
 * value: any
 */
export class LeviCache implements LeviCacheable {
  private _data: Record<string, any>
  private _size: number

  constructor(collection?: Record<string, any>) {
    this._data = Object.create(null)
    this._size = 0
    if (collection != null) {
      Object.keys(collection).forEach(k => this.set(k, collection[k]))
    }
  }

  get size() {
    return this._size
  }

  clear() {
    this._data = Object.create(null)
    this._size = 0
    return this
  }

  each(cb: (value: any, key: string) => void) {
    Object.keys(this._data).forEach(k => isFunction(cb) && cb(this.get(k), k))
    return this
  }

  has(key: string) {
    return this._data[key] !== undefined
  }

  get(key: string) {
    const result = this._data[key]
    return result === HASH_UNDEFINED ? undefined : result
  }

  set(key: string, value: any) {
    this._size += this.has(key) ? 0 : 1
    this._data[key] = value === undefined ? HASH_UNDEFINED : value
    return true
  }

  delete(key: string) {
    const result = this.has(key) && delete this._data[key]
    this._size -= result ? 1 : 0
    return result
  }
}
