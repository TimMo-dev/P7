import { SERVER_PORT } from '../.config/project.config.ts';
import { server } from './routes/routes.ts'
import { AppDataSource } from './data-source.ts';
import { ProgrammingTask } from './models/ProgrammingTask.ts';


server.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`)
  })

AppDataSource.initialize().then(()=> {
  
}
).catch((error)=>console.log(error))
