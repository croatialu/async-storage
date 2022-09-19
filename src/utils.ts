import type { NotUndefined, Updater, ValueOrUpdater } from './types'

export const isUpdater = <T>(value: ValueOrUpdater<T>): value is Updater<T> => {
  return typeof value === 'function'
}

export const getValueFromValueOrUpdater = <T>(valueOrUpdater: ValueOrUpdater<T>, value: T): T => {
  if (isUpdater(valueOrUpdater))
    return valueOrUpdater(value)

  return value
}

export function AssertNotUndefined<T>(value: T): asserts value is NotUndefined<T> {
  if (typeof value === 'undefined')
    throw new Error('Not Undefined')
}

