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

  if (ctx.path === '/not-modify') {
    if (sess.views == null) {
      sess.views = 500
    }
    ctx.body = `Always ${sess.views} views`
    return
  }

  let n = sess.views || 0
  sess.views = ++n

  ctx.body = `${n} view${n === 1 ? '' : 's'}`
})

app.listen(3000)
console.log('listening on port 3000')
