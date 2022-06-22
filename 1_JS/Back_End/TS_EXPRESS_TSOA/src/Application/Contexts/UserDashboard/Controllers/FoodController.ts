/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import {
  Route,
  Controller,
  Body,
  Tags,
  Request,
  Get,
  Query,
  Post,
  Put,
  Path,
  Delete,
} from 'tsoa'
import * as Express from 'express'
import { inject, ProvideSingleton } from '../../../../Commons/Ioc'
import { GetFoodsValidation } from './Requests/GetFood/GetFoodsValidation'
import { Food } from '../../../../Domain/Entities/Food'
import { FoodServices } from '../../../Services/FoodServices/FoodServices'
import { FoodCrudServices } from '../../../Services/FoodServices/FoodCrudServices'
import { CreateFoodValidation } from './Requests/CreateFood/CreateFoodValidation'
import { ICreateFoodPayload } from './Requests/CreateFood/ICreateFoodPayload'
import { StatusCode } from '../../../Shared/APIs/Enums/Status'
import { IdQueryValidation } from '../../../DefaultValidations/IdValidation'
import IAuthenticatedRequest from '../../../Shared/APIs/Interfaces/ExpressInterfaces/CustomRequests/IAuthenticatedReques'

@Tags('UserDashboard')
@Route('user-dashboard/food')
@ProvideSingleton(FoodController)
export class FoodController extends Controller {
  /**
   *
   */
  constructor(
    @inject(FoodServices) private Services : FoodServices,
    @inject(GetFoodsValidation) private GetAllValidation : GetFoodsValidation,
    @inject(CreateFoodValidation) private CreateFoodValidation : CreateFoodValidation,
    @inject(FoodCrudServices) private CrudServices : FoodCrudServices,
    @inject(IdQueryValidation) private IdQueryValidation : IdQueryValidation,
  ) {
    super()
  }

  @Get()
  public async GetAllFoods(
    @Request() request : IAuthenticatedRequest, @Query() from? : Date, @Query() to? : Date,
  ) : Promise<Food[]> {
    this.GetAllValidation.ExecuteAsync(request)

    const foods = await this.Services.FindAllByDate({ from, to, userId: request.user.id })

    this.setStatus(StatusCode.OK)

    return foods
  }

  @Post()
  public async CreateFood(
    @Body() body : ICreateFoodPayload,
    @Request() request : IAuthenticatedRequest,
  ) : Promise<Food> {
    this.CreateFoodValidation.ExecuteAsync(request)

    const createdFood = await this.CrudServices.Create({ ...body, userId: request.user.id })

    this.setStatus(StatusCode.CREATED)

    return createdFood
  }

  @Put('{id}')
  public async UpdateFood(
    @Body() body : ICreateFoodPayload,
    @Path('id') id : number,
    @Request() request : IAuthenticatedRequest,
  ): Promise<boolean> {
    this.CreateFoodValidation.ExecuteAsync(request)

    const created = await this.CrudServices.Update({ id, userId: request.user.id }, body)

    this.setStatus(StatusCode.OK)

    return created
  }

  @Delete('{id}')
  public async DeleteFood(
    @Path('id') id : number,
    @Request() request : IAuthenticatedRequest,
  ): Promise<void> {
    this.IdQueryValidation.ExecuteAsync(request)

    await this.CrudServices.Delete({ id, userId: request.user.id })

    this.setStatus(StatusCode.NO_CONTENT)
  }
}
