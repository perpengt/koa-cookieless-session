interface SessionMethods {
  toJSON (): object
}

class Session {
  public sessID: string
  private _removed: boolean = false

  public get removed () {
    return this._removed
  }

  constructor (sessID: string) {
    this.sessID = sessID
  }

  public toJSON () {
    const json: { [key: string]: any } = {}

    Object.keys(this)
      .filter((key) => !key.startsWith('_'))
      .forEach((key) => { json[key] = this[key] })

    return json
  }

  public remove () {
    this.isRemoved = true
  }
}

declare interface Session extends SessionMethods {
  [key: string]: any
}

export default Session
