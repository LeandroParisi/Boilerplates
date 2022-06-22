/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-use-before-define */
import { inject } from 'inversify'
import { ProvideSingleton } from '../../../Commons/Ioc'
import { PgTypedDbConnection } from '../../../Infrastructure/DbConnections/PostgresTyped/PostgresTypedDbConnection'
import { UserRepository } from '../../../Infrastructure/DbConnections/PostgresTyped/Repositories/UserRepository'
import { Food as dbFood } from '../../../Infrastructure/DbConnections/PostgresTyped/Schemas/__generated__'
import { CaloriesByDay, ExpensesByMonth, IUserStatistics } from '../../Contexts/UserDashboard/Controllers/Requests/UserStatistics/IUserStatistics'
import ApiError from '../../Shared/Abstractions/ApiError'
import { ErrorMessages } from '../../Shared/APIs/Enums/Messages'
import { StatusCode } from '../../Shared/APIs/Enums/Status'
import { Serializers } from '../Helpers/Serializers'
import { UserCrudServices } from './UserCrudServices'

@ProvideSingleton(UserServices)
export class UserServices {
  /**
   *
   */
  constructor(
    @inject(UserRepository) private Repository : UserRepository,
    @inject(UserCrudServices) private CrudServices : UserCrudServices,
  ) {
  }

  async GetStatistics(id : number) : Promise<IUserStatistics> {
    try {
      const user = await this.CrudServices.FindOne({ id })
      const { dailyCaloriesThreshold, monthlyExpensesThreshold } = user

      const expensesByMonth = await PgTypedDbConnection.db.query(PgTypedDbConnection.sql`
        SELECT 
          extract(year from taken_at)::text as year, TRIM(TO_CHAR(taken_at, 'month')) as month, 
          CAST(sum(price) AS NUMERIC) as total_spent,
          CASE 
            WHEN CAST(sum(price) AS NUMERIC) >= ${monthlyExpensesThreshold} then true
            WHEN CAST(sum(price) AS NUMERIC) < ${monthlyExpensesThreshold} then false
          END as is_over_threshold
        FROM public.food f
        GROUP BY year, month
        ORDER BY year asc, EXTRACT(MONTH FROM TO_DATE(TRIM(TO_CHAR(taken_at, 'month')), 'Month')) asc, totalSpent DESC
      `) as unknown as ExpensesByMonth[]

      const caloriesByDay = await PgTypedDbConnection.db.query(PgTypedDbConnection.sql`
        SELECT 
          extract(year from taken_at)::text as year,
          TRIM(TO_CHAR(taken_at, 'month')) as month, 
          extract(day from taken_at)::integer as day, 
          CAST(sum(calories) AS NUMERIC) as calories,
          CASE 
            WHEN CAST(sum(calories) AS NUMERIC) >= ${dailyCaloriesThreshold} then true
            WHEN CAST(sum(calories) AS NUMERIC) < ${dailyCaloriesThreshold} then false
          END as is_over_threshold
        FROM public.food f
        GROUP BY year, month, day
        ORDER BY 
          year ASC, 
          EXTRACT(MONTH FROM TO_DATE(TRIM(TO_CHAR(taken_at, 'month')), 'Month'))  asc,
          day asc,
          calories DESC
      `) as unknown as CaloriesByDay[]

      return {
        expensesByMonth: Serializers.CastToCamel<any, ExpensesByMonth>(expensesByMonth),
        caloriesByDay: Serializers.CastToCamel<any, CaloriesByDay>(caloriesByDay),
      }
    } catch (error) {
      throw new ApiError(StatusCode.INTERNAL_SERVER_ERROR, ErrorMessages.InternalError)
    }
  }
}
