import http from 'http';
import {INGRESS_ADDRESS} from '../../.config/project.config';


export function ForwardToTest(req, res) {
    const compiledCode = req.body.compiledCode;
    const expec = req.body.expectedOutput;
    console.log('Code to test:', compiledCode);
    console.log('Expected output:', expec);


    const options = {
        hostname: INGRESS_ADDRESS,
        port: 8088,
        path: `/test/code`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const data = JSON.stringify({
        expected_output: expec,
        user_output: compiledCode,
    });

    const forwardRequest = http.request(options, (forwardResponse) => {
        let responseData = '';

        forwardResponse.on('data', (chunk) => {
            responseData += chunk;
        });

        forwardResponse.on('end', () => {
            console.log('Response from test container:', responseData);
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
