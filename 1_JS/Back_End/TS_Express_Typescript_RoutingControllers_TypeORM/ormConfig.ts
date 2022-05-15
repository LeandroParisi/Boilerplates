import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import * as PostgressConnectionStringParser from "pg-connection-string";
import constants from "./src/Configuration/constants";
import IDictionary from "./src/Commons/Interfaces/SystemInterfaces/IDictionary";


const databaseUrl : string = constants.CONNECTION_STRING;
const connectionOptions = PostgressConnectionStringParser.parse(databaseUrl);

const connections = {
  local : {
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
    extra: {
      ssl: true
    },
  }
} as IDictionary<DataSourceOptions>

const envConfiguration = connections[constants.ENV]

export default envConfiguration