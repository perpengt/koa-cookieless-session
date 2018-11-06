"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const object_hash_1 = tslib_1.__importDefault(require("object-hash"));
const session_1 = tslib_1.__importDefault(require("./session"));
const CTX_SESS_KEY = '__ctx_sess__';
const TMP_SESS_KEY = '__ctx_sess_tmp__';
class SessionContext {
    constructor(ctx, opts) {
        this.sessList = {};
        this.ctx = ctx;
        this.opts = opts;
        this.store = typeof opts.store === 'function'
            ? opts.store()
            : opts.store;
    }
    get(sessID) {
        const sessFn = this.sessList.hasOwnProperty(sessID)
            ? () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const { sess } = this.sessList[sessID];
                return sess;
            })
            : () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const json = yield this.store.get(sessID);
                const sess = this.create(sessID, json);
                this.sessList[sessID] = { sess, hash: object_hash_1.default(json || {}) };
                return sess;
            });
        return sessFn();
    }
    commit() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            for (const sessID in this.sessList) {
                if (!this.sessList.hasOwnProperty(sessID)) {
                    continue;
                }
                const { sess, hash } = this.sessList[sessID];
                if (sess.removed) {
                    yield this.remove(sessID);
                    return;
                }
                const json = sess.toJSON();
                if (object_hash_1.default(json) === hash) {
                    return;
                }
                yield this.store.set(sessID, json, this.opts.maxAge);
            }
        });
    }
    create(sessID, data) {
        const sess = new session_1.default(sessID);
        for (const key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }
            sess[key] = data[key];
        }
        return sess;
    }
    remove(sessID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.store.destroy(sessID);
        });
    }
}
exports.default = SessionContext;
const extendContext = (ctx, opts) => {
    Object.defineProperties(ctx, {
        [CTX_SESS_KEY]: {
            get() {
                if (this[TMP_SESS_KEY] !== undefined) {
                    return this[TMP_SESS_KEY];
                }
                this[TMP_SESS_KEY] = new SessionContext(this, opts);
                return this[TMP_SESS_KEY];
            }
        },
        getSession: {
            get() {
                return (sessID) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const sess = yield this[CTX_SESS_KEY].get(sessID);
                    return sess;
                });
            }
        }
    });
};
exports.extendContext = extendContext;
const getSessionContext = (ctx) => {
    return ctx[CTX_SESS_KEY];
};
exports.getSessionContext = getSessionContext;
