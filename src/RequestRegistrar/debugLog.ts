import { config } from "../index";

export const debugLog = (message?: any, ...optionalParams: any[]): void => {
  if (config.logRequestTagging) {
    // tslint:disable-next-line: no-console
    console.log(message, ...optionalParams);
  }
};
