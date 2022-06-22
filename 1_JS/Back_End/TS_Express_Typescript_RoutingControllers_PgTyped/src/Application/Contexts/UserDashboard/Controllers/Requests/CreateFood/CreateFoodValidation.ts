/* eslint-disable no-use-before-define */
import Joi = require('joi')
import { ProvideSingleton } from '../../../../../../Commons/Ioc'
import { IValidator, SchemaValidation } from '../../../../../Shared/Abstractions/Validation/SchemaValidation'
import { ICreateFoodPayload } from './ICreateFoodPayload'

export const foodValidation = Joi.object<ICreateFoodPayload>({
  name: Joi.string().required(),
  userId: Joi.number().required(),
  calories: Joi.number().required(),
  price: Joi.number(),
})

@ProvideSingleton(CreateFoodValidation)
export class CreateFoodValidation extends SchemaValidation {
  Schema: IValidator

  /**
   *
   */
  constructor() {
    super()
    this.Schema = {
      body: foodValidation,
    }
  }
}
