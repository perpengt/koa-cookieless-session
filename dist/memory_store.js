"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sessions = {};
class MemoryStore {
    constructor() {
        console.log('[WARN] MemoryStore should not be used in a production.');
    }
    get(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`[DBUG] Get: key='${key}'`);
            return sessions[key];
        });
    }
    set(key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(`[DBUG] Set: key='${key}', value=${JSON.stringify(value)}`);
            if (value === undefined) {
                yield this.destroy(key);
                return;
            }
            sessions[key] = value;
        });
    }
    destroy(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            delete sessions[key];
        });
    }
}
exports.default = MemoryStore;
