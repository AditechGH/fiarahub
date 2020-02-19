import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    handlePassport,
    handleHelmet,
    handleMorgan
  } from "./common";
import { handleAPIDocs } from "./apiDocs";

const middleWares = [
  handleCors,
  handleBodyRequestParsing,
  handleAPIDocs,
  handlePassport,
  handleMorgan
]

if (process.env.NODE_ENV === "production") {
  middleWares.push(handleCompression);
  middleWares.push(handleHelmet);
}

export default middleWares;
