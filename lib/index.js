"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.config = {
    awsKey: process.env.AWS_LOG_KEY || "",
    awsRegion: process.env.AWS_LOG_REGION || "",
    awsSecret: process.env.AWS_LOG_SECRET || "",
    groupName: process.env.LOG_GROUP_NAME || "",
    showLog: !!process.env.SHOW_LOG || true,
    streamName: process.env.LOG_STREAM_NAME || "",
    useAws: !!process.env.CLOUD_WATCH || false,
    logRequestTagging: !!process.env.REQUEST_TAGGINGCONSOLE_DEBUG || false,
};
__export(require("./Impl"));
__export(require("./Data"));
__export(require("./log"));
__export(require("./Middleware"));
