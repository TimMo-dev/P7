import { SERVER_PORT } from '../.config/project.config.ts';
import { server } from './routes/routes.ts'


server.listen(SERVER_PORT, () => {
    console.log(`listening on port ${SERVER_PORT}`)
  })

