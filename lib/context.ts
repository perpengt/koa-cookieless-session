import { BaseContext, Context } from 'koa'
import generateHash from 'object-hash'
import { SessionOpts } from './opts'
import Session from './session'
import { Store } from './store'

const CTX_SESS_KEY = '__ctx_sess__'
const TMP_SESS_KEY = '__ctx_sess_tmp__'

export default class SessionContext {
  private ctx: Context
  private opts: SessionOpts
  private store: Store

  private sessList: {
    [sessID: string]: {
      sess: Session
      hash: string
    }
  } = {}

  constructor (ctx: Context, opts: SessionOpts) {
    this.ctx = ctx
    this.opts = opts

    this.store = typeof opts.store === 'function'
      ? opts.store()
      : opts.store
  }

  public get (sessID: string): Promise<Session> {
    const sessFn = this.sessList.hasOwnProperty(sessID)
      ? async () => {
        const { sess } = this.sessList[sessID]
        return sess
      }
      : async () => {
        const json = await this.store.get(sessID)
        const sess = this.create(sessID, json)
        this.sessList[sessID] = { sess, hash: generateHash(json || {}) }
        return sess
      }
    return sessFn()
  }

  public async commit () {
    for (const sessID in this.sessList) {
      if (!this.sessList.hasOwnProperty(sessID)) {
        continue
      }

      const { sess, hash } = this.sessList[sessID]

      if (sess.removed) {
        await this.remove(sessID)
        return
      }

      const json = sess.toJSON()

      // Not modified, skip.
      if (generateHash(json) === hash) {
        return
      }

      await this.store.set(sessID, json, this.opts.maxAge)
    }
  }

  private create (sessID: string, data: { [key: string]: any }): Session {
    const sess = new Session(sessID)

    for (const key in data) {
      if (!data.hasOwnProperty(key)) {
        continue
      }
      sess[key] = data[key]
    }

    return sess
  }

  private async remove (sessID: string) {
    await this.store.destroy(sessID)
  }
}

const extendContext = (ctx: BaseContext, opts: SessionOpts) => {
  Object.defineProperties(ctx, {
    [CTX_SESS_KEY]: {
      get () {
        if (this[TMP_SESS_KEY] !== undefined) {
          return this[TMP_SESS_KEY]
        }
        this[TMP_SESS_KEY] = new SessionContext(this, opts)
        return this[TMP_SESS_KEY]
      }
    },

    getSession: {
      get () {
        return async (sessID: string) => {
          const sess = await this[CTX_SESS_KEY].get(sessID)
          return sess
        }
      }
    }
  })
}

const getSessionContext = (ctx: Context): SessionContext => {
  return (ctx as any)[CTX_SESS_KEY] as SessionContext
}

export {
  extendContext,
  getSessionContext
}
