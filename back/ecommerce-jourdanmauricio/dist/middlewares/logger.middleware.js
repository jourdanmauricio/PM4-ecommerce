"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerGlobal = void 0;
const formatDate_1 = require("../helpers/formatDate");
function loggerGlobal(req, res, next) {
    const date = (0, formatDate_1.default)(new Date());
    console.log(`[INFO] - ${date} - Endpoint ${req.url} - ${req.method}`);
    next();
}
exports.loggerGlobal = loggerGlobal;
//# sourceMappingURL=logger.middleware.js.map