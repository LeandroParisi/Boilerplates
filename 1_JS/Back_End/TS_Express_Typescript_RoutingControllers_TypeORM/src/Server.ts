/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import constants from './Configuration/constants'
import { Logger } from './Commons/Logger'
import HealthCheck from './Application/Shared/Middlewares/HealthCheck/HealthCheck'

export class Server {
  public app: express.Express = express();

  private readonly port: number = constants.PORT;

  public Start() {
    this.app.use(this.AllowCors)
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    this.app.use(morgan('dev', { skip: () => !Logger.logFile }))

    // ROUTES
    this.app.use('health', HealthCheck.ExecuteAsync)

    const listen = this.app.listen(this.port)

    Logger.info(`${constants.ENV} server running on port: ${this.port}`)
    
    return listen
  }

  private AllowCors(_req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey, x-access-token',
    )
    next()
  }
}
