/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Response } from 'express'
import StaticImplements from '../../../../Commons/Anotations/StaticImplements'
import constants from '../../../../Configuration/constants'
import { Roles } from '../../../../Domain/Enums/Roles'
import ApiError from '../../../Shared/Abstractions/ApiError'
import { ErrorMessages } from '../../../Shared/APIs/Enums/Messages'
import { StatusCode } from '../../../Shared/APIs/Enums/Status'
import IAuthenticatedRequest from '../../../Shared/APIs/Interfaces/ExpressInterfaces/CustomRequests/IAuthenticatedReques'
import IMiddleware from '../../../Shared/Middlewares/Interfaces/IMiddleware'
import JwtConfig from '../Hashing/JwtConfig'
import IUserToken from '../Interfaces/IUserToken'

require('dotenv/config')

@StaticImplements<IMiddleware>()
export default class AuthenticateAdmin {
  static async ExecuteAsync(
    req : IAuthenticatedRequest, res : Response, next : NextFunction,
  ) : Promise<void> {
    // const auth = req.get('auth')

    // console.log({ req })

    // if (!auth) throw new ApiError(StatusCode.UNAUTHORIZED, ErrorMessages.ExpiredSession)

    try {
      // const { userData } = JwtConfig.Decode(auth)
      const userData = JwtConfig.Decode(constants.ADMIN_TOKEN).userData as IUserToken

      if (userData.role !== Roles.admin) {
        throw new ApiError(StatusCode.UNAUTHORIZED, ErrorMessages.Unauthorized)
      }

      req.user = { ...userData }
      next()
    } catch (error) {
      throw new ApiError(StatusCode.UNAUTHORIZED, ErrorMessages.ExpiredSession)
    }
  }
}
