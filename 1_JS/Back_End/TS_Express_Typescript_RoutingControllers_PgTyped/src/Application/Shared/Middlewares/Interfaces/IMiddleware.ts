/* eslint-disable semi */
import { NextFunction, Request, Response } from 'express';

export default interface IMiddleware {
  ExecuteAsync(req : Request, res : Response, next : NextFunction) : Promise<void> | any
}
