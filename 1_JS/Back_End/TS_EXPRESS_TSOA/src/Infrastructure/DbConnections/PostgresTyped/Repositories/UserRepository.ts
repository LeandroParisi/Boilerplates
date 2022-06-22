/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import { TableHelper } from '@databases/pg-typed'
import { ProvideSingleton } from '../../../../Commons/Ioc'
import { PgTypedDbConnection } from '../PostgresTypedDbConnection'
import { User as UserDbModel, User_InsertParameters } from '../Schemas/__generated__'
import { BaseRepository } from './BaseRepository'

@ProvideSingleton(UserRepository)
export class UserRepository extends BaseRepository<UserDbModel, User_InsertParameters> {
  table: TableHelper<UserDbModel, User_InsertParameters, 'defaultConnection'>

  /**
   *
   */
  constructor() {
    super()
    this.table = PgTypedDbConnection.tables.user
  }
}
