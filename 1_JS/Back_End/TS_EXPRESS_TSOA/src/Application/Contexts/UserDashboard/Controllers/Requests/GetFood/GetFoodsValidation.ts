/* eslint-disable no-use-before-define */
import Joi = require('joi')
import { ProvideSingleton } from '../../../../../../Commons/Ioc'
import { IValidator, SchemaValidation } from '../../../../../Shared/Abstractions/Validation/SchemaValidation'
import { IGetFoodPayload } from './IGetFoodPayload'

const foodsValidation = Joi.object<IGetFoodPayload>({
  from: Joi.date(),
  to: Joi.date(),
})

@ProvideSingleton(GetFoodsValidation)
export class GetFoodsValidation extends SchemaValidation {
  Schema: IValidator

  /**
   *
   */
  constructor() {
    super()
    this.Schema = {
      query: foodsValidation,
    }
  }
}
