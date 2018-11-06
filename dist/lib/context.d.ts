import { BaseContext, Context } from 'koa';
import { SessionOpts } from './opts';
import Session from './session';
export default class SessionContext {
    private ctx;
    private opts;
    private store;
    private sessList;
    constructor(ctx: Context, opts: SessionOpts);
    get(sessID: string): Promise<Session>;
    commit(): Promise<void>;
    private create;
    private remove;
}
declare const extendContext: (ctx: BaseContext, opts: SessionOpts) => void;
declare const getSessionContext: (ctx: Context) => SessionContext;
export { extendContext, getSessionContext };
