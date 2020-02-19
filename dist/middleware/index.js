"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const apiDocs_1 = require("./apiDocs");
const middleWares = [
    common_1.handleCors,
    common_1.handleBodyRequestParsing,
    apiDocs_1.handleAPIDocs,
    common_1.handlePassport,
    common_1.handleMorgan
];
if (process.env.NODE_ENV === "production") {
    middleWares.push(common_1.handleCompression);
    middleWares.push(common_1.handleHelmet);
}
exports.default = middleWares;
//# sourceMappingURL=index.js.map