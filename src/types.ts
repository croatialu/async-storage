export interface CreateAsyncStorageOptions<T = any> {
  set: (key: keyof T, value: unknown) => Promise<T[typeof key]>
  get: (key: keyof T) => Promise<T[typeof key]>
  remove: (key: keyof T) => Promise<void>
  clear: () => Promise<void>
}
