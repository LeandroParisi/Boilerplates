import 'reflect-metadata'
import { Application } from 'express'
import Container, { Service } from 'typedi'
import ErrorCatcher from './Application/Shared/Middlewares/ErrorHandler/ErrorCatcher'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import HealthCheck from './Application/Shared/Middlewares/HealthCheck/HealthCheck'
import swaggerUi from 'swagger-ui-express'

dotenv.config()

const corsOptions = {
  credentials: true,
  origin: true,
}

@Service()
class Server {
  static PORT = process.env.PORT || 3000

  private app : Application

  /**
   *
   */
  constructor(
  ) {
    this.app = express()
  }

  public Setup() {
    this.app.use(cors(corsOptions))
    this.app.use(express.json())
    this.app.use(express.static('public'))
    this.app.use(cookieParser())
    this.app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: '/swagger.json',
        },
      }),
    )
  }

  public Start() {
    this.app.use(ErrorCatcher.HandleError)

    this.app.use('/health-check', HealthCheck.ExecuteAsync)

    this.app.listen(Server.PORT, () => console.log(`listening to port ${Server.PORT}`))
  }
}

const App = Container.get(Server)

App.Setup()
App.Start()
