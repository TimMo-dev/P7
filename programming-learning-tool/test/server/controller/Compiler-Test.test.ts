import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ForwardToCompiler } from '../../../server/controllers/compiler';
import http from 'http'
import { INGRESS_ADDRESS, INGRESS_PORT } from '../../../.config/project.config';

vi.mock('http')

describe('ForwardToCompiler', () => {
    let req;
    let res;
    let mockRequest;
    let mockResponse;

    beforeEach(() => {
        req = {
            params: {language: 'python'},
            body: {codeArea: 'print("Hello, world!");' }
        };

        res = {
            send: vi.fn()
        };

        mockRequest = {
            write: vi.fn(),
            end: vi.fn(),
            on: vi.fn(),
        };

        mockResponse = {
            on: vi.fn((event, handler) => {
                if (event === 'data') handler('{"result": "success"}');
                if (event === 'end') handler();
            }),
        };

        (http.request as vi.Mock).mockImplementation((options, callback) => {
            callback(mockResponse);
            return mockRequest;
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Send data correctly', () => {
        ForwardToCompiler(req, res);

        expect(http.request).toHaveBeenCalledWith(
            {
                hostname: INGRESS_ADDRESS,
                port: INGRESS_PORT,
                path: `/compile/${req.params.language}`,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            },
            expect.any(Function)
        );

        expect(mockRequest.write).toHaveBeenCalledWith(
            JSON.stringify({ language: 'python', code: 'print("Hello, world!");' })
        );

        expect(res.send).toHaveBeenCalledWith({
            message: 'Text forwarded successfully',
            forwardedResponse: { result: 'success' },
        });
    });
});