import Koa, { Context } from 'koa'
import _ from 'lodash'
import { extendContext, getSessionContext } from './context'
import MemoryStore from './memory_store'
import { SessionOpts } from './opts'

const session = (app: Koa, opts?: Partial<SessionOpts>) => {
  const _opts = _.merge< SessionOpts, Partial<SessionOpts> >({
    maxAge: 86400000,
    store: () => new MemoryStore(),
    autoCommit: true,
    rolling: false
  }, opts || {})
  extendContext(app.context, _opts)

  return async (ctx: Context, next: () => Promise<void>) => {
    const sessCtx = getSessionContext(ctx)
    try {
      await next()
    } catch (e) {
      throw e
    } finally {
      if (_opts.autoCommit) {

      }
    }
  }
}
export default session
