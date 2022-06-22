import { ConnectionPool } from '@databases/pg'
import { TableHelper, WhereCondition } from '@databases/pg-typed'
import { injectable } from 'inversify'
import { IBaseRepository } from '../../../../Domain/Interfaces/IRepository'
import { PgTypedDbConnection } from '../PostgresTypedDbConnection'

@injectable()
export abstract class BaseRepository<
  DbEntity,
  DbInsertableEntity
  > implements IBaseRepository<DbEntity> {
  abstract table : TableHelper<DbEntity, DbInsertableEntity, 'defaultConnection'>

  async Create(model: DbInsertableEntity, connection?: ConnectionPool): Promise<DbEntity> {
    const dbConnection = connection || PgTypedDbConnection.db
    const [inserted] = await this.table(dbConnection).insert(model)
    return inserted
  }

  async UpdateOne(
    query: WhereCondition<DbEntity>, model: Partial<DbEntity>, connection?: ConnectionPool,
  ): Promise<boolean> {
    const dbConnection = connection || PgTypedDbConnection.db

    const [updatedEntities] = await this.table(dbConnection).update(
      query,
      model,
    )

    return !!updatedEntities
  }

  async Delete(query: WhereCondition<DbEntity>, connection?: ConnectionPool): Promise<void> {
    const dbConnection = connection || PgTypedDbConnection.db

    const del = await this.table(dbConnection).delete(query)

    console.log({ del })
  }

  async FindAll(query: WhereCondition<DbEntity>, connection?: ConnectionPool): Promise<DbEntity[]> {
    const dbConnection = connection || PgTypedDbConnection.db

    const entities = await this.table(dbConnection).find(query).all()

    return entities
  }

  async FindOne(query: WhereCondition<DbEntity>, connection?: ConnectionPool): Promise<DbEntity> {
    const dbConnection = connection || PgTypedDbConnection.db

    const entity = await this.table(dbConnection).findOne(query)

    return entity
  }
}
