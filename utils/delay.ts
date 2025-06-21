import { getPromise } from './promise'

export function delay(time: number) {
  const { promise, resolve } = getPromise()
  setTimeout((data: any) => resolve(data), time)
  return promise
}

export const throttle = (fn: any, maxWait: number) => {
  maxWait = Math.max(maxWait, 0)
  let timer: any
  let lastExec = 0
  const clear = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
  }
  const invoke = (_this: any, _args: any) => {
    lastExec = Date.now()
    return fn.apply(_this, _args)
  }
  return function (...args: any) {
    clear()
    const elapsed = Date.now() - lastExec
    if (elapsed > maxWait) {
      return invoke(this, args)
    }
    timer = setTimeout(() => invoke(this, args), elapsed)
  }
}
