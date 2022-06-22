/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import {
  Controller, Get, Query, Route, Tags, Request, Post, Body, Put, Path, Delete,
} from 'tsoa'
import { inject, ProvideSingleton } from '../../../../Commons/Ioc'
import { Food } from '../../../../Domain/Entities/Food'
import { FoodCrudServices } from '../../../Services/FoodServices/FoodCrudServices'
import { FoodServices } from '../../../Services/FoodServices/FoodServices'
import { StatusCode } from '../../../Shared/APIs/Enums/Status'
import IAuthenticatedRequest from '../../../Shared/APIs/Interfaces/ExpressInterfaces/CustomRequests/IAuthenticatedReques'
import { CreateFoodValidation } from '../../UserDashboard/Controllers/Requests/CreateFood/CreateFoodValidation'
import { ICreateFoodPayload } from '../../UserDashboard/Controllers/Requests/CreateFood/ICreateFoodPayload'
import { GetFoodsValidation } from '../../UserDashboard/Controllers/Requests/GetFood/GetFoodsValidation'
import { IdQueryValidation } from '../../../DefaultValidations/IdValidation'
import { AdminServices } from '../../../Services/AdminServices/AdminServices'
import { IStatisticsReponse } from './Requests/GetStatistics/IStatisticsResponse'

@Tags('AdminDashboard')
@Route('admin-dashboard')
@ProvideSingleton(AdminDashboardController)
export class AdminDashboardController extends Controller {
  /**
   *
   */
  constructor(
    @inject(FoodCrudServices) private FoodCrud : FoodCrudServices,
    @inject(GetFoodsValidation) private GetAllValidation : GetFoodsValidation,
    @inject(FoodServices) private FoodServices : FoodServices,
    @inject(CreateFoodValidation) private CreateFoodValidation : CreateFoodValidation,
    @inject(IdQueryValidation) private IdQueryValidation : IdQueryValidation,
    @inject(AdminServices) private AdminServices : AdminServices,
  ) {
    super()
  }

  @Get('food')
  public async GetAllFoods(
    @Request() req : IAuthenticatedRequest, @Query() from? : Date, @Query() to? : Date,
  ) : Promise<Food[]> {
    this.GetAllValidation.ExecuteAsync(req)

    const foods = await this.FoodServices.FindAllByDate({ from, to })

    this.setStatus(StatusCode.OK)

    return foods
  }

  @Post('/food')
  public async CreateFood(
    @Body() body : ICreateFoodPayload,
    @Request() request : IAuthenticatedRequest,
  ) : Promise<Food> {
    this.CreateFoodValidation.ExecuteAsync(request)

    const createdFood = await this.FoodCrud.Create(body)

    this.setStatus(StatusCode.CREATED)

    return createdFood
  }

  @Put('/food/{id}')
  public async UpdateFood(
    @Body() body : ICreateFoodPayload,
    @Path('id') id : number,
    @Request() request : IAuthenticatedRequest,
  ): Promise<boolean> {
    this.CreateFoodValidation.ExecuteAsync(request)

    const created = await this.FoodCrud.Update({ id }, body)

    this.setStatus(StatusCode.OK)

    return created
  }

  @Delete('/food/{id}')
  public async DeleteFood(
    @Path('id') id : number,
    @Request() request : IAuthenticatedRequest,
  ): Promise<void> {
    this.IdQueryValidation.ExecuteAsync(request)

    await this.FoodCrud.Delete({ id })

    this.setStatus(StatusCode.NO_CONTENT)
  }

  @Get('statistics')
  public async GetStatistics() : Promise<IStatisticsReponse> {
    const statistics = await this.AdminServices.GetStatistics()

    return statistics
  }
}
