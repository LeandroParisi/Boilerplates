/* eslint-disable no-use-before-define */
import Joi = require('joi')
import { ProvideSingleton } from '../../../../../../Commons/Ioc'
import { Roles } from '../../../../../../Domain/Enums/Roles'
import { IValidator, SchemaValidation } from '../../../../../Shared/Abstractions/Validation/SchemaValidation'
import { ICreateUserPayload } from './ICreateFoodPayload'

export const userValidation = Joi.object<ICreateUserPayload>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string().valid(Roles.admin, Roles.user),
  dailyCaloriesThreshold: Joi.number().allow(null),
})

@ProvideSingleton(CreateUserValidation)
export class CreateUserValidation extends SchemaValidation {
  Schema: IValidator

  /**
   *
   */
  constructor() {
    super()
    this.Schema = {
      body: userValidation,
    }
  }
}
