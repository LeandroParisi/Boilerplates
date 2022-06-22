/* eslint-disable no-use-before-define */
import { inject, ProvideSingleton } from '../../../Commons/Ioc'
import { User } from '../../../Domain/Entities/User'
import { UserRepository } from '../../../Infrastructure/DbConnections/PostgresTyped/Repositories/UserRepository'
import { User as DbModel } from '../../../Infrastructure/DbConnections/PostgresTyped/Schemas/__generated__'
import { CrudServices } from '../CrudServices'

@ProvideSingleton(UserCrudServices)
export class UserCrudServices extends CrudServices<User, DbModel> {
  /**
   *
   */
  constructor(
    @inject(UserRepository) repository : UserRepository,
  ) {
    super(repository)
  }
}
