export interface CreateAsyncStorageOptions<T = any> {
  set: (key: keyof T, value: unknown) => Promise<T[typeof key]>
  get: (key: keyof T) => Promise<T[typeof key]>
  remove: (key: keyof T) => Promise<void>
  clear: () => Promise<void>
}

type AwaitToJsReturnType<T> = Promise<[Error, undefined] | [null, T]>

export declare class AbstractAsyncStorage<Mapping> {
  set<T extends keyof Mapping>(key: T, value: ValueOrUpdater<Mapping[T]>): AwaitToJsReturnType<Mapping[T]>

  get<T extends keyof Mapping>(key: T): AwaitToJsReturnType<Mapping[T]>

  remove<T extends keyof Mapping>(key: T): AwaitToJsReturnType<any>

  clear(): AwaitToJsReturnType<any>
}

export type Updater<T> = (value: T) => T

export type ValueOrUpdater<Value> = Value | Updater<Value>

export type NotUndefined<T> = T extends undefined ? never : T
