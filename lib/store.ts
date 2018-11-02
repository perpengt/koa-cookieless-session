import { SessionOpts } from './opts'
import Session from './session'

export interface Store {
  /**
   * get session object by key
   */
  get (
    key: string,
    maxAge: SessionOpts['maxAge'],
    data: { rolling: SessionOpts['rolling'] }
  ): any

  /**
   * set session object for key, with a maxAge (in ms)
   */
  set (
    key: string,
    sess: any,
    maxAge: SessionOpts['maxAge'],
    data: { changed: boolean; rolling: SessionOpts['rolling'] }
  ): any

  /**
   * destroy session for key
   */
  destroy (key: string): any
}
