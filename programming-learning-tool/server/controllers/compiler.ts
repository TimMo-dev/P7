import http from 'http';
import { INGRESS_ADDRESS, INGRESS_PORT } from '../../.config/project.config';


export function ForwardToCompiler (req, res, callback) 
{

        const { language } = req.params;
        const { codeArea } = req.body;
        let helperValues = [[2,2], [3, 5], [4, 8]];
        console.log('Selected programming language:', language);
        console.log('Code:', codeArea);
      
        const options = {
          hostname: INGRESS_ADDRESS,
          port: INGRESS_PORT,
          path: `/compile/${language}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        const data = JSON.stringify({
          language: language,
          code: codeArea,
          helper_values: helperValues
        });
      
        const forwardRequest = http.request(options, (forwardResponse) => {
          let responseData = '';
      
          forwardResponse.on('data', (chunk) => {
            responseData += chunk;
          });
      
          forwardResponse.on('end', () => {
            console.log('Response from compile container:', responseData);
            const parsedResponse = JSON.parse(responseData);
            callback(parsedResponse);
          });
        });
      
        forwardRequest.write(data);
        forwardRequest.end();
}
