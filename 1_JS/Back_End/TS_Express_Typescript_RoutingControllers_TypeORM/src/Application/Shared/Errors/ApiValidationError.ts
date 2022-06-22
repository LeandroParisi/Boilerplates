import { ErrorMessages } from '../APIs/Enums/Messages'
import { StatusCode } from '../APIs/Enums/Status'
import ApiError from '../ApiError'
import { IValidationError } from './SchemaValidation'

export class ApiValidationError extends ApiError {
  validationErrors : Array<IValidationError>

  constructor(validationErrors : Array<IValidationError>, innerError? : Error) {
    super(StatusCode.BAD_REQUEST, ErrorMessages.ValidationErrors, innerError)
    this.validationErrors = validationErrors
  }
}
