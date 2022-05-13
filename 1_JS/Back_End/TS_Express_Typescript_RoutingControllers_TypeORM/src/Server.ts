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
    // process.on('uncaughtException', this.CriticalErrorHandler)
    // process.on('unhandledRejection', this.CriticalErrorHandler)

    this.app.use(this.AllowCors)
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    this.app.use(morgan('dev', { skip: () => !Logger.logFile }))

    // ROUTES


    this.app.use('health', HealthCheck.ExecuteAsync)

    // const swaggerDocument = require('../build/swagger.json')

    // this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    const listen = this.app.listen(this.port)

    // this.OpenSwaggerUi()

    Logger.info(`${constants.ENV} server running on port: ${this.port}`)
    return listen
  }

  // private CriticalErrorHandler(...args) {
  //   Logger.error('Critical Error...', ...args)
  //   process.exit(1)
  // }

  private AllowCors(_req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey, x-access-token',
    )
    next()
  }

  // private OpenSwaggerUi() {
  //   if (constants.ENV === 'local') {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //     require('open')(`http://localhost:${constants.PORT}/swagger`)
  //   }
  // }
}
