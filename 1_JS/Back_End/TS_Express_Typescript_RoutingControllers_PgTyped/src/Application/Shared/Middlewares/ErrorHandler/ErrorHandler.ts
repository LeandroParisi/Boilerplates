/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { Logger } from '../../../../Commons/Logger'
import ApiError from '../../Abstractions/ApiError'
import BaseErrorResponse from '../../Abstractions/BaseErrorResponse'
import { ApiValidationError } from '../../Abstractions/Validation/ApiValidationError'
import { ErrorMessages } from '../../APIs/Enums/Messages'
import { StatusCode } from '../../APIs/Enums/Status'

export default class ErrorHandler {
  static HandleError(
    error : ApiError,
    _req : Request,
    res : Response,
    _next : NextFunction,
  ) {
    Logger.error(
      `Error: ${error.statusCode || StatusCode.INTERNAL_SERVER_ERROR}`,
      `Error Type: ${error.constructor.name}`,
      `Error Message: ${error.message}`,
      'Original Error: ', error,
      'Stack Trace: ', error.innerError || '',
    )
    return ErrorHandler.SendError(error, res)
  }

  static SendError(error : ApiError, res : Response) : Response {
    const { statusCode, message } = error

    if (error instanceof ApiValidationError) {
      return res
        .status(StatusCode.BAD_REQUEST)
        .json(new BaseErrorResponse(message, error.validationErrors))
    }

    if (!statusCode) {
      return res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json(new BaseErrorResponse(ErrorMessages.InternalError))
    }

    return res
      .status(statusCode)
      .json(new BaseErrorResponse(message))
  }
}
