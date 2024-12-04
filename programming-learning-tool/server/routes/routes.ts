import express from 'express';
import cors from 'cors';
import * as compilercontroller from '../controllers/compiler';
import * as testingcontroller from '../controllers/testing';
import { getTasks, getTaskById } from '../controllers/tasks';



const server = express()

server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json()); // Parse JSON bodies

server.post('/compile/:language', (req, res) => {
  compilercontroller.ForwardToCompiler(req, res, (compilerResponse) => {
    if (compilerResponse.error) {
      return res.status(400).send({ code_output: compilerResponse.error });
    } else {
      req.body.compiledCode = compilerResponse.output;
      testingcontroller.ForwardToTest(req, res);
    }
  });
});

server.get('/tasks', getTasks);
server.get('/tasks/:id', getTaskById);

export { server }