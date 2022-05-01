import * as Sequelize from 'sequelize'
import { ProvideSingleton } from '../../../Commons/Ioc'
import { Logger } from '../../../Commons/Logger'
import constants from '../../../Configuration/constants'

import IDbConnection from '../Interfaces/IDbConnection'

// eslint-disable-next-line no-use-before-define
@ProvideSingleton(PgDbConnection)
export class PgDbConnection implements IDbConnection<Sequelize.Sequelize> {
  public db: Sequelize.Sequelize;

  constructor() {
    Logger.log(`connecting to ${constants.ENV} SQL`)
    const { SEQUELIZE } = constants
    this.db = new Sequelize.Sequelize(SEQUELIZE.CONNECTION_STRING, {
      ...SEQUELIZE.options,
      logging: (l) => Logger.verbose(l),
    })
  }
}
