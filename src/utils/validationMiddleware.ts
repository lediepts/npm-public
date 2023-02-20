import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export default function validatorsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.sendStatus(400);
  }
  next();
}
