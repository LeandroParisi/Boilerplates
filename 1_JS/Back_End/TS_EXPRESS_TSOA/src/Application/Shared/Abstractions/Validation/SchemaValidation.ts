/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request } from 'express'
import { decorate, injectable } from 'inversify'
import { Schema } from 'joi'
import IMiddleware from '../../Middlewares/Interfaces/IMiddleware'
import { ApiValidationError } from './ApiValidationError'

export interface IValidator {
  params?: Schema
  query?: Schema
  body?: Schema
}

export interface IValidationError {
  field: string
  error: string
}

export abstract class SchemaValidation implements IMiddleware {
  abstract Schema: IValidator

  public ExecuteAsync(req: Request) {
    const errors : Array<IValidationError> = []

    Object.keys(this.Schema).forEach((field : keyof IValidator) => {
      const { error } = this.Schema[field]!.validate(req[field])

      if (error) errors.push({ field, error: error.message })
    })

    if (errors.length !== 0) throw new ApiValidationError(errors)
  }
}

decorate(injectable(), SchemaValidation)
