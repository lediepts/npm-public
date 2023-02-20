import * as core from "express-serve-static-core";
import { Request } from "express";
export interface UITheme {
  mode: "dark" | "light";
  primaryColor: string;
  secondaryColor: string;
}
export interface SocketEvent {
  action: "created" | "updated" | "deleted" | "async";
  id: number;
  message?: {
    projectId?: number;
    teamId?: number;
    type?: string;
  };
}
export interface MessageSystem {
  message: string;
  type: "success" | "info" | "warning" | "error";
  delay?: number;
}

export type StatusFlag = "init" | "active" | "deleted";
export interface ServiceRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  loginInfo?: TokenInfo;
}

export interface TokenInfo {
  id: number;
  name: string;
  code: string;
  teamId: number;
  primary: boolean;
  scopes: string[];
}
