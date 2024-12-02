import "reflect-metadata";
import { SERVER_PORT } from '../.config/project.config.ts';
import { server } from './routes/routes.ts'
import { AppDataSource } from './data-source.ts';
import {seed_db} from "./db_seeder.ts";

server.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`)
  })

AppDataSource.initialize().then(()=> {
  seed_db()
}
).catch((error)=>console.log(error))
