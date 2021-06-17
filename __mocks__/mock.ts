import { Express } from "express";

export const mockHttpServer = (app: Express) => {
  app.get("/test", (req, res) => {
    const delay = Number(req.query.delay);
    setTimeout(() => {
      res.status(200).json({
        status: "ok",
      });
    }, delay);
  });
};
