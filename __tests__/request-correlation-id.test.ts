import { getCorrelationIdInContext } from "../src/RequestRegistrar";
import express from "express";
import { RequestLogTaggingMiddleware } from "../src";
import supertest = require("supertest");
import { mockHttpServer } from "../__mocks__/mock";

describe("--correlationId-- Test", () => {
  it("Test that there will be no request correlation Id outside a context", () => {
    const correlationIdInContext = getCorrelationIdInContext();
    expect(correlationIdInContext).toBeUndefined();
  });

  it("Test that a unique correlation header Id is added ", () => {
    const app = express();
    app.disable("x-powered-by");
    app.use(RequestLogTaggingMiddleware);
    mockHttpServer(app);
    const superTest = supertest(app);
    superTest
      .get("/test")
      .query({ delay: 100 })
      .end((err, res) => {
        expect(res.header["x-correlation-id"]).toBeDefined();
      });
  });

  it("Test that there will be unique correlation id across concurrent request", (done) => {
    const app = express();
    app.disable("x-powered-by");
    app.use(RequestLogTaggingMiddleware);
    mockHttpServer(app);
    const su = supertest(app);
    const requestOneCorrelationId = "requestOneCorrelationId";
    const requestTwoCorrelationId = "requestTwoCorrelationId";
    su.get("/test")
      .set("x-correlation-id", requestOneCorrelationId)
      .query({ delay: 100 })
      .end((err, res) => {
        expect(res.header["x-correlation-id"]).toBeDefined();
        expect(res.header["x-correlation-id"]).toEqual(requestOneCorrelationId);
        done();
      });

    su.get("/test")
      .set("x-correlation-id", requestTwoCorrelationId)
      .query({ delay: 50 })
      .end((err, res) => {
        expect(res.header["x-correlation-id"]).toBeDefined();
        expect(res.header["x-correlation-id"]).toEqual(requestTwoCorrelationId);
      });
  });
});
