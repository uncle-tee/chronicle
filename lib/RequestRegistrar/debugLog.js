"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
exports.debugLog = (message, ...optionalParams) => {
    if (index_1.config.logRequestTagging) {
        // tslint:disable-next-line: no-console
        console.log(message, ...optionalParams);
    }
};
