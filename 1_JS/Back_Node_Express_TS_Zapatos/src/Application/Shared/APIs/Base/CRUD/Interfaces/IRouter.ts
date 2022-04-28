import { Router } from 'express'
import RoutesPath from '../../../Enums/Routes'

export default interface IRouter {
  BasePath : RoutesPath
  Router : Router

  SetRouter() : Router
}
