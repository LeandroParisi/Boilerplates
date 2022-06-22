import { IValidationError } from './Validation/SchemaValidation'

export default class BaseErrorResponse {
  errorMessage : string

  validationErrors? : Array<IValidationError>

  /**
   *
   */
  constructor(errorMessage : string, validationErrors? : Array<IValidationError>) {
    this.errorMessage = errorMessage
    this.validationErrors = validationErrors
  }
}
