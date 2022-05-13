/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Response } from 'express'
import StaticImplements from '../../../../Commons/Anotations/StaticImplements'
import constants from '../../../../Configuration/constants'
import ApiError from '../../../Shared/Abstractions/ApiError'
import { ErrorMessages } from '../../../Shared/APIs/Enums/Messages'
import { StatusCode } from '../../../Shared/APIs/Enums/Status'
import IAuthenticatedRequest from '../../../Shared/APIs/Interfaces/ExpressInterfaces/CustomRequests/IAuthenticatedReques'
import IMiddleware from '../../../Shared/Middlewares/Interfaces/IMiddleware'
import JwtConfig from '../Hashing/JwtConfig'

require('dotenv/config')

@StaticImplements<IMiddleware>()
export default class AuthenticateUser {
  static async ExecuteAsync(
    req : IAuthenticatedRequest, res : Response, next : NextFunction,
  ) : Promise<void> {
    // const auth = req.get('auth')

    // console.log({ req })

    // if (!auth) throw new ApiError(StatusCode.UNAUTHORIZED, ErrorMessages.ExpiredSession)

    try {
      // const { userData } = JwtConfig.Decode(auth)
      const { userData } = JwtConfig.Decode(constants.USER_TOKEN)

      req.user = { ...userData }
      next()
    } catch (error) {
      throw new ApiError(StatusCode.UNAUTHORIZED, ErrorMessages.ExpiredSession)
    }
  }
}
