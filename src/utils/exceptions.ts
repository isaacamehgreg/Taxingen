import httpStatus from "http-status";

export enum CustomErrMsg {
  BAD_REQUEST = "Bad request",
  NOT_FOUND = "Resource not found",
  FORBIDDEN = "Access is forbidden",
  VALIDATION_ERROR = "Validation error",
  NOT_AUTHORIZED = "You are not authorized to perform this operation",
  SERVER_ERROR = "Oops! Something went wrong",
  UNPROCESSABLE_ENTITY = "Yo! Your request is nice but can't be processed at the moment",
  CONFLICT = "Matching record exist ",
}

interface ErrorResponse {
  status: string;
  message: string;
  data: any;
}
export class BaseHttpException extends Error {
  public readonly status: number;
  public readonly response: ErrorResponse;
  constructor(
    httpCode: number,
    description: string,
    error?: { [key: string]: string } | string | any
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.status = httpCode;
    this.response = {
      status: "error",
      message: description,
      data: error,
    };

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundException extends BaseHttpException {
  constructor(description: string = CustomErrMsg.NOT_FOUND, error?: any) {
    super(httpStatus.NOT_FOUND, description, error);
  }
}

export class BadRequestException extends BaseHttpException {
  constructor(description: string = CustomErrMsg.BAD_REQUEST, error?: any) {
    super(httpStatus.BAD_REQUEST, description, error);
  }
}

export class ForbiddenException extends BaseHttpException {
  constructor(description: string = CustomErrMsg.FORBIDDEN, error?: any) {
    super(httpStatus.FORBIDDEN, description, error);
  }
}

export class InternalServerException extends BaseHttpException {
  constructor(description: string = CustomErrMsg.SERVER_ERROR, error?: any) {
    super(httpStatus.INTERNAL_SERVER_ERROR, description, error);
  }
}

export class UnprocessableEntityException extends BaseHttpException {
  constructor(
    description: string = CustomErrMsg.UNPROCESSABLE_ENTITY,
    error?: any
  ) {
    super(httpStatus.UNPROCESSABLE_ENTITY, description, error);
  }
}

export class ConflictException extends BaseHttpException {
  constructor(description: string = CustomErrMsg.CONFLICT, error?: any) {
    super(httpStatus.CONFLICT, description, error);
  }
}

export class ValidationException extends BaseHttpException {
  constructor(description: string = CustomErrMsg.VALIDATION_ERROR, error?: any) {
    super(httpStatus.BAD_REQUEST, description, error);
  }
}


export const forbiddenError = (description?: string | any) => new ForbiddenException(description);
export const internalError = (description?: string) => new InternalServerException(description);
export const validationError = (description?: string) => new ValidationException(description);
export const badError = (description?: string) => new BadRequestException(description);
