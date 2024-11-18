import express from 'express';
import cors from 'cors';
import * as compilercontroller from '../controllers/compiler';


const server = express()

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json()); // Parse JSON bodies

server.post('/compile/:language', (req, res) => {
  compilercontroller.ForwardToCompiler(req,res)
})

export { server } 