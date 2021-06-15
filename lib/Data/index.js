"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerConfig = (config) => {
    if (config.useAws) {
        Object.keys(config).forEach((key) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            if (!config[key]) {
                throw new Error("Please Provide all AWS credentials secrets since u want to show logs on AWS");
            }
        });
    }
    return config;
};
