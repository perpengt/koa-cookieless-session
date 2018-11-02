"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const CTX_SESS_KEY = '__ctx_sess__';
const TMP_SESS_KEY = '__ctx_tmp_sess__';
class SessionContext {
    get app() {
        return this.ctx.app;
    }
    constructor(ctx, opts) {
        this.ctx = ctx;
        this.opts = lodash_1.default.clone(opts);
        this.store = typeof opts.store === 'function'
            ? opts.store()
            : opts.store;
    }
    get(sessID) {
        return ':D';
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
                return (sessID) => {
                    this[CTX_SESS_KEY].get(sessID);
                };
            }
        },
        clearSession: {
            get() {
                return (sessID) => {
                    this[CTX_SESS_KEY].clear(sessID);
                };
            }
        },
        sessionOptions: {
            get() {
                return this[CTX_SESS_KEY].opts;
            }
        }
    });
};
exports.extendContext = extendContext;
const getSessionContext = (ctx) => {
    return ctx[CTX_SESS_KEY];
};
exports.getSessionContext = getSessionContext;
