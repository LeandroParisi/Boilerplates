/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-use-before-define */
import { and, greaterThan, lessThan } from '@databases/pg-typed'
import { inject, injectable } from 'inversify'
import { ProvideSingleton } from '../../../Commons/Ioc'
import { Food } from '../../../Domain/Entities/Food'
import { PgTypedDbConnection } from '../../../Infrastructure/DbConnections/PostgresTyped/PostgresTypedDbConnection'
import { FoodRepository } from '../../../Infrastructure/DbConnections/PostgresTyped/Repositories/FoodRepository'
import { UserRepository } from '../../../Infrastructure/DbConnections/PostgresTyped/Repositories/UserRepository'
import { Food as dbFood } from '../../../Infrastructure/DbConnections/PostgresTyped/Schemas/__generated__'
import { CaloriesPerUser, IStatisticsReponse } from '../../Contexts/AdminDashboard/Controllers/Requests/GetStatistics/IStatisticsResponse'
import { IGetFoodPayload } from '../../Contexts/UserDashboard/Controllers/Requests/GetFood/IGetFoodPayload'
import ApiError from '../../Shared/Abstractions/ApiError'
import { ErrorMessages, ResponseMessages } from '../../Shared/APIs/Enums/Messages'
import { StatusCode } from '../../Shared/APIs/Enums/Status'
import { Serializers } from '../Helpers/Serializers'

@ProvideSingleton(AdminServices)
export class AdminServices {
  /**
   *
   */
  constructor(
    @inject(FoodRepository) private FoodRepo : FoodRepository,
    @inject(UserRepository) private UserRepo : UserRepository,

  ) {
  }

  async GetStatistics() : Promise<IStatisticsReponse> {
    const [{ count: entriesThisWeek }] = await PgTypedDbConnection.db.query(PgTypedDbConnection.sql`
      SELECT count(id)::NUMERIC AS count FROM public.food f 
      WHERE taken_at BETWEEN NOW()::DATE - 7  AND NOW()
    `) as Array<{count : number}>

    const caloriesPerUserThisWeek = await PgTypedDbConnection.db.query(PgTypedDbConnection.sql`
      SELECT user_id, u."name" as name, avg(calories)::NUMERIC as calories_in_average 
        FROM public.food f 
        inner join PUBLIC."user" u on u.id = f.user_id 
        WHERE taken_at BETWEEN NOW()::DATE - 7  AND NOW()
        group by u.name, user_id
    `)

    const [{ count: entriesLastWeek }] = await PgTypedDbConnection.db.query(PgTypedDbConnection.sql`
      SELECT count(id)::NUMERIC AS count FROM public.food f 
      WHERE taken_at BETWEEN NOW()::DATE - 14 AND NOW()::DATE - 7 + TIME '23:59:59'
    `) as Array<{count : number}>

    return {
      entriesThisWeek,
      caloriesPerUserThisWeek: Serializers.CastToCamel<any, CaloriesPerUser>(caloriesPerUserThisWeek),
      // caloriesPerUserThisWeek,
      entriesLastWeek,
    }
  }
}
