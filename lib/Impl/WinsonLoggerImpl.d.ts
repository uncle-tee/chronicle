import { LoggerService } from "../Service";
import { Config, MetaData } from "../Data";
export declare class WinsonLoggerImpl implements LoggerService {
    private readonly config;
    private logger;
    private constructor();
    critical(message: string, meta?: MetaData): void;
    info(message: string, meta?: MetaData): void;
    private buildRequestId;
    static init(config: Config): LoggerService;
    private configWinson;
    private formatCloudWatchMessage;
}
