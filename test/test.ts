/* tslint:disable:no-console */

import Koa, { Context } from 'koa'
import session from '../lib'

const app = new Koa()

app.use(session(app))

app.use((ctx: Context) => {
  const sess = ctx.getSession<{ views: number }>('some-id')
  ctx.body = `Data: ${JSON.stringify(sess)}`

  // let n = sess.views || 0
  // sess.views = ++n
  //
  // ctx.body = n + ' views'
})

app.listen(3000)
console.log('listening on port 3000')
