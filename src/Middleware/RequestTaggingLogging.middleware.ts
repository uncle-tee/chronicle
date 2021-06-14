import {
  getCorrelationIdInContext,
  getRequestTaggingContext,
  runInContext,
} from "../RequestRegistrar";

export const RequestLogTaggingMiddleware = (req: any, res: any, next: any) => {
  getRequestTaggingContext().bindEmitter(req);
  getRequestTaggingContext().bindEmitter(res);
  runInContext(() => {
    const currentCorrelationId = getCorrelationIdInContext();
    res.set(`x-correlation-id`, currentCorrelationId as string);
    next();
  }, req.get("x-correlation-id"));
};
