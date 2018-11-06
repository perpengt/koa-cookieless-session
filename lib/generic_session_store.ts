import { SessionStore } from 'koa-generic-session'
import { SessionOpts } from './opts'
import { Store } from './store'

export class GenericSessionStore implements Store {
  private store: SessionStore

  constructor (store: SessionStore) {
    this.store = store
  }

  public async get (sessID: string) {
    const json = await this.store.get(sessID)
    return json
  }

  public async set (sessID: string, data: any, maxAge: SessionOpts['maxAge']) {
    await this.store.set(sessID, data, maxAge)
  }

  public async destroy (sessID: string) {
    await this.store.destroy(sessID)
  }
}
