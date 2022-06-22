/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import { TableHelper } from '@databases/pg-typed'
import { ProvideSingleton } from '../../../../Commons/Ioc'
import { PgTypedDbConnection } from '../PostgresTypedDbConnection'
import { Food as FoodDbModel, Food_InsertParameters } from '../Schemas/__generated__'
import { BaseRepository } from './BaseRepository'

@ProvideSingleton(FoodRepository)
export class FoodRepository extends BaseRepository<FoodDbModel, Food_InsertParameters> {
  table: TableHelper<FoodDbModel, Food_InsertParameters, 'defaultConnection'>

  /**
   *
   */
  constructor() {
    super()
    this.table = PgTypedDbConnection.tables.food
  }
}
