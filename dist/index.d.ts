import Koa from 'koa';
import { SessionOpts } from './opts';
declare const session: (app: Koa, opts?: Partial<SessionOpts> | undefined) => (ctx: Koa.Context, next: () => Promise<void>) => Promise<void>;
export default session;
