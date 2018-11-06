import { Store } from './store';
export default class MemoryStore implements Store {
    constructor();
    get(key: string): Promise<any>;
    set(key: string, value: any): Promise<void>;
    destroy(key: string): Promise<void>;
}
