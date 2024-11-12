import express from 'express';
import cors from 'cors';
import http from 'http';
import * as compilercontroller from '../controllers/compiler';

const port = 5001;
const address = "localhost"

const server = express()

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json()); // Parse JSON bodies

server.post('/compile', (req, res) => {
  compilercontroller.ForwardToCompiler(req,res)
})

export { server } 