/* eslint-disable no-use-before-define */
import {
  Route,
  Controller,
  Post,
  Body,
  Tags,
  Request,
} from 'tsoa'
import * as Express from 'express'
import { inject, ProvideSingleton } from '../../../../Commons/Ioc'
import { ILoginPayload } from './Requests/Login/ILoginPayload'
import { LoginValidation } from './Requests/Login/LoginValidation'

@Tags('Authentication')
@Route('auth')
@ProvideSingleton(AuthenticationController)
export class AuthenticationController extends Controller {
  /**
   *
   */
  constructor(
    @inject(LoginValidation) private loginValidation : LoginValidation,
  ) {
    super()
  }

  @Post('login')
  public async Login(@Body() loginReq : ILoginPayload, @Request() request : Express.Request) {
    this.loginValidation.ExecuteAsync(request)
    await Promise.resolve()
    console.log({ loginReq })
    return loginReq
  }
}
