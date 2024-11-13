import { describe, it, expect } from 'vitest';
 
async function call_python_compiler_API(input: string): Promise<string> {
    const url:string = 'http://localhost:8080/compile/python';
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

        // Handle potential errors in the result
        if (result.error) {
            return `Error during execution: ${result.error}`;
        }

        let cleaned_result:string = result.output.replace("\n", "")

        return cleaned_result; // Return the 'output' field from the response or an empty string if not present
    } catch (error) {
        return `Error calling the Python compiler API: ${error.message}`;
    }
}

describe('compile python code', () => {

  it('should return True for "print(2 + 2 != 5)"', async () => {
    expect(await call_python_compiler_API("print(2 + 2 != 5)")).toBe("True");
  });

  it('should print 5 when x = 5 and print(x)', async () => {
    expect(await call_python_compiler_API("x = 5\nprint(x)")).toBe("5");
  });

  it('should print Hello, World!', async () => {
    expect(await call_python_compiler_API("print('Hello, World!')")).toBe("Hello, World!");
  });

  it('should print 0, 1, 2 for a loop', async () => {
    expect(await call_python_compiler_API("for i in range(3): print(i)")).toBe("01\n2\n");
  });

  it('should return 7 for a simple add function', async () => {
    expect(await call_python_compiler_API("def add(a, b): return a + b\nprint(add(3, 4))")).toBe("7");
  });

  it('should throw a syntax error for invalid code', async () => {
    expect(await call_python_compiler_API("this shouldnt work")).toContain("invalid syntax");
  });

  it('should return [1, 2, 3] for a sorted list', async () => {
    expect(await call_python_compiler_API("print(sorted([3, 1, 2]))")).toBe("[1, 2, 3]");
  });

  it('should print Yes for a simple if condition', async () => {
    expect(await call_python_compiler_API("if 3 > 2: print('Yes')")).toBe("Yes");
  });

  it('should return VITEST for x.upper()', async () => {
    expect(await call_python_compiler_API("x = 'Vitest'\nprint(x.upper())")).toBe("VITEST");
  });

  it('should return one for x[1] when x is a dictionary', async () => {
    expect(await call_python_compiler_API("x = {1: 'one', 2: 'two'}\nprint(x[1])")).toBe("one");
  });

});
