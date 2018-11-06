interface SessionMethods {
  toJSON (): object
}

class Session {
  public sessID: string

  constructor (sessID: string) {
    this.sessID = sessID
  }

  public toJSON () {
    const json: { [key: string]: any } = {}

    Object.keys(this).forEach((key) => {
      json[key] = this[key]
    })

    return json
  }
}

declare interface Session extends SessionMethods {
  [key: string]: any
}

export default Session
