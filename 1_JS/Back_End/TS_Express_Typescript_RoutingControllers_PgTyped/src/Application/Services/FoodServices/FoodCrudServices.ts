/* eslint-disable no-use-before-define */
import { inject, injectable } from 'inversify'
import { ProvideSingleton } from '../../../Commons/Ioc'
import { Food } from '../../../Domain/Entities/Food'
import { FoodRepository } from '../../../Infrastructure/DbConnections/PostgresTyped/Repositories/FoodRepository'
import { Food as DbModel } from '../../../Infrastructure/DbConnections/PostgresTyped/Schemas/__generated__'
import { CrudServices } from '../CrudServices'

@ProvideSingleton(FoodCrudServices)
export class FoodCrudServices extends CrudServices<Food, DbModel> {
  /**
   *
   */
  constructor(
    @inject(FoodRepository) repository : FoodRepository,
  ) {
    super(repository)
  }
}
