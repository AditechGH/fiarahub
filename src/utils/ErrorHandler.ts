import { Response, NextFunction } from "express";
import status from "http-status-codes";
import { HTTPClientError, HTTP404Error } from "../utils/httpErrors";
import logger from "../config/logger";

export const notFoundError = () => {
  throw new HTTP404Error("Method not found.");
};

export const clientError = (err: Error, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    logger.warn('clientError => ',err);
    res.status(err.statusCode).send(err.message);
  } else {
    next(err);
  }
};

export const serverError = (err: any, res: Response, next: NextFunction) => {
  logger.error('serverError => ',err);
  if(err.status) {
    res.status(err.status).send(err);
  } else if (process.env.NODE_ENV === "production") {
    res
    .status(status.INTERNAL_SERVER_ERROR)
    .send("Internal Server Error");
  } else {
    res
    .status(status.INTERNAL_SERVER_ERROR)
    .send(err.stack);
  }
};