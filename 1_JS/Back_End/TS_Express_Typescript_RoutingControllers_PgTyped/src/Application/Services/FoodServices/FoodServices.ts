/* eslint-disable no-use-before-define */
import { and, greaterThan, lessThan } from '@databases/pg-typed'
import { inject, injectable } from 'inversify'
import { ProvideSingleton } from '../../../Commons/Ioc'
import { Food } from '../../../Domain/Entities/Food'
import { FoodRepository } from '../../../Infrastructure/DbConnections/PostgresTyped/Repositories/FoodRepository'
import { Food as dbFood } from '../../../Infrastructure/DbConnections/PostgresTyped/Schemas/__generated__'
import { IGetFoodPayload } from '../../Contexts/UserDashboard/Controllers/Requests/GetFood/IGetFoodPayload'
import ApiError from '../../Shared/Abstractions/ApiError'
import { ErrorMessages, ResponseMessages } from '../../Shared/APIs/Enums/Messages'
import { StatusCode } from '../../Shared/APIs/Enums/Status'
import { Serializers } from '../Helpers/Serializers'

@ProvideSingleton(FoodServices)
export class FoodServices {
  /**
   *
   */
  constructor(
    @inject(FoodRepository) private Repository : FoodRepository,
  ) {
  }

  async FindAllByDate(query: IGetFoodPayload) : Promise<Food[]> {
    const { from, to, userId } = query

    const whereQuery : any[] = []

    if (userId) {
      whereQuery.push({ user_id: userId })
    }

    if (from) {
      whereQuery.push({ taken_at: greaterThan(from) })
    }
    if (to) {
      whereQuery.push({ taken_at: lessThan(to) })
    }

    try {
      const dbQuery = and<dbFood>(
        ...whereQuery,
      )

      const foods = await this.Repository.FindAll(dbQuery)

      console.log({ foods })

      return Serializers.CastToCamel(foods) as Food[]
    } catch (error) {
      throw new ApiError(StatusCode.INTERNAL_SERVER_ERROR, ErrorMessages.InternalError)
    }
  }
}
