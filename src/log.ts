import { LoggerService } from "./Service";
import { WinsonLoggerImpl } from "./Impl";
import { config } from "./index";

export const Log: LoggerService = WinsonLoggerImpl.init(config);
