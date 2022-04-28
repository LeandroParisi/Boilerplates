import { Router } from 'express'
import RoutesPath from '../Enums/Routes'
import IRouter from './CRUD/Interfaces/IRouter'

export default abstract class BaseRouter implements IRouter {
  BasePath: RoutesPath;

  Router: Router;

  /**
   *
   */
  constructor(basePath : RoutesPath) {
    this.BasePath = basePath
    this.Router = Router()
  }

  abstract SetRouter() : Router
}
