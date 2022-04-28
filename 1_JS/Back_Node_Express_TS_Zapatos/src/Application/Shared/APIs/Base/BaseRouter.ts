import { Router } from 'express'
import Routes from '../Enums/Routes'
import IRouter from './Interfaces/IRouter'

export default abstract class BaseRouter implements IRouter {
  abstract BasePath : Routes;

  Router: Router;

  /**
   *
   */
  constructor() {
    this.Router = Router()
  }

  abstract SetRouter() : Router
}
