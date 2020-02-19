import status from "http-status-codes";

export abstract class HTTPClientError extends Error {
    readonly statusCode!: number;
    readonly name!: string;
  
    constructor(message: object | string) {
      if (message instanceof Object) {
        super(JSON.stringify(message));
      } else {
        super(message);
      }
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }

export class HTTP400Error extends HTTPClientError {
    readonly statusCode = status.BAD_REQUEST;

    constructor(message: string | object = "Bad Request") {
        super(message);
    }
}

export class HTTP404Error extends HTTPClientError {
    readonly statusCode = status.NOT_FOUND;

    constructor(message: string | object = "Not found") {
        super(message);
    }
}