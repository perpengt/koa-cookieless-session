import { BaseContext, Context } from 'koa';
import { SessionOpts } from './opts';
export default class SessionContext {
    private ctx;
    private opts;
    private store;
    private readonly app;
    constructor(ctx: Context, opts: SessionOpts);
    get<T>(sessID: string): string;
}
declare const extendContext: (ctx: BaseContext, opts: SessionOpts) => void;
declare const getSessionContext: (ctx: Context) => SessionContext;
export { extendContext, getSessionContext };
