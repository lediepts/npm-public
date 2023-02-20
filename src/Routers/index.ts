import express from "express";

const rootRouter = express.Router();

rootRouter.use("/api/", (req, res) => {
  res.send("/api");
});

rootRouter.get("/help", (req, res) => {
  res.send("/help");
});

export default rootRouter;
