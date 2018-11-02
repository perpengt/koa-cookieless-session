class Session {
  constructor (ctx, opts) {
    this.data = {}

    return new Proxy(this, {
      has (target, p) {
        if (typeof this[p] === 'function') {
          return true
        }
        return target.data.hasOwnProperty(p)
      },
      get (target, p) {
        if (typeof this[p] === 'function') {
          return this[p]
        }
        return target.data[p.toString()]
      },
      set (target, p, value) {
        target.data[p.toString()] = value
        return true
      }
    })
  }
}

module.exports = Session
