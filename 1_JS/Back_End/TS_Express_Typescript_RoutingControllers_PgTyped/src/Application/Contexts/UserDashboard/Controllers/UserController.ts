/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import {
  Route,
  Controller,
  Body,
  Tags,
  Request,
  Post,
  Query,
  Get,
} from 'tsoa'
import * as Express from 'express'
import { inject, ProvideSingleton } from '../../../../Commons/Ioc'
import { StatusCode } from '../../../Shared/APIs/Enums/Status'
import { IdQueryValidation } from '../../../DefaultValidations/IdValidation'
import { UserCrudServices } from '../../../Services/UserServices/UserCrudServices'
import { CreateUserValidation } from './Requests/CreateUser/CreateUserValidation'
import { ICreateUserPayload } from './Requests/CreateUser/ICreateFoodPayload'
import { User } from '../../../../Domain/Entities/User'
import { UserServices } from '../../../Services/UserServices/UserServices'
import IAuthenticatedRequest from '../../../Shared/APIs/Interfaces/ExpressInterfaces/CustomRequests/IAuthenticatedReques'

@Tags('UserDashboard')
@Route('user-dashboard/user')
@ProvideSingleton(UserController)
export class UserController extends Controller {
  /**
   *
   */
  constructor(
    @inject(UserServices) private Services : UserServices,
    @inject(CreateUserValidation) private CreateValidation : CreateUserValidation,
    @inject(UserCrudServices) private CrudServices : UserCrudServices,
  ) {
    super()
  }

  @Post()
  public async CreateUser(
    @Body() body : ICreateUserPayload,
    @Request() request : IAuthenticatedRequest,
  ) : Promise<User> {
    this.CreateValidation.ExecuteAsync(request)

    const createdUser = await this.CrudServices.Create(body)

    this.setStatus(StatusCode.CREATED)

    return createdUser
  }

  @Get('statistics')
  public async GetUserStatistics(
    @Request() request : IAuthenticatedRequest,
  ) : Promise<any> {
    const statistics = await this.Services.GetStatistics(request.user.id)

    return statistics
  }
}
