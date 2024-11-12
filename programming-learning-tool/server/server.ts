import { server } from './routes/routes.ts'

const port = 5001;

server.listen(port, () => {
    console.log(`listening on port ${port}`)
  })

