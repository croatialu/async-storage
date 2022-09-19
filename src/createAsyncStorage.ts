import to from 'await-to-js'
import type { AbstractAsyncStorage, CreateAsyncStorageOptions, ValueOrUpdater } from './types'
import { getValueFromValueOrUpdater, isUpdater } from './utils'

const createAsyncStorage = (options: CreateAsyncStorageOptions) => {
  const { set, get, remove, clear } = options

  return class AsyncStorage<Mapping> implements AbstractAsyncStorage<Mapping> {
    async set<T extends keyof Mapping>(key: T, value: ValueOrUpdater<Mapping[T]>) {
      if (isUpdater(value)) {
        const [err, res] = await this.get(key)

        if (err)
          throw err

        return to(set(key, getValueFromValueOrUpdater(value, res)))
      }

      return to(set(key, value))
    }

    async get<T extends keyof Mapping>(key: T) {
      return to(get(key) as Promise<Mapping[T]>)
    }

    async remove<T extends keyof Mapping>(key: T) {
      return to(remove(key))
    }

    async clear() {
      return to(clear())
    }
  }
}

export default createAsyncStorage
