/* eslint-disable no-use-before-define */
import Joi = require('joi')
import { ProvideSingleton } from '../../../../../../Commons/Ioc'
import { IValidator, SchemaValidation } from '../../../../../Shared/Abstractions/Validation/SchemaValidation'
import { ILoginPayload } from './ILoginPayload'

const loginValidation = Joi.object<ILoginPayload>({
  email: Joi.string().email().required(),
})

@ProvideSingleton(LoginValidation)
export class LoginValidation extends SchemaValidation {
  Schema: IValidator

  /**
   *
   */
  constructor() {
    super()
    this.Schema = {
      body: loginValidation,
    }
  }
}
