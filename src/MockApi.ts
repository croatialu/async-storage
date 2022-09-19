class MockApi {
  private value: Record<string, unknown> = {}

  constructor(
    private timeout = 300,
  ) {}

  private sleep(localTimeout?: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, localTimeout || this.timeout)
    })
  }

  async set(key: keyof any, value: unknown) {
    await this.sleep()
    Reflect.set(this.value, key, value)
  }

  async get(key: keyof any) {
    await this.sleep()
    return Reflect.get(this.value, key)
  }

  async remove(key: keyof any) {
    await this.sleep()
    Reflect.deleteProperty(this.value, key)
  }

  async clear() {
    await this.sleep()

    this.value = {}
  }
}

export default MockApi
