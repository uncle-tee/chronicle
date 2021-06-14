import { debugLog } from "./debugLog";
import { v4 as uuidv4 } from "uuid";

import { createNamespace, getNamespace, Namespace } from "cls-hooked";
import EventEmitter from "events";

export const NAMESPACE_NAME = "__request___cls_hooked_tx_namespace";
export const CORRELATION_ID = "__correlation_id_tag___";

export const initRequestTaggingContext = (): Namespace => {
  debugLog(
    `======= _______Initializing RequestRaggingContest ________- =========`
  );
  return getNamespace(NAMESPACE_NAME) || createNamespace(NAMESPACE_NAME);
};

export const getRequestTaggingContext = () => {
  const namespace = initRequestTaggingContext();
  if (!namespace) {
    throw Error("Initialise The Request Tagging Context");
  }
  return namespace;
};

export const getCorrelationIdInContext = (): string | null => {
  return getRequestTaggingContext()?.get(CORRELATION_ID);
};

export const setCorrelationIdInContext = (value: EventEmitter | string) => {
  return getRequestTaggingContext()?.set(CORRELATION_ID, value);
};

export const runInContext = (fn: Function, id: string | undefined) => {
  getRequestTaggingContext().run(() => {
    setCorrelationIdInContext(id || uuidv4());
    fn();
  });
};
