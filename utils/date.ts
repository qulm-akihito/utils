import dayjs from 'dayjs'
import zh from 'dayjs/locale/zh'
import duration from 'dayjs/plugin/duration'
import weekday from 'dayjs/plugin/weekday'
import isToday from 'dayjs/plugin/isToday'
import type { ConfigType } from 'dayjs'
import { Constant } from '../constants/index'
import { throttle } from './delay'

// 插件
dayjs.extend(duration)
dayjs.extend(weekday)
// 设置一周开始时间为周一
dayjs.locale(zh, true)
dayjs.extend(isToday)

const WEEK_LIST = Object.freeze([
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
  '周日',
])

const DAYS_IN_WEEK = 7
const MAX_WEEKS_IN_MONTH = 6

const SECOND_IN_MS = 1000
const MINUTE_IN_MS = 60 * SECOND_IN_MS
const HOUR_IN_MS = 60 * MINUTE_IN_MS
const DAY_IN_MS = 24 * HOUR_IN_MS
const MINUTE_IN_S = MINUTE_IN_MS / SECOND_IN_MS

function getTime(date: Date | number, time: number) {
  const dateDate = new Date(date)
  const target = new Date(time)
  target.setFullYear(
    dateDate.getFullYear(),
    dateDate.getMonth(),
    dateDate.getDate(),
  )
  return target.getTime()
}
const formatTime = (time: string) => {
  return time === 'Invalid Date' ? '-' : time
}

export class Clock {
  private _initialTime = 0
  private _localTime = 0
  private _time = 0

  constructor(time?: number) {
    this.reset(time)
  }

  update() {
    const newLocalTime = Date.now()
    this._time += newLocalTime - this._localTime
    this._localTime = newLocalTime
  }

  getTime() {
    this.update()
    return this._time
  }

  getSpendTime() {
    this.update()
    return this._localTime - this._initialTime
  }

  reset(time?: number) {
    this._initialTime = Date.now()
    this._localTime = this._initialTime
    this._time = time || this._localTime
  }
}

const nowClock = new Clock()
const now = () => nowClock.getTime()
const setNow = throttle((time: number) => nowClock.reset(time), 1000)

const DAY = Object.freeze(new Constant<any, string>({
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  0: '日',
}))

const getMonthWeek = function (year: number, month: number, date: number) {
  const nowDate = new Date(year, month)
  return Math.ceil((date + nowDate.getDate()) / 7)
}

// 处理时间
function formatSeconds(time: number, formatter = 'HH:mm:ss') {
  return dayjs.duration(Math.max(time, 0), 's').format(formatter)
}

// 接口存储时间戳最小单位为s,处理为ms
const getTimeInSecond = (time: number | null) => time ? time + 999 : time

export default dayjs
export {
  WEEK_LIST,
  MAX_WEEKS_IN_MONTH,
  DAYS_IN_WEEK,
  DAY_IN_MS,
  HOUR_IN_MS,
  MINUTE_IN_MS,
  SECOND_IN_MS,
  MINUTE_IN_S,
  formatTime,
  getTime,
  now,
  setNow,
  DAY,
  getMonthWeek,
  ConfigType,
  formatSeconds,
  getTimeInSecond,
}
