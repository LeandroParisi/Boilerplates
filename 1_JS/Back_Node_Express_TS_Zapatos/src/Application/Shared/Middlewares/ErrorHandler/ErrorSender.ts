/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Response } from 'express'
import { Service } from 'typedi'
import FireError from '../../Abstractions/FireError'
import BaseErrorResponse from '../../APIs/Base/BaseErrorResponse'
import { ErrorMessages, ErrorTypes } from '../../APIs/Enums/Messages'
import { StatusCode } from '../../APIs/Enums/Status'

@Service()
export default class ErrorSender {
  static SendCustomError(error : FireError, res : Response) : Response {
    const { statusCode, message } = error

    if (!statusCode) {
      return res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json(new BaseErrorResponse(ErrorTypes.CustomError, ErrorMessages.InternalError))
    }

    return res
      .status(statusCode)
      .json(new BaseErrorResponse(ErrorTypes.CustomError, message))
  }
}
