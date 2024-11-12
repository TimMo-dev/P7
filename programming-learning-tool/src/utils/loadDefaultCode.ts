
export async function loadDefaultCode(language: string): Promise<string> {
  switch (language) {
    case 'python':
      return `# Write your code here\nprint("Hello, World!")`;
    case 'c':
      return `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`;
    default:
      return `// Write your code here\nconsole.log("Hello, World!");`;
  }
}