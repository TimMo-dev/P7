<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import GroupCollapsible from './components/GroupCollapsible.vue';
import * as monaco from "monaco-editor";

const serverHost:string = "http://localhost:5001";

// Declare reactive variables for the code content and language
const codeContent = ref<string>('print("Hello, World!")');
const language = ref<string>('python');

// Declare a reactive variable to store the textarea content
const codeAreaContent = ref<string>('');

const submitCode = async (): Promise<void> => {
  try {
    // Make a GET request to the /compile endpoint with codeAreaContent as a query parameter
    const response = await fetch(`${serverHost}/compile?codeArea=${encodeURIComponent(codeAreaContent.value)}`, {
      method: 'GET',
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // You can handle the response further, like displaying it to the user
    console.log('Compilation request was successful');
  } catch (error) {
    console.error('Error submitting code:', error);
  }
};

// Reference for the editor container
const monacoContainer = ref<HTMLDivElement | null>(null);

// Editor instance
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

// Initialize the Monaco Editor when the component is mounted
onMounted(() => {
  if (monacoContainer.value) {
    editor = monaco.editor.create(monacoContainer.value, {
      value: codeContent.value,
      language: language.value, // Specify the language (e.g., python, javascript, etc.)
      theme: "vs", // Editor theme (vs, vs-dark, hc-black)
      automaticLayout: true,
    });
  }
});

// Dispose of the editor when the component is destroyed
onBeforeUnmount(() => {
  if (editor) {
    editor.dispose();
  }
});
</script>

<template>
  <Navbar />
  <div class="min-h-screen flex flex-col">
    <!-- Top containers (left and right) with more vertical height -->
    <div class="solution-buttons">
      <div class="container-buttons">
      </div>
      <div class="container-buttons">
        <button type="button" class="button" @click="submitCode">
          Submit
        </button>
        <div class="button">
          Run
        </div>
      </div>
    </div>
    <div class="top-containers-wrapper">
      <!-- Left container -->
      <div class="top-container">
        <a class="absolute-text">
          Task Description:
        </a>
        <div class="white-scrollable">
          <div class="mx-4 my-8">
            test
          </div>
        </div>
      </div>
      <!-- Right container -->
      <div class="top-container relative">
        <a class="absolute-text">
          Editor:
        </a>
        <div class="editor-flex">
          <div class="flex-col-full">
            <div class="absolute-full-grow">
              <div class="editor-container">
                <div ref="monacoContainer" class="monaco-editor h-screen my-6"></div>
              </div>
            </div>
            <div class="flex-grow"></div>
            <div label="tests" class="test-label">
              <GroupCollapsible :items="[
                { title: 'Test 1', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' },
                { title: 'Test 2', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' },
                { title: 'Test 3', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' },
                { title: 'Test 4', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' },
                { title: 'Test 5', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' },
              ]" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom container -->
    <div class="bottom-containers-wrapper">
      <div class="bottom-container">
        <a class="absolute-text">
          Feedback:
        </a>
        <div class="bg-white h-20 overflow-y-auto">
          <div class="mx-4 my-8">
            test
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
