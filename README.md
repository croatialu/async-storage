# async-storage

Asynchronous storage/config/redis... operation


## Useage


### basic
remote, API server, redis, or db, etc...,

``` typescript

import { createAsyncStorage } from '@croatialu/async-storage'

interface RemoteStorageTypes {
  user: { name: string, age: string, gender: 'male' | 'female' }
}

const RemoteStorage = createAsyncStorage({
  async set(key, value){
    return apiServer.post('/api/user-storage', { key, value })
  }
  async get(key){
    return apiServer.get('/api/user-storage')
  }
})

const remoteStorage = new RemoteStorage<RemoteStorageTypes>()

remoteStorage.set('user', { name: 'croatia', age: 23, gender: 'male' })

remoteStorage.set('user', (oldUser) => {
  return { ...oldUser, age: 24 }
})

```
