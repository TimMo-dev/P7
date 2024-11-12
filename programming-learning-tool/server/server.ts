import express from 'express';
import cors from 'cors';
import http from 'http';
import { server } from './routes/routes.ts'
import * as compilercontroller from './controllers/compiler.ts'

const port = 5001;

server.listen(port, () => {
    console.log(`listening on port ${port}`)
  })

