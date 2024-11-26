import http from 'http';
import { INGRESS_ADDRESS, INGRESS_PORT } from '../../.config/project.config';


export function ForwardToCompiler (req, res) 
{

        const { language } = req.params;
        const { codeArea } = req.body;
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
}
  