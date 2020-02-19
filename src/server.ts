
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./modules";
import constants from "./config/constants";
import Db from "./config/database";
import Cache from "./config/cache";
import logger from "./config/logger";

new Db();
new Cache();

process.on("uncaughtException", e => {
    logger.error(`uncaughtException => `, e); 
    process.exit(1);
});

process.on("unhandledRejection", (e) => {
    logger.error(`unhandledRejection => `, e); 
    process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);


const server = http.createServer(router);

server.listen(constants.PORT, () =>
  logger.info(`Server running on port: ${constants.PORT} - Running on ${process.env.NODE_ENV}`)
);