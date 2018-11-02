"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const context_1 = require("./context");
const memory_store_1 = tslib_1.__importDefault(require("./memory_store"));
const session = (app, opts) => {
    const _opts = lodash_1.default.merge({
        maxAge: 86400000,
        store: () => new memory_store_1.default(),
        autoCommit: true,
        rolling: false
    }, opts || {});
    context_1.extendContext(app.context, _opts);
    return (ctx, next) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        const sessCtx = context_1.getSessionContext(ctx);
        try {
            yield next();
        }
        catch (e) {
            throw e;
        }
        finally {
            if (_opts.autoCommit) {
            }
        }
    });
};
exports.default = session;
