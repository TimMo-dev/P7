import express from 'express';
import http from 'http';

export function ForwardToCompiler (req ,res) 
{

    
    const port = 5001;
    const address = "localhost"
    
    const { language, codeArea } = req.body;
    
    console.log('Selected programming language:', language);
    console.log('Code:', codeArea);
    
    const options = {
        hostname: address,
        port: 8080,
        path: '/compile',
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
  