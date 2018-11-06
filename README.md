# koa-cookieless-session
`Currently in development`

Cookieless session library for API Servers; Compatible with koa-sessions' external store.

This library was developed with reference to the source code of koa-session.

# Usage

TypeScript

```typescript
import Koa, { Context } from 'koa'
import session from 'koa-cookieless-session'

const app = new Koa()

app.use(session({
  ...configs
}))

app.use((ctx: Context) => {
  const session = ctx.getSession<{ views: number }>('some-id')
  
  let n = session.views || 0
  session.views = ++n
  
  session.save()
  
  ctx.body = n + ' views'
})

app.listen(3000)
console.log('listening on port 3000')
```

JavaScript

```javascript
const Koa = require('koa')
const session = require('koa-cookieless-session')

const app = new Koa()

app.use(session({
  ...configs
}))

app.use((ctx) => {
  const session = ctx.getSession('some-id')
  
  let n = session.views || 0
  session.views = ++n
  
  session.save()
  
  ctx.body = n + ' views'
})

app.listen(3000)
console.log('listening on port 3000')
```
