import "reflect-metadata"
import  { DataSource }from "typeorm"
import { ProgrammingTask } from "./models/ProgrammingTask"
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5431,
    username: "user",
    password: "password",
    database: "database",
    synchronize: true,
    logging: true,
    entities: [ProgrammingTask],
    subscribers: [],
    migrations: [],
})