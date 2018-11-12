import Koa, { Context } from 'koa'
import { extendContext, getSessionContext } from './context'
import GenericSessionStore from './generic_session_store'
import MemoryStore from './memory_store'
import { SessionOpts } from './opts'
import Session from './session'
import { Store } from './store'

// Exports
export {
  Session,
  SessionOpts,
  Store,
  MemoryStore,
  GenericSessionStore
}

declare module 'koa' {
  interface BaseContext {
    getSession (sessID: string): Promise<Session>
  }
  interface Context {
    getSession (sessID: string): Promise<Session>
  }
}

const session = (app: Koa, opts?: Partial<SessionOpts>) => {
  const _opts = {
    maxAge: 86400000,
    store: () => new MemoryStore(),
    autoCommit: true,
    rolling: false,
    ...opts
  }
  extendContext(app.context, _opts)

  return async (ctx: Context, next: () => Promise<void>) => {
    const sessCtx = getSessionContext(ctx)
    try {
      await next()
    } catch (e) {
      throw e
    } finally {
      if (_opts.autoCommit) {
        await sessCtx.commit()
      }
    }
  }
}
export default session
