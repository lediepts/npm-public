import { Request } from "express";

export const getIP = (req: Request<any>) => {
  const getIp = require("ipware")().get_ip;
  const { clientIp }: { clientIp: string; clientIpRoutable: boolean } =
    getIp(req);
  const forwarded = req.headers["x-forwarded-for"] as string;
  return forwarded || clientIp;
};
