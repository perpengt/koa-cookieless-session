import { BaseContext, Context } from 'koa'
import _ from 'lodash'
import { SessionOpts } from './opts'
import Session from './session'
import { Store } from './store'

const CTX_SESS_KEY = '__ctx_sess__'
const TMP_SESS_KEY = '__ctx_tmp_sess__'

export default class SessionContext {
  private ctx: Context
  private opts: SessionOpts
  private store: Store

  private get app () {
    return this.ctx.app
  }

  constructor (ctx: Context, opts: SessionOpts) {
    this.ctx = ctx
    this.opts = _.clone(opts)

    this.store = typeof opts.store === 'function'
      ? opts.store()
      : opts.store
  }

  public get <T> (sessID: string) {
    return ':D'
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
        return (sessID: string) => {
          return this[CTX_SESS_KEY].get(sessID)
        }
      }
    },

    clearSession: {
      get () {
        return (sessID: string) => {
          this[CTX_SESS_KEY].clear(sessID)
        }
      }
    },

    sessionOptions: {
      get () {
        return this[CTX_SESS_KEY].opts
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
