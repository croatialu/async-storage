import type { CreateAsyncStorageOptions } from './types'

const createAsyncStorage = (options: CreateAsyncStorageOptions) => {
  const { set, get, remove, clear } = options

  return class Storage<Mapping> {

  }
}

export default createAsyncStorage
