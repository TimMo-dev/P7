import "reflect-metadata"
import  { DataSource }from "typeorm"
import { fProgrammingTask} from "./models/ProgrammingTask"
import { fTest } from "./models/Test"
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5431,
    username: "user",
    password: "password",
    database: "database",
    synchronize: true,
    logging: true,
    entities: [fProgrammingTask, fTest],
    subscribers: [],
    migrations: [],
})