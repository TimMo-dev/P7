import { server } from './routes/routes.ts'
import { AppDataSource } from './data-source.ts';
import { ProgrammingTask } from './models/ProgrammingTask.ts';

const port = 5001;

server.listen(port, () => {
    console.log(`listening on port ${port}`)
  })

AppDataSource.initialize().then(()=> {
  
}
).catch((error)=>console.log(error))
