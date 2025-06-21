
export type EventHandler<E> = (event: E) => void
export class EventEmiiter<E = any> {
    private _events: Record<string, EventHandler<E>[]>;

    constructor() {
        this._events = {}
    }

    private _getFns(event: string) {
        if (this._events[event]) {
            return this._events[event]
        }
        this._events[event] = []
        return []
    }

    private on<T = E>(event: string, fn: EventHandler<T>) {
        const fns = this._getFns(event)
        fns.push(fn)
    }

    private off(event: string, fn?: EventHandler<E>) {
        if (fn) {
            const fns = this._getFns(event)
        } else {
            delete this._events[event]
        }
    }

    private once<T = E>(event: string, fn: EventHandler<T>) {
        const fn2: EventHandler<E> = (params) => {
            this.off(event, fn2)
            fn(params)
        }
        this.on(event, fn2)
    }

    // 同步调用
    private emit<T = E>(event: string, params?: T) {
        const fns = this._getFns(event)
        for (let i = 0; i < fns.length; i++) {
            const fn = fns[i]
            fn(params as any)
        }
    }

    // 异步调用
    public invoke(event: string, params?: E): Promise<any> {
        const fns = this._getFns(event)
        flag: for (let i = 0; i < fns.length; i++) {
            const fn = fns[i]
            return new Promise((resolve, reject) => {
                resolve(fn(params))
            })
            break flag
        }
        return Promise.reject()
    }
}
