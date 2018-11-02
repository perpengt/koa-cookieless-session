import { Store } from './store'

const sessions: { [key: string]: any } = {}

export default class MemoryStore implements Store {
  public async get (key: string) {
    return sessions[key]
  }

  public async set (key: string, value: any) {
    if (value === undefined) {
      this.destroy(key)
      return
    }
    sessions[key] = value
  }

  public async destroy (key: string) {
    delete sessions[key]
  }
}
