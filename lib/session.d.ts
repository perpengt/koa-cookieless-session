import { Context } from 'koa'
import { SessionOpts } from './opts'

declare module 'koa' {
  interface Context {
    getSession: <T extends { [key: string]: any }>(sessID: string) => T
  }
}

interface SessionMethods {

}

interface Session {
  new <T> (ctx: Context, opts: SessionOpts): T & SessionMethods
}

export = Session
