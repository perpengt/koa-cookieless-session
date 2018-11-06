import { SessionOpts } from './opts';
export interface Store {
    get(sessID: string): Promise<object>;
    set(sessID: string, data: any, maxAge: SessionOpts['maxAge']): Promise<void>;
    destroy(sessID: string): Promise<void>;
}
