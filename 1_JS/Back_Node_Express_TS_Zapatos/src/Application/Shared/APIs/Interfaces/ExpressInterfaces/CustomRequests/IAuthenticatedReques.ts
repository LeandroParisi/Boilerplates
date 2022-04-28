import { Request } from 'express'
import IUserToken from '../../../../../Domains/Authentication/Interfaces/IUserToken'

export default interface IAuthenticatedRequest extends Request {
  user : IUserToken
}
