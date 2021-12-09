import { ErrorResponseFilter } from "../utils/error-response.filter";
import { Request, Response, NextFunction } from "express";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const appErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorFilter = new ErrorResponseFilter(res);
  return errorFilter.response(err);
};
