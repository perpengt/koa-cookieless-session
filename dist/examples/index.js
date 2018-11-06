"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const koa_1 = tslib_1.__importDefault(require("koa"));
const index_1 = tslib_1.__importDefault(require("../lib/index"));
const app = new koa_1.default();
app.use(index_1.default(app));
app.use((ctx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
    if (ctx.path === '/favicon.ico') {
        return;
    }
    const sess = yield ctx.getSession(ctx.path);
    if (ctx.path === '/not-modify') {
        if (sess.views == null) {
            sess.views = 500;
        }
        ctx.body = `Always ${sess.views} views`;
        return;
    }
    let n = sess.views || 0;
    sess.views = ++n;
    ctx.body = `${n} view${n === 1 ? '' : 's'}`;
}));
app.listen(3000);
console.log('listening on port 3000');
