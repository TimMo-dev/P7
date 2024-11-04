<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import Navbar from './components/Navbar.vue';
import GroupCollapsible from './components/GroupCollapsible.vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import * as monaco from "monaco-editor";

const serverHost:string = "http://localhost:5001";

// Declare reactive variables to store the textarea content and selected programming language
const codeAreaContent = ref<string>('');
const selectedProgLanguage = ref<string>('Select'); // Default button text

const submitCode = async (): Promise<void> => {
  try {
    // Get the code content from the editor
    if (editor) {
      codeAreaContent.value = editor.getValue();
    }

    // Construct the request body
    const body = JSON.stringify({ 
      language: selectedProgLanguage.value, 
      codeArea: codeAreaContent.value 
    });

    // Make a POST request to the /compile endpoint with codeAreaContent and language in the body
    const response = await fetch(`${serverHost}/compile`, {
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

    // You can handle the response further, like displaying it to the user
    console.log('Compilation request was successful');
  } catch (error) {
    console.error('Error submitting code:', error);
  }
};

// Reactive state for toggling the dropdown
const isOpen = ref<boolean>(false);

const submitProgLanguage = (language: string): void => {
    // Close the dropdown immediately after a selection is made
    isOpen.value = false;

     // Update button text to the selected language
     selectedProgLanguage.value = language;
};
// Reference for the editor container
const monacoContainer = ref<HTMLDivElement | null>(null);

// Editor instance
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

// Initialize the Monaco Editor when the component is mounted
onMounted(() => {
  if (monacoContainer.value) {
    editor = monaco.editor.create(monacoContainer.value, {
      value: codeAreaContent.value,
      language: '', // Specify the language (e.g., python, javascript, etc.)
      theme: "vs", // Editor theme (vs, vs-dark, hc-black)
      automaticLayout: true,
    });
    watch(selectedProgLanguage, (newLanguage) => {
      if (editor) {
        monaco.editor.setModelLanguage(editor.getModel()!, newLanguage);
      }
    })
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
      <!-- Left Top Container -->
      <div class="container-buttons">
        Programming Language:
        <Menu as="div" class="relative inline-block text-left">
          <div>
            <MenuButton class="dropdown-menu-button">
              {{ selectedProgLanguage}}
              <ChevronDownIcon class="dropdown-arrow" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="dropdown-menu-items">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a href="#" @click.prevent="submitProgLanguage('python')" :class="[active ? 'hover-dropdown-item' : 'non-hover-dropdown-item', 'dropdown-menu-item ']">Python</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" @click.prevent="submitProgLanguage('c')" :class="[active ? 'hover-dropdown-item' : 'non-hover-dropdown-item', 'dropdown-menu-item ']">C</a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <!-- Right Top Container -->
      <div class="container-buttons">
        <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="submitCode">
          Submit
        </button>
        <button type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Run
        </button>
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
              <textarea name="codeArea" v-model="codeAreaContent" type="text" placeholder="Your code here.."
                class="mx-4 my-8 resize-none h-full w-5/6"></textarea>
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