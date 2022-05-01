import * as Sequelize from 'sequelize'

import { inject, ProvideSingleton } from '../../../Commons/Ioc'
import { Logger } from '../../../Commons/Logger'
import { PgDbConnection } from './PgDbConnection'

// eslint-disable-next-line no-use-before-define
@ProvideSingleton(PgSetupHelper)
export class PgSetupHelper {
  constructor(
    @inject(PgDbConnection) private sqlDbConnection: PgDbConnection,
    // @inject(entities.UserEntity) private entity1: entities.UserEntity, // tslint:disable-line
  ) { }

  public async Sync(options?: Sequelize.SyncOptions): Promise<void> {
    await this.sqlDbConnection.db.authenticate()
    Logger.log(
      `synchronizing: tables${options ? ` with options: ${JSON.stringify(options)}` : ''}`,
    )
    await this.sqlDbConnection.db.sync(options)
  }
}
