export interface MetaData {
    tag?: string[] | string;
    requestId?: string | null;
    stackTrace?: any;
    [optionName: string]: any;
}
export interface Config {
    awsKey?: string;
    awsSecret?: string;
    groupName?: string;
    streamName?: string;
    showLog: boolean;
    useAws?: boolean;
    awsRegion?: string;
    logRequestTagging?: boolean;
}
export declare const LoggerConfig: (config: Config) => Config;
