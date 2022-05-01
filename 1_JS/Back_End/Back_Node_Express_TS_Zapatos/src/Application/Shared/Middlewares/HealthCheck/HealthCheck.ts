import { Request, Response, NextFunction } from 'express'
import StaticImplements from '../../../../Commons/Anotations/StaticImplements'
import { StatusCode } from '../../APIs/Enums/Status'
import IMiddleware from '../Interfaces/IMiddleware'

@StaticImplements<IMiddleware>()
export default class HealthCheck {
  static ExecuteAsync(_req : Request, res : Response, _next : NextFunction) {
    res.status(StatusCode.OK).send('Alive')
  }
}
