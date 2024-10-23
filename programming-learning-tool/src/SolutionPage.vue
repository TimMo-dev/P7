<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import GroupCollapsible from './components/GroupCollapsible.vue';
import * as monaco from "monaco-editor";

const serverHost:string = "http://localhost:5001";

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
      value: `print("Hello, World!")`,
      language: "python", // Specify the language (e.g., python, javascript, etc.)
      theme: "vs-dark", // Editor theme (vs, vs-dark, hc-black)
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
        <a class="absolute font-bold leading-relaxed text-sm bg-gray-200 px-2 rounded-sm">
          Task Description:
        </a>
        <div class="bg-white h-full overflow-y-auto">
          <div class="mx-4 my-8">
            test
          </div>
        </div>
      </div>
      <!-- Right container -->
      <div class="top-container relative">
        <a class="absolute font-bold leading-relaxed z-10 text-sm bg-gray-200 px-2 rounded-sm">
          Editor:
        </a>
        <div class="flex bg-white h-full relative">
          <div class="flex flex-col w-full">
            <div class="absolute overflow-y-auto h-full w-full flex-grow">
              <div class="editor-container">
                <div ref="monacoContainer" class="monaco-editor mx-4 my-8 resize-none h-full w-5/6"></div>
              </div>
              <!-- <textarea name="codeArea" v-model="codeAreaContent" type="text" placeholder="Your code here.."
                class="mx-4 my-8 resize-none h-full w-5/6"></textarea> -->
            </div>
            <div class="flex-grow"></div>
            <div label="tests" class="mr-4">
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
        <a class="absolute font-bold leading-relaxed text-sm bg-gray-200 px-2 rounded-sm">
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