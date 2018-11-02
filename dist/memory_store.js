"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sessions = {};
class MemoryStore {
    get(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return sessions[key];
        });
    }
    set(key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (value === undefined) {
                this.destroy(key);
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
