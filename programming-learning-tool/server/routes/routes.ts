import express from 'express';
import cors from 'cors';
import * as compilercontroller from '../controllers/compiler';
import * as testingcontroller from '../controllers/testing';
import {getTaskById, getTasks} from '../controllers/tasks';
import {getTestInputOutput} from '../controllers/getTests';


const server = express()

server.use(cors());
server.use(express.urlencoded({extended: true}));
server.use(express.json()); // Parse JSON bodies

server.post('/compile/:language', async (req, res) => {
    const {taskID} = req.body;
    const {helperValues, expectedOutput} = await getTestInputOutput(taskID);
    req.body.helperValues = helperValues;
    req.body.expectedOutput = expectedOutput;

    compilercontroller.ForwardToCompiler(req, res, (compilerResponse) => {
        const {output, error} = compilerResponse;
        // Need to check for error length as the error property is always present
        if (error && error.length > 0) {
            res.send({code_error: error});
        } else {
            req.body.compiledCode = output;
            testingcontroller.ForwardToTest(req, res);
        }
    });
});


server.get('/tasks', getTasks);
server.get('/tasks/:id', getTaskById);

export {server}