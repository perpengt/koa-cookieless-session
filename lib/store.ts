import { SessionStore } from 'koa-generic-session'
import { SessionOpts } from './opts'

export interface Store {
  /**
   * get session object by key
   */
  get (sessID: string): Promise<object>

  /**
   * set session object for key, with a maxAge (in ms)
   */
  set (sessID: string, data: any, maxAge: SessionOpts['maxAge']): Promise<void>

  /**
   * destroy session for key
   */
  destroy (sessID: string): Promise<void>
}
