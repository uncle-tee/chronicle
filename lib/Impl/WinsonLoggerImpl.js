"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston = __importStar(require("winston"));
const winston_1 = require("winston");
const RequestRegistrar_1 = require("../RequestRegistrar");
const winston_cloudwatch_1 = __importDefault(require("winston-cloudwatch"));
class WinsonLoggerImpl {
    constructor(config) {
        this.config = config;
        this.logger = this.configWinson(config);
    }
    critical(message, meta) {
        meta = this.buildRequestId(meta);
        this.logger.error(message, meta);
    }
    info(message, meta) {
        meta = this.buildRequestId(meta);
        this.logger.info(message, meta);
    }
    buildRequestId(meta) {
        const assign = Object.assign({
            requestId: RequestRegistrar_1.getCorrelationIdInContext(),
        }, meta);
        return assign;
    }
    static init(config) {
        return new WinsonLoggerImpl(config);
    }
    configWinson(config) {
        const logger = winston_1.createLogger({
            exitOnError: false,
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.printf(({ level, message, ...metadata }) => {
                return `(${metadata.requestId})  [${level}] : ${message} \nAdditional Info: \n ${JSON.stringify(metadata)}`;
            })),
        });
        logger.add(new winston.transports.Console({
            handleExceptions: true,
        }));
        if (config.useAws) {
            logger.add(new winston_cloudwatch_1.default({
                logGroupName: config.groupName,
                logStreamName: config.streamName,
                awsSecretKey: config.awsSecret,
                awsAccessKeyId: config.awsKey,
                awsRegion: config.awsRegion,
                jsonMessage: true,
                messageFormatter: this.formatCloudWatchMessage(),
            }));
        }
        return logger;
    }
    formatCloudWatchMessage() {
        return (logObject) => {
            const level = logObject.level;
            const message = logObject.message;
            const metaData = logObject;
            return `[${level}] : ${message} \nAdditional Info: \n ${JSON.stringify(metaData)}}`;
        };
    }
}
exports.WinsonLoggerImpl = WinsonLoggerImpl;
