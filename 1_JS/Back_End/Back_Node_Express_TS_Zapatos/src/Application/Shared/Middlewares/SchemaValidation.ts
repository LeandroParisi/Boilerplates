import { Request, Response, NextFunction } from 'express'
import { Schema } from 'joi'
import { ErrorTypes } from '../APIs/Enums/Messages'
import { StatusCode } from '../APIs/Enums/Status'
import IMiddleware from './Interfaces/IMiddleware'

export interface IValidator {
  params?: Schema
  query?: Schema
  body?: Schema
}

export interface IValidationError {
  field: string
  error: string
}

abstract class SchemaValidation implements IMiddleware {
  abstract Schema: IValidator

  public ExecuteAsync(req: Request, res: Response, next: NextFunction) {
    const errors : Array<IValidationError> = []

    Object.keys(this.Schema).forEach((field : keyof IValidator) => {
      const { error } = this.Schema[field]!.validate(req[field])

      if (error) errors.push({ field, error: error.message })
    })

    if (errors.length === 0) {
      return next()
    }

    return res
      .status(StatusCode.BAD_REQUEST)
      .json({ type: ErrorTypes.ValidationError, error: errors })
  }
}

export default SchemaValidation
