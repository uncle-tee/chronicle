"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debugLog_1 = require("./debugLog");
const uuid_1 = require("uuid");
const cls_hooked_1 = require("cls-hooked");
exports.NAMESPACE_NAME = "__request___cls_hooked_tx_namespace";
exports.CORRELATION_ID = "__correlation_id_tag___";
exports.initRequestTaggingContext = () => {
    debugLog_1.debugLog(`======= _______Initializing RequestRaggingContest ________- =========`);
    return cls_hooked_1.getNamespace(exports.NAMESPACE_NAME) || cls_hooked_1.createNamespace(exports.NAMESPACE_NAME);
};
exports.getRequestTaggingContext = () => {
    const namespace = exports.initRequestTaggingContext();
    if (!namespace) {
        throw Error("Initialise The Request Tagging Context");
    }
    return namespace;
};
exports.getCorrelationIdInContext = () => {
    var _a;
    return (_a = exports.getRequestTaggingContext()) === null || _a === void 0 ? void 0 : _a.get(exports.CORRELATION_ID);
};
exports.setCorrelationIdInContext = (value) => {
    var _a;
    return (_a = exports.getRequestTaggingContext()) === null || _a === void 0 ? void 0 : _a.set(exports.CORRELATION_ID, value);
};
exports.runInContext = (fn, id) => {
    exports.getRequestTaggingContext().run(() => {
        exports.setCorrelationIdInContext(id || uuid_1.v4());
        fn();
    });
};
