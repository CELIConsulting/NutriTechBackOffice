"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkInterceptor = void 0;
var operators_1 = require("rxjs/operators");
var NetworkInterceptor = /** @class */ (function () {
    function NetworkInterceptor(loader) {
        this.loader = loader;
    }
    NetworkInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        this.loader.show();
        return next.handle(request).pipe(operators_1.finalize(function () {
            _this.loader.hide();
        }));
    };
    return NetworkInterceptor;
}());
exports.NetworkInterceptor = NetworkInterceptor;
//# sourceMappingURL=network.interceptor.js.map