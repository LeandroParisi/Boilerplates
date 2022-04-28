/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Response } from 'express'
import { Service } from 'typedi'
import Sequelize from 'sequelize'
import FireError from '../../Abstractions/FireError'
import { ErrorMessages, ErrorTypes } from '../../APIs/Enums/Messages'
import { IIndexable } from '../../../../Commons/Interfaces/SystemInterfaces/IIndexable'
import { StatusCode } from '../../APIs/Enums/Status'
import DefaultErrorMessage from '../../Abstractions/DefaultErrorMessage'

@Service()
export default class ErrorSender {
  static SendCustomError(error : FireError, res : Response) : Response {
    const { statusCode, message } = error

    if (!statusCode) {
      return res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json(new DefaultErrorMessage(ErrorTypes.CustomError, ErrorMessages.InternalError))
    }

    return res
      .status(statusCode)
      .json(new DefaultErrorMessage(ErrorTypes.CustomError, message))
  }
}
