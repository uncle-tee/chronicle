"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Impl_1 = require("./Impl");
const index_1 = require("./index");
exports.Log = Impl_1.WinsonLoggerImpl.init(index_1.config);
