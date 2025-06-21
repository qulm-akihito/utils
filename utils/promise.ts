import { noop } from '.'

export function getPromise<T>() {
  let finish: (value: T | PromiseLike<T>) => void = noop
  let error: (reason?: any) => void = noop
  const promise = new Promise<T>((resolve, reject) => {
    finish = resolve
    error = reject
  })
  return { promise, resolve: finish, reject: error }
}
