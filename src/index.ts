import createAsyncStorage from './createAsyncStorage'

enum StorageKeys {
  USER = 'USER',
}

interface StorageMapping {
  [StorageKeys.USER]: { name: string; age: string; address: string; gender: 'male' | 'female' }
}

const Localstorage = createAsyncStorage({
  async set(key, value) {
    return await '123'
  },
  async get() {
    return await '123'
  },
  async remove() {
  },
  async clear() {
  },
})

const local = new Localstorage<StorageMapping>()

export {
  createAsyncStorage,
}

