import { Router } from 'express'
import Routes from '../../Enums/Routes'

export default interface IRouter {
  BasePath : Routes
  Router : Router

  SetRouter() : Router
}
