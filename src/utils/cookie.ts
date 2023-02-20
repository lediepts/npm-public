import * as dotenv from "dotenv";
import { Response } from "express";
import { TokenInfo } from "../interfaces";
import { createToken } from "./jwt";
dotenv.config();

const DAY = Number(process.env.AUTH_TOKEN_LIFE);
const cookieName = "__";
const HTTP_SECURE =
  process.env.TS_NODE_DEV === "true"
    ? {}
    : {
        httpOnly: true,
        secure: true,
      };

export function setAuthCookie(info: TokenInfo, res: Response) {
  const token = createToken(info);
  res.cookie(cookieName, token, {
    maxAge: DAY * 24 * 60 * 60 * 1000,
    signed: true,
    ...HTTP_SECURE,
  });
}
