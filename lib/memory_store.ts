/* tslint:disable:no-console */

import { Store } from './store'

const sessions: { [key: string]: any } = {}

export default class MemoryStore implements Store {
  constructor () {
    console.log('[WARN] MemoryStore should not be used in a production.')
  }

  public async get (key: string) {
    console.log(`[DBUG] Get: key='${key}'`)
    return sessions[key]
  }

  public async set (key: string, value: any) {
    console.log(`[DBUG] Set: key='${key}', value=${JSON.stringify(value)}`)
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
