import { Store } from './store';
export interface SessionOpts {
    maxAge: number;
    store: Store | (() => Store);
    autoCommit: boolean;
    rolling: boolean;
}
