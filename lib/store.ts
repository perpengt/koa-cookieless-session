import { SessionOpts } from './opts'

export interface Store {
  /**
   * get session object by key
   */
  get (
    key: string,
    maxAge: SessionOpts['maxAge'],
    data: { rolling: SessionOpts['rolling'] }
  ): Promise<object>

  /**
   * set session object for key, with a maxAge (in ms)
   */
  set (
    key: string,
    sess: any,
    maxAge: SessionOpts['maxAge'],
    data: { changed: boolean; rolling: SessionOpts['rolling'] }
  ): Promise<void>

  /**
   * destroy session for key
   */
  destroy (key: string): Promise<void>
}
