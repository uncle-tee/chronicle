import { initRequestTaggingContext } from "../src/RequestRegistrar";
import express from "express";
import { errorStackTraceMiddleWare } from "clue";
import { RequestLogTaggingMiddleware } from "../src";
import { Logger } from "../src";

initRequestTaggingContext();

const app = express();
const PORT = 8000;

const stackTraceLogger = errorStackTraceMiddleWare(
  (err, request, response, next) => {
    Logger.critical("There is a critical mittion here", {
      tag: ["SALES", "PAYMENT"],
      stackTrace: err,
    });
    return response.json("error has failed");
  }
);

app.use(RequestLogTaggingMiddleware);

app.get("/", (req, res) => {
  throw Error();
  res.json("Running successfully");
});

app.use(stackTraceLogger);

app.listen(PORT, () =>
  console.log(`Server is starting on port on port ${PORT}`)
);
