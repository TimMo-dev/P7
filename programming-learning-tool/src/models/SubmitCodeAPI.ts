import { computed } from 'vue';
import * as monaco from "monaco-editor";
import { SERVER_PORT, SERVER_ADDRESS } from '../../.config/project.config';


const serverHost: string = `http://${SERVER_ADDRESS}:${SERVER_PORT}`;

let codeAreaContent:string = '';
let selectedProgLanguage:string = 'Select'; // Default button text
let isSubmitDisabled = computed(() => selectedProgLanguage === 'Select');

export async function POST_code(codeAreaContent:string, selectedProgLanguage:string, isSubmitDisabled:boolean, 
                                editor:monaco.editor.IStandaloneCodeEditor | null) {
    if (isSubmitDisabled) {
      alert('Please select a programming language before submitting.');
      return;
    }
    try {
      // Get the code content from the editor
      if (editor) {
        codeAreaContent = editor.getValue();
      }
  
      // Construct the request body
      const body = JSON.stringify({
        codeArea: codeAreaContent
      });
  
      // Make a POST request to the /compile/:language endpoint with codeAreaContent in the body
      const response = await fetch(`${serverHost}/compile/${selectedProgLanguage}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: body,
      });
  
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      // Parse the response JSON
      const result = await response.json();
  
      // Check if there is an error in the response
      if (result.forwardedResponse.error) {
        return result.forwardedResponse.error.trim();
      } else {
        return result.forwardedResponse.output.trim();
      }
  
      console.log('Compilation request was successful');
    } catch (error: any) {
      console.error('Error submitting code:', error);
      return 'Error submitting code: ' + error.message;
    }
  };