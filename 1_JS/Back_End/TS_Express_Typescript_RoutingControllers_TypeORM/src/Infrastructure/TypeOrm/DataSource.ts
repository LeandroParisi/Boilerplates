import { DataSource } from "typeorm"
import envConfiguration from "../../../ormConfig"

const AppDataSource = new DataSource(envConfiguration)

AppDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  })