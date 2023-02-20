import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import { createServer } from "http";
import morgan from "morgan";
import { ServiceRequest } from "./interfaces";
import rootRouter from "./Routers";
import { getIP } from "./utils/getIP";
import path from "path";

dotenv.config();
const app = express();
app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "dist/views"));
app.use(express.static(path.join(process.cwd(), "dist/assets/")));
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cookieParser("4s-mmsi4"));
app.use(
  express.json({
    limit: "10mb",
  })
);

export const server = createServer(app);

// =======LOGGER=======
morgan.token("IP", function (req: Request) {
  return getIP(req);
});
morgan.token("TIME", function (req: Request) {
  return new Date().toLocaleTimeString();
});
morgan.token("req-data", function (req: ServiceRequest, res) {
  return `${
    req.params && Object.keys(req.params).length > 0
      ? "\nparams:" + JSON.stringify(req.params, null, 2)
      : ""
  }${req.query && Object.keys(req.query).length > 0 ? "\nquery:" + JSON.stringify(req.query, null, 2) : ""}${req.body && Object.keys(req.body).length > 0 ? "\nbody:" + JSON.stringify(req.body, null, 2) : ""}`;
});

app.use(
  morgan("=>[:TIME] :IP :method :url :status [:response-time ms] :req-data")
);

// APP cache setting

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  if (req.path.match(/\/api\//)) {
    res.setHeader("Cache-control", "no-cache, no-store");
    res.setHeader("Pragma", "no-cache");
  }
  next();
});

// API Router setting

app.use("/", rootRouter);

function start(port: number) {
  server.listen(port, () => {
    console.log(`Server on port ${port}`);
  });
}

export default {
  start,
};
