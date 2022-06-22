import Joi = require('joi')
import { ProvideSingleton } from '../../Commons/Ioc'
import { IValidator, SchemaValidation } from '../Shared/Abstractions/Validation/SchemaValidation'

const idValidation = Joi.object({
  id: Joi.number().required(),
})

export const IdValidation : IValidator = {
  params: idValidation,
}

// eslint-disable-next-line no-use-before-define
@ProvideSingleton(IdQueryValidation)
export class IdQueryValidation extends SchemaValidation {
  Schema: IValidator

  /**
   *
   */
  constructor() {
    super()
    this.Schema = {
      ...IdValidation,
    }
  }
}
