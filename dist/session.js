"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Session {
    constructor(sessID) {
        this._removed = false;
        this.sessID = sessID;
    }
    get removed() {
        return this._removed;
    }
    toJSON() {
        const json = {};
        Object.keys(this)
            .filter((key) => !key.startsWith('_'))
            .forEach((key) => { json[key] = this[key]; });
        return json;
    }
    remove() {
        this.isRemoved = true;
    }
}
exports.default = Session;
