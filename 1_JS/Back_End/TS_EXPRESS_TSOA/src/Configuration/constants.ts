// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Options } from 'sequelize/types'

require('dotenv/config')

const { env } = process

const sequelizeOptions : Options = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      require: true,
    },
  },
}

export default {
  ENV: env.NODE_ENV,
  PORT: Number(env.PORT),
  SEQUELIZE: {
    CONNECTION_STRING: env.DATABASE_URL,
    options: sequelizeOptions,
  },
}
