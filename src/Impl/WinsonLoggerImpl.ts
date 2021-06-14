import { LoggerService } from "../Service";
import { Config, MetaData } from "../Data";
import * as winston from "winston";
import { createLogger, format } from "winston";
import { getCorrelationIdInContext } from "../RequestRegistrar";
import WinstonCloudwatch, { LogObject } from "winston-cloudwatch";

export class WinsonLoggerImpl implements LoggerService {
  private logger: winston.Logger;

  private constructor(private readonly config: Config) {
    this.logger = this.configWinson(config);
  }

  critical(message: string, meta?: MetaData): void {
    meta = this.buildRequestId(meta);
    this.logger.error(message, meta);
  }

  info(message: string, meta?: MetaData): void {
    meta = this.buildRequestId(meta);
    this.logger.info(message, meta);
  }

  private buildRequestId(meta?: MetaData): MetaData {
    const assign = Object.assign(
      {
        requestId: getCorrelationIdInContext(),
      },
      meta
    );
    return assign;
  }

  static init(config: Config): LoggerService {
    return new WinsonLoggerImpl(config);
  }

  private configWinson(config: Config) {
    const logger = createLogger({
      exitOnError: false,
      format: format.combine(
        format.timestamp(),
        format.printf(({ level, message, ...metadata }) => {
          return `(${
            metadata.requestId
          })  [${level}] : ${message} \nAdditional Info: \n ${JSON.stringify(
            metadata
          )}`;
        })
      ),
    });
    logger.add(
      new winston.transports.Console({
        handleExceptions: true,
      })
    );

    if (config.useAws) {
      logger.add(
        new WinstonCloudwatch({
          logGroupName: config.groupName,
          logStreamName: config.streamName,
          awsSecretKey: config.awsSecret,
          awsAccessKeyId: config.awsKey,
          awsRegion: config.awsRegion,
          jsonMessage: true,
          messageFormatter: this.formatCloudWatchMessage(),
        })
      );
    }
    return logger;
  }

  private formatCloudWatchMessage() {
    return (logObject: LogObject) => {
      const level = logObject.level;
      const message = logObject.message;
      const metaData = logObject as MetaData;
      return `[${level}] : ${message} \nAdditional Info: \n ${JSON.stringify(
        metaData
      )}}`;
    };
  }
}
