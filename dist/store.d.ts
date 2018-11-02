import { SessionOpts } from './opts';
export interface Store {
    get(key: string, maxAge: SessionOpts['maxAge'], data: {
        rolling: SessionOpts['rolling'];
    }): any;
    set(key: string, sess: any, maxAge: SessionOpts['maxAge'], data: {
        changed: boolean;
        rolling: SessionOpts['rolling'];
    }): any;
    destroy(key: string): any;
}
