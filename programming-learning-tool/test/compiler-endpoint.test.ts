import { expect, test } from 'vitest'
 
async function call_python_compiler_API(input: string): Promise<string> {
    const url = 'http://localhost:5000/compile';
    const headers = {
        'Content-Type': 'application/json',
    };

    const payload = JSON.stringify({ code: input });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: payload,
        });

        // Check if response is valid JSON
        const result = await response.json();
        return result.output || ''; // Return the 'output' field from the response or an empty string if not present
    } catch (error) {
        return 'Error calling the Python compiler API:';
    }
}


test('compile python code', async () => {
    expect(await call_python_compiler_API("return1 + 1)")).toBe("2");
    expect(await call_python_compiler_API("x = 5\nprint(x)")).toBe("5");
    expect(await call_python_compiler_API("print('Hello, World!')")).toBe("Hello, World!");
    expect(await call_python_compiler_API("for i in range(3): print(i)")).toBe("0\n1\n2");
    expect(await call_python_compiler_API("def add(a, b): return a + b\nprint(add(3, 4))")).toBe("7");
    expect(await call_python_compiler_API("print(len([1, 2, 3]))")).toBe("3");
    expect(await call_python_compiler_API("print(sorted([3, 1, 2]))")).toBe("[1, 2, 3]");
    expect(await call_python_compiler_API("if 3 > 2: print('Yes')")).toBe("Yes");
    expect(await call_python_compiler_API("x = 'Vitest'\nprint(x.upper())")).toBe("VITEST");
    expect(await call_python_compiler_API("x = {1: 'one', 2: 'two'}\nprint(x[1])")).toBe("one");
});