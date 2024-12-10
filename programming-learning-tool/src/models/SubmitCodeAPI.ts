import {computed} from 'vue';
import * as monaco from "monaco-editor";
import {SERVER_ADDRESS, SERVER_PORT} from '../../.config/project.config';


const serverHost: string = `http://${SERVER_ADDRESS}:${SERVER_PORT}`;

let codeAreaContent: string = '';
let selectedProgLanguage: string = 'Select'; // Default button text
let isSubmitDisabled = computed(() => selectedProgLanguage === 'Select');

export async function POST_code(codeAreaContent: string, selectedProgLanguage: string, selectedTaskID: number | null, isSubmitDisabled: boolean,
                                editor: monaco.editor.IStandaloneCodeEditor | null) {
    if (isSubmitDisabled) {
        alert('Please select a programming language before submitting.');
        return;
    }
    if (selectedTaskID === null) {
        throw new Error('Task ID is null');
    }
    try {
        // Get the code content from the editor
        if (editor) {
            codeAreaContent = editor.getValue();
        }

        // Construct the request body
        const body = JSON.stringify({
            codeArea: codeAreaContent,
            taskID: selectedTaskID
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
        const output = {
            code_output: '',
            passed_tests: '',
            failed_tests: '',
            code_error: ''
        }
        if (result.code_error) {
            console.error('Error submitting code:', result);
            output.code_error = result.code_error;
            return output;
        } else {
            output.code_output = result.forwardedResponse.code_output;
            output.passed_tests = result.forwardedResponse.passed_tests;
            output.failed_tests = result.forwardedResponse.failed_tests;
            return output;
        }

        console.log('Compilation request was successful');
    } catch (error: any) {
        console.error('Error submitting code:', error);
        return 'Error submitting code: ' + error.message;
    }
};