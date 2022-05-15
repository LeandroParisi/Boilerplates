import { DataSource } from "typeorm"
import envConfiguration from "../../../ormConfig"
import * as PostgressConnectionStringParser from "pg-connection-string";
import constants from "../../Configuration/constants";
import path from "path";


const databaseUrl : string = constants.CONNECTION_STRING;
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);


const AppDataSource = new DataSource(envConfiguration)

AppDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  })

export default AppDataSource;