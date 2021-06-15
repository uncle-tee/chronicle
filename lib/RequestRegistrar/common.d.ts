/// <reference types="node" />
import { Namespace } from "cls-hooked";
import EventEmitter from "events";
export declare const NAMESPACE_NAME = "__request___cls_hooked_tx_namespace";
export declare const CORRELATION_ID = "__correlation_id_tag___";
export declare const initRequestTaggingContext: () => Namespace;
export declare const getRequestTaggingContext: () => Namespace;
export declare const getCorrelationIdInContext: () => string | null;
export declare const setCorrelationIdInContext: (value: string | EventEmitter) => string | EventEmitter;
export declare const runInContext: (fn: Function, id: string | undefined) => void;
