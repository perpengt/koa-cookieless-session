import { SessionStore } from 'koa-generic-session';
import { SessionOpts } from './opts';
import { Store } from './store';
export declare class GenericSessionStore implements Store {
    private store;
    constructor(store: SessionStore);
    get(sessID: string): Promise<any>;
    set(sessID: string, data: any, maxAge: SessionOpts['maxAge']): Promise<void>;
    destroy(sessID: string): Promise<void>;
}
