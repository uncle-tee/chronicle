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

export const LoggerConfig = (config: Config) => {
  if (config.useAws) {
    Object.keys(config).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      if (!config[key]) {
        throw new Error(
          "Please Provide all AWS credentials secrets since u want to show logs on AWS"
        );
      }
    });
  }
  return config;
};
