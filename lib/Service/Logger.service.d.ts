import { MetaData } from "../Data";
export interface LoggerService {
    critical(message: string, meta?: MetaData): void;
    info(message: string, meta?: MetaData): void;
}
