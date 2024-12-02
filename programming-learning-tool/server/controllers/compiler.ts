import http from 'http';
import { INGRESS_ADDRESS, INGRESS_PORT } from '../../.config/project.config';


export function ForwardToCompiler (req, res) 
{

        const { language } = req.params;
        const { codeArea } = req.body;
        console.log('Selected programming language:', language);
        console.log('Code:', codeArea);
        let expec = ["Hello World", 2, "popo"]
        let user_out = ["Hello World", 5, "pepe"]

      
        const options = {
          hostname: INGRESS_ADDRESS,
          port: INGRESS_PORT,
          path: `/test/code`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        const data = JSON.stringify({
          expected_output: expec,
          user_output: user_out,
          code_output: codeArea // Include the code output
        });
      
        const forwardRequest = http.request(options, (forwardResponse) => {
          let responseData = '';
      
          forwardResponse.on('data', (chunk) => {
            responseData += chunk;
          });
      
          forwardResponse.on('end', () => {
            console.log('Response from container:', responseData);
            const parsedResponse = JSON.parse(responseData);
            const formattedResponse = {
              code_output: parsedResponse.code_output?.trim(),
              passed_tests: parsedResponse.passed_tests,
              failed_tests: parsedResponse.failed_tests
            };
            res.send({
              message: 'Text forwarded successfully',
              forwardedResponse: formattedResponse
            });
          });
        });
      
        forwardRequest.write(data);
        forwardRequest.end();
}
