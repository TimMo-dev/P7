import "reflect-metadata"
import  { DataSource }from "typeorm"
import { Programming_Task} from "./models/ProgrammingTask"
import { Test } from "./models/Test"
import {Test_Suite} from "./models/Test_Suite.ts";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5431,
    username: "user",
    password: "password",
    database: "database",
    synchronize: true,
    logging: true,
    entities: [Programming_Task, Test, Test_Suite],
    subscribers: [],
    migrations: [],
})