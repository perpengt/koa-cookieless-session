"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class GenericSessionStore {
    constructor(store) {
        this.store = store;
    }
    get(sessID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const json = yield this.store.get(sessID);
            return json;
        });
    }
    set(sessID, data, maxAge) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.store.set(sessID, data, maxAge);
        });
    }
    destroy(sessID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.store.destroy(sessID);
        });
    }
}
exports.GenericSessionStore = GenericSessionStore;
