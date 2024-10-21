import express from 'express';
import cors from 'cors';

const port = 5000;
const server = express();

//allow cors for testing purposes. 
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
  
server.get('/compile', (req, res) => {
  const codeArea = req.query.codeArea
  console.log(codeArea) 
  res.status(200)
})
  