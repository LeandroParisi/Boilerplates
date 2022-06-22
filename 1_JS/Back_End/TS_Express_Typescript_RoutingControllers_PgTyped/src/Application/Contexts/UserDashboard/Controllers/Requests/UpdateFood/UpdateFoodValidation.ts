/* eslint-disable no-use-before-define */
import { ProvideSingleton } from '../../../../../../Commons/Ioc'
import { IdValidation } from '../../../../../DefaultValidations/IdValidation'
import { IValidator, SchemaValidation } from '../../../../../Shared/Abstractions/Validation/SchemaValidation'
import { foodValidation } from '../CreateFood/CreateFoodValidation'

@ProvideSingleton(UpdateFoodValidation)
export class UpdateFoodValidation extends SchemaValidation {
  Schema: IValidator

  /**
   *
   */
  constructor() {
    super()
    this.Schema = {
      ...IdValidation,
      body: foodValidation,
    }
  }
}
