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
  CONNECTION_STRING: env.DATABASE_URL,
  USER_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJXaGF0c2FwcEFwcCIsImF1ZCI6ImlkZW50aXR5IiwidXNlckRhdGEiOnsiZW1haWwiOiJ1c2VyQHRlc3RlLmNvbSIsImlkIjoxLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE2NTE0NTQwMjgsImV4cCI6MTY1MjA1ODgyOH0.rnCXJVDFrdiK7WTPapwBq4SSw5nAJxXFA6iaqL4M2aU',
  ADMIN_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJXaGF0c2FwcEFwcCIsImF1ZCI6ImlkZW50aXR5IiwidXNlckRhdGEiOnsiZW1haWwiOiJhZG1pbkB0ZXN0ZS5jb20iLCJpZCI6Miwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY1MTQ1NjY1NCwiZXhwIjoxNjUyMDYxNDU0fQ.XP3Ph6ZLtEiMpAXEXCjJAj2yIbxiQWob0pupfz931Xo',
  SEQUELIZE: {
    CONNECTION_STRING: env.DATABASE_URL,
    options: sequelizeOptions,
  },
}
