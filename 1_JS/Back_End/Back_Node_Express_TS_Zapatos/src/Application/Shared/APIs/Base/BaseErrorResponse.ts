import { ErrorTypes } from "../Enums/Messages"

export default class BaseErrorResponse {
  type : ErrorTypes
  errorMessage : string

  /**
   *
   */
  constructor(type : ErrorTypes, errorMessage : string) {
    this.type = type
    this.errorMessage = errorMessage
  }
}