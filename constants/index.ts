export type ValueOf<T> = T[keyof T]
type ConstantValueType = string | number | Symbol | boolean | null
export interface ConstantValue<T extends ConstantValueType> {
  label: string
  value: T
  [x: string]: any
}

export class Constant<R extends Record<string, ConstantValue<ConstantValueType>>, T extends ValueOf<R>> {
  constructor(public enums: R) {
    this.enums = enums
  }

  get values() {
    return Object.values(this.enums) as T[]
  }

  get(value?: ConstantValueType) {
    return this.values.find(item => item.value === value)
  }
}

export class ConstantWithDefault<
  R extends Record<string, ConstantValue<ConstantValueType>>, T extends ValueOf<R>,
> extends Constant<R, T> {
  constructor(enums: R, public defaultEnum: ConstantValue<T['value']>) {
    super(enums)
  }

  get valuesWithDefault() {
    return [this.defaultEnum, ...Object.values(this.enums)] as T[]
  }

  get defaultValue() {
    return this.defaultEnum.value as (T['value'])
  }

  formateValue(value: ConstantValueType) {
    return value === this.defaultEnum.value ? null : value as (T['value'])
  }
}

export const defineArrayConstant = <T extends ConstantValueType>(arr: ConstantValue<T>[]) => {
  Object.defineProperty(arr, 'get', {
    configurable: false,
    enumerable: false,
    get() {
      return (value: T) => arr.find(item => item.value === value)
    },
  })
  return Object.freeze(arr)
}

export type Override<P, S> = Omit<P, keyof S> & S

export const enum OPERATION_TYPE {
  ADD = 0,
  EDIT,
  DELETE,
  VIEW,
  CHECK,
  DRAG,
  DOWNLOAD,
  CODE,
  COPY,
  SHARE,
  Detail,
  PREVIEW,
  SETTING,
  TEMPLATE,
  ASSIGN,
  REVERT,
  EXPORT,
  CANCEL,
  START_SIGN,
  END_SIGN,
  SPECIFICATION,
  REFRESH,
  LESSON,
}

export const TASK_STATUS = Object.freeze({
  Pending: 0,
  Processing: 1,
  Completed: 2,
  Timeout: 3,
  Fail: 4,
  Cancel: 5,
  PartCompleted: 6,
  ExtraFieldFailed: 7,
  WaitingSubmit: 9,
})

export const ASYNC_OPERATE_STATUS = Object.freeze({
  validSuccess: {
    status: 2,
    remark: '校验成功',
  },
  validFail: {
    status: 3,
    remark: '校验失败',
  },
  success: {
    status: 4,
    remark: '处理成功',
  },
  cancel: {
    status: 5,
    remark: '已取消',
  },
  needReloadValid: {
    status: 7,
    remark: '需要重新校验',
  },
  waitingAudit: {
    status: 8,
    remark: '等待审批',
  },
})

export const SMS_COUNT = 60

export const TASK_STATUS_LIST = Object.freeze(
  new Constant({
    Pending: { label: '待处理', value: TASK_STATUS.Pending },
    Processing: { label: '处理中', value: TASK_STATUS.Processing },
    Completed: { label: '处理完成', value: TASK_STATUS.Completed },
    Timeout: { label: '任务超时', value: TASK_STATUS.Timeout },
    Fail: { label: '处理失败', value: TASK_STATUS.Fail },
    Cancel: { label: '任务取消', value: TASK_STATUS.Cancel },
    PartCompleted: { label: '部分成功', value: TASK_STATUS.PartCompleted },
    ExtraFieldFailed: { label: '字段校验失败', value: TASK_STATUS.ExtraFieldFailed },
    WaitingSubmit: { label: '等待提交导入', value: TASK_STATUS.WaitingSubmit },
  }),
)

export const enum OPERATE_GROUP_STATUS {
  Pending = 1,
  Success,
  IllegalData,
  Processing,
  Cancel,
  Checking,
  Fail,
  PartCompleted,
}
