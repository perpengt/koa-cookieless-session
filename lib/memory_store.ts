/* tslint:disable:no-console */

import { Store } from './store'

const sessions: { [key: string]: any } = {}

/* tslint:disable-next-line:no-console */
console.log('[WARN] MemoryStore should not be used in a production.')

export default class MemoryStore implements Store {
  public async get (key: string) {
    return sessions[key]
  }

  public async set (key: string, value: any) {
    console.log(`key: ${key}, value: ${JSON.stringify(value)}`)
    if (value === undefined) {
      await this.destroy(key)
      return
    }
    sessions[key] = value
  }

  public async destroy (key: string) {
    delete sessions[key]
  }
}
