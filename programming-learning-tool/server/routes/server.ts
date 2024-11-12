import express from 'express';
import cors from 'cors';
import http from 'http';

const port = 5001;
const address = "localhost";
const server = express();

// Allow CORS for testing purposes
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json()); // Parse JSON bodies

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});

server.post('/compile/:language', (req, res) => {
  const { language } = req.params;
  const { codeArea } = req.body;
  console.log('Selected programming language:', language);
  console.log('Code:', codeArea);

  const options = {
    hostname: address,
    port: 8080,
    path: `/compile/${language}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const data = JSON.stringify({
    language: language,
    code: codeArea
  });

  const forwardRequest = http.request(options, (forwardResponse) => {
    let responseData = '';

    forwardResponse.on('data', (chunk) => {
      responseData += chunk;
    });

    forwardResponse.on('end', () => {
      console.log('Response from container:', responseData);

      res.send({
        message: 'Text forwarded successfully',
        forwardedResponse: JSON.parse(responseData)
      });
    });
  });

  forwardRequest.write(data);
  forwardRequest.end();
});
