import { DataSource } from "typeorm"
import envConfiguration from "../../../ormConfig"
import * as PostgressConnectionStringParser from "pg-connection-string";
import constants from "../../Configuration/constants";
import path from "path";


const databaseUrl : string = constants.CONNECTION_STRING;
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);


const AppDataSource = new DataSource({
  name: constants.ENVS.LOCAL,
  type: "postgres",
  host: connectionOptions.host,
  port: +connectionOptions.port,
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: connectionOptions.database,
  synchronize: true,
  migrationsRun: true,
  dropSchema: false,
  entities: [
    path.join(__dirname, "..", "Entities", "**", "*.*"),
    path.join(__dirname, "..", "Entities", "*.*")
  ],
  migrations: [
    path.join(__dirname, "Migrations", "*.*")
  ],
})

AppDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  })

export default AppDataSource;