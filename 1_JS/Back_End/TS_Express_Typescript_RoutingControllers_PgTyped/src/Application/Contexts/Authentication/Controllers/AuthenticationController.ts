/* eslint-disable no-use-before-define */
import {
  Route,
  Controller,
  Post,
  Body,
  Tags,
} from 'tsoa'
import { inject, ProvideSingleton } from '../../../../Commons/Ioc'
import { ILoginPayload } from './Requests/Login/ILoginPayload'
import { LoginValidation } from './Requests/Login/LoginValidation'
import { UserCrudServices } from '../../../Services/UserServices/UserCrudServices'
import JwtConfig from '../Hashing/JwtConfig'
import PasswordHashing from '../Hashing/PasswordHashing'
import ApiError from '../../../Shared/Abstractions/ApiError'
import { StatusCode } from '../../../Shared/APIs/Enums/Status'
import { ErrorMessages } from '../../../Shared/APIs/Enums/Messages'

@Tags('Authentication')
@Route('auth')
@ProvideSingleton(AuthenticationController)
export class AuthenticationController extends Controller {
  /**
   *
   */
  constructor(
    @inject(LoginValidation) private loginValidation : LoginValidation,
    @inject(UserCrudServices) private UserCrud : UserCrudServices,
  ) {
    super()
  }

  @Post('login')
  public async Login(@Body() loginReq : ILoginPayload) : Promise<string> {
    const { email, password } = loginReq
    const user = await this.UserCrud.FindOne({ email })

    if (!user) throw new ApiError(StatusCode.UNAUTHORIZED, ErrorMessages.Unauthorized)
    console.log({ user })

    try {
      await PasswordHashing.VerifyPassword(password, user.password)
    } catch (error) {
      throw new ApiError(StatusCode.UNAUTHORIZED, ErrorMessages.Unauthorized)
    }

    const token = JwtConfig.GenerateToken({ email, id: user.id, role: user.role }, JwtConfig.LongerConfig)

    return token
  }
}
