import createAsyncStorage from './createAsyncStorage'

import MockApi from './MockApi'
import type { AbstractAsyncStorage } from './types'
import { AssertNotUndefined } from './utils'

const mockApi = new MockApi()
const RemoteStorage = createAsyncStorage({
  async set(key, value) {
    return mockApi.set(key, value)
  },
  async get(key) {
    return mockApi.get(key)
  },
  async remove(key) {
    return mockApi.remove(key)
  },
  async clear() {
    return mockApi.clear()
  },

})

enum StorageKeys {
  USER = 'USER',
  OPENED = 'OPENED',
}

interface StorageMapping {
  [StorageKeys.USER]: { name: string; age: number; address: string; gender: 'male' | 'female' }
  [StorageKeys.OPENED]: boolean

}

const initUserInfo: StorageMapping[StorageKeys.USER] = { name: 'croatialu', age: 23, address: 'shenzhen, guangdong, china', gender: 'male' }

describe('first', () => {
  let local: AbstractAsyncStorage<StorageMapping>

  beforeEach(() => {
    local = new RemoteStorage<StorageMapping>()
  })

  test('set value', async () => {
    const [, user1] = await local.get(StorageKeys.USER)

    expect(user1 === undefined)

    const [, user2] = await local.set(
      StorageKeys.USER,
      initUserInfo,
    )

    expect(user2 !== undefined)
  })

  test('set value with updater', async () => {
    const [, user1] = await local.get(StorageKeys.USER)

    expect(user1 === undefined)

    await local.set(
      StorageKeys.USER,
      initUserInfo,
    )

    const [, user2] = await local.get(StorageKeys.USER)

    AssertNotUndefined(user2)

    expect(user2.age === 23)

    await local.set(StorageKeys.USER, (oldUser) => {
      return { ...oldUser, age: 24 }
    })

    const [, user3] = await local.get(
      StorageKeys.USER,
    )

    AssertNotUndefined(user3)

    expect(user3.age === 24)
  })

  test('get value', async () => {
    const [, user1] = await local.get(
      StorageKeys.USER,
    )

    expect(user1 === undefined)

    await local.set(
      StorageKeys.USER,
      initUserInfo,
    )

    const [, user2] = await local.get(StorageKeys.USER)

    AssertNotUndefined(user2)
    expect(user2.age === 23)
  })

  test('remove value', async () => {
    await Promise.all([
      local.set(
        StorageKeys.USER, initUserInfo,
      ),
      local.set(
        StorageKeys.OPENED, true,
      ),
    ])

    const [user1, opened1] = await Promise.all([
      local.get(StorageKeys.USER),
      local.get(StorageKeys.OPENED),
    ])

    expect(user1[1] !== undefined)
    expect(opened1[1] !== undefined)

    await local.remove(
      StorageKeys.USER,
    )

    const [user2, opened2] = await Promise.all([
      local.get(StorageKeys.USER),
      local.get(StorageKeys.OPENED),
    ])

    expect(user2 === undefined)
    expect(opened2 !== undefined)
  })

  test('clear all value', async () => {
    await Promise.all([
      local.set(
        StorageKeys.USER, initUserInfo,
      ),
      local.set(
        StorageKeys.OPENED, true,
      ),
    ])

    const [user1, opened1] = await Promise.all([
      local.get(StorageKeys.USER),
      local.get(StorageKeys.OPENED),
    ])

    expect(user1[1] !== undefined)
    expect(opened1[1] !== undefined)

    await local.clear()

    const [user2, opened2] = await Promise.all([
      local.get(StorageKeys.USER),
      local.get(StorageKeys.OPENED),
    ])

    expect(user2 === undefined)
    expect(opened2 === undefined)
  })
})

