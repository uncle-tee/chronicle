"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestRegistrar_1 = require("../RequestRegistrar");
exports.RequestLogTaggingMiddleware = (req, res, next) => {
    RequestRegistrar_1.getRequestTaggingContext().bindEmitter(req);
    RequestRegistrar_1.getRequestTaggingContext().bindEmitter(res);
    RequestRegistrar_1.runInContext(() => {
        const currentCorrelationId = RequestRegistrar_1.getCorrelationIdInContext();
        res.set(`x-correlation-id`, currentCorrelationId);
        next();
    }, req.get("x-correlation-id"));
};
