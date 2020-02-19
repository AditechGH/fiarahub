import { Router } from "express";
import cors from "cors";
import parser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import passport from "passport";
import { stream } from "../config/logger";

export const handleHelmet = (router: Router) =>
  router.use(helmet())

export const handleMorgan = (router: Router) =>
  router.use(morgan("combined", { stream: stream }))  

export const handlePassport = (router: Router) =>
  router.use(passport.initialize())   

export const handleCompression = (router: Router) => 
  router.use(compression())

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));  

export const handleBodyRequestParsing = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};  