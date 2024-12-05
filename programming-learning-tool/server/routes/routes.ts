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
    const { output, error } = compilerResponse;
    // Need to check for error length as the error property is always present
    if (error && error.length > 0) {
      return res.status(400).send({ code_output: error });
    } else {
      req.body.compiledCode = output;
      testingcontroller.ForwardToTest(req, res);
    }
  });
});


server.get('/tasks', getTasks);
server.get('/tasks/:id', getTaskById);

export { server }