import { LoggerService } from "./Service";
import { WinsonLoggerImpl } from "./Impl";
import { config } from "./index";

export const Logger: LoggerService = WinsonLoggerImpl.init(config);
