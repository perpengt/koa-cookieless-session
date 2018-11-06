/* tslint:disable:no-console */

import Koa, { Context } from 'koa'
import session from '../lib/index'

const app = new Koa()

app.use(session(app))

app.use(async (ctx: Context) => {
  if (ctx.path === '/favicon.ico') {
    return
  }

  const sess = await ctx.getSession(ctx.path)

  let n = sess.views || 0
  sess.views = ++n

  ctx.body = n + ' views'
})

app.listen(3000)
console.log('listening on port 3000')
