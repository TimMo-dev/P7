import * as fs from 'fs';
import * as path from 'path';
import LlamaAI from 'llamaai';
import dotenv from 'dotenv';

const conversation_history = [
  {
    role: "system",
    content: `
Your role is to provide direct, constructive feedback on coding solutions.

You will be given a solution attempt to a programming task and
your job to provide concise feedback which is mostly positive but you can
also criticize minor syntax or logical issues. The feedback is directed
at beginner programmers who have very limited knowledge about programming.

You will only give feedback based on the contents of the 'solution' function
and ignore the function name, parameter names and if the function is being called.

Make sure to:
- not provide corrected solutions, suggestions, or alternative implementations. 
- Do not write any code yourself.
- Briefly highlight well-implemented aspects.
- Avoid introductory phrases such as "Here's the feedback" or similar.
- Limit feedback to brief, relevant points specific to the given solution. 
- Keep the response short.
- Avoid criticizing if nothing noteworthy is bad about the implementation.
- Do not do further elaboration on something the user did correctly.

Here's an example of what your feedback should look like:
The prompt you receive:
"
Task Description: "Make a basic program that prints "Hello World!""

Programming Language: "Python"

Solution Attempt: " def solution():
    printf("Hello World!")"
"

your response:
"The use of a function to encapsulate the program's logic is good. 
The string \"Hello World\" is correctly enclosed in quotes.

However, Python's print function is used incorrectly as \"printf\", which is commonly used in other programming languages.
Also, a semicolon is not needed at the end of the line in Python."

You will receive inputs in this format:

Task Description: [TASK DESCRIPTION]  
Programming Language: [PROGRAMMING LANGUAGE]  
Solution Attempt: [SOLUTION ATTEMPT]  
`
  }
];

export async function GET_llama_response(task_description:string, programming_language:string, solution_attempt:string): Promise<string> {

  const llama_api_key = import.meta.env.VITE_LLAMA_API_KEY;
  
  const llama = new LlamaAI(llama_api_key);
  
  let user_prompt = `
  Task Description: "${task_description}",
  Programming Language: "${programming_language}",
  Solution Attempt: "${solution_attempt}"
  `;

  return get_response(user_prompt, llama);
}

async function get_response(user_prompt: string, llama: LlamaAI): Promise<string> {
  // Add the user message to the conversation history
  add_to_conversation_history("user", user_prompt);

  // Create the API request with the model specified
  const apiRequestJson = {
    model: "llama3.1-70b", // Specify the model here
    messages: conversation_history
  };

  // Execute the request
  const response = await llama.run(apiRequestJson);

  // Return the assistant's message for display
  return response['choices'][0]['message']['content'];
}

function add_to_conversation_history(role: string, content: string): void {
  // Add a message to the conversation history
  conversation_history.push({ role, content });
}