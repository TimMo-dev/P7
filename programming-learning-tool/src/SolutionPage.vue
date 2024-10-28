<script setup lang="ts">
import { ref } from 'vue';  // Import ref to create a reactive variable
import Navbar from './components/Navbar.vue';
import GroupCollapsible from './components/GroupCollapsible.vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const serverHost:string = "http://localhost:5001";

// Declare a reactive variable to store the textarea content
const codeAreaContent = ref<string>('');

const submitCode = async (): Promise<void> => {
  try {
    // Make a POST request to the /compile endpoint with codeAreaContent as a query parameter
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

// Reactive state for toggling the dropdown
const isOpen = ref<boolean>(false);
const selectedProgLanguage = ref<string>('Select'); // Default button text

const submitProgLanguage = async (language: string): Promise<void> => {
  try {
    // Close the dropdown immediately after a selection is made
    isOpen.value = false

     // Update button text to the selected language
     selectedProgLanguage.value = language;

    // Construct the request body
    const body = JSON.stringify({ language  });

    // Make a POST request to the /setLanguage endpoint with the selected language as the body
    const response = await fetch(`${serverHost}/setProgLanguage`, {
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

    // Optionally, handle the response further
    const data = await response.json(); // Parse the response as JSON
    console.log('Programming language submission was successful:', data);
  } catch (error) {
    console.error('Error submitting programming language:', error);
  }
};
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
            <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              {{ selectedProgLanguage }}
              <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>
          </div>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a href="#" @click="() => { submitProgLanguage('Python'); }" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Python</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" @click="() => { submitProgLanguage('C'); }" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">C</a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <!-- Right Top Container -->
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