<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import GroupCollapsible from './components/GroupCollapsible.vue';
import HorizontalResizablePanels from './components/HorizontalResizablePanels.vue'
import VerticalResizablePanels from './components/VerticalResizablePanels.vue'
import * as SubmitCodeAPI from './models/SubmitCodeAPI';
import * as GetFeedbackAPI from './models/GetFeedbackAPI';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import * as monaco from "monaco-editor";
import { loadDefaultCode } from './utils/loadDefaultCode';

defineProps<{
  id?: string;
}>();

// Declare reactive variables to store the textarea content and selected programming language
const codeAreaContent = ref<string>('');
const selectedProgLanguage = ref<string>('Select'); // Default button text
const terminalOutput = ref<string>('');
const feedbackOutput = ref<string>('');
const taskDescription = ref<string>('Write a program which prints "Hello World!"');
const solution = ref<string>('');

// Default code snippet
const defaultCode = `# Write your code here\nprint("Hello, World!")`;

// Reactive state for toggling the dropdown
const isOpen = ref<boolean>(false);
const isSubmitDisabled = computed(() => selectedProgLanguage.value === 'Select');

// Reference for the editor container
const monacoContainer = ref<HTMLDivElement | null>(null);

// Editor instance
let editor: monaco.editor.IStandaloneCodeEditor;

const submitCode = async (): Promise<void> => {
  terminalOutput.value = await SubmitCodeAPI.POST_code(codeAreaContent.value, selectedProgLanguage.value, isSubmitDisabled.value, editor)
};

const GetFeedback = async (): Promise<void> => {
  feedbackOutput.value = await GetFeedbackAPI.GET_llama_response(taskDescription.value, selectedProgLanguage.value, editor.getValue())
};

const submitProgLanguage = async (language: string): Promise<void> => {
  // Close the dropdown immediately after a selection is made
  isOpen.value = false;

  // Update button text to the selected language
  selectedProgLanguage.value = language;

  // Load the default code for the selected language
  if (editor) {
    const newCode = await loadDefaultCode(language);
    editor.setValue(newCode);
    monaco.editor.setModelLanguage(editor.getModel()!, language);
  }
};

// Initialize the Monaco Editor when the component is mounted
onMounted(async () => {
  if (monacoContainer.value) {
    const initialCode = await loadDefaultCode(selectedProgLanguage.value);
    editor = monaco.editor.create(monacoContainer.value, {
      value: initialCode, // Set the initial code snippet
      language: selectedProgLanguage.value, // Set the initial language
      theme: "vs", // Editor theme (vs, vs-dark, hc-black)
      automaticLayout: true,
    });
    watch(selectedProgLanguage, async (newLanguage) => {
      if (editor) {
        const newCode = await loadDefaultCode(newLanguage);
        editor.setValue(newCode);
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

function navigate(path: string) {
  window.location.hash = path;
}

</script>

<template>
  <Navbar />
  <div class="flex flex-col" style="min-height: calc(100vh - 3.5rem)">
    <!-- Top containers (left and right) with more vertical height -->
    <div class="solution-buttons">
      <!-- Left Top Container -->
      <div class="container-buttons items-center justify-between">
        <button type="button" class="button m-2" @click="navigate('/tasks')">
          <i class="fa fa-arrow-left text-xl" aria-hidden="true"></i>
        </button>
        <div class="ml-auto mr-2"> Programming Language: </div>
        <Menu as="div" class="relative inline-block">
          <div>
            <MenuButton class="dropdown-menu-button">
              {{ selectedProgLanguage }}
              <ChevronDownIcon class="dropdown-arrow" aria-hidden="true" />
            </MenuButton>
          </div>
          <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="dropdown-menu-items">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a href="#" @click.prevent="submitProgLanguage('python')"
                    :class="[active ? 'hover-dropdown-item' : 'non-hover-dropdown-item', 'dropdown-menu-item ']">Python</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" @click.prevent="submitProgLanguage('c')"
                    :class="[active ? 'hover-dropdown-item' : 'non-hover-dropdown-item', 'dropdown-menu-item ']">C</a>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>

      <!-- Right Top Container -->
      <div class="container-buttons">
        <button type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          @click="submitCode">
          Submit
        </button>
        <button type="button" class="button mx-2 text-white font-bold">
          Run
        </button>
        <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="GetFeedback">
          Get Feedback
        </button>
      </div>
    </div>
    <HorizontalResizablePanels :start-height="0.2">
      <template v-slot:top>
        <div class="top-containers-wrapper h-full">
          <!-- Left container -->
          <VerticalResizablePanels>
            <template v-slot:left>
              <div class="top-container">
                <a class="absolute-text">
                  Task Description:
                </a>
                <div class="white-scrollable">
                  <div class="mx-4 my-8">
                    {{taskDescription}}
                  </div>
                </div>
              </div>
            </template>

            <!-- Right container -->
            <template v-slot:right>
              <div class="top-container relative">
                <a class="absolute-text z-10">
                  Editor:
                </a>
                <div class="editor-flex">
                  <div class="flex-col-full">
                    <div class="absolute-full-grow">
                      <div class="editor-container">
                        <div ref="monacoContainer" class="monaco-editor h-screen my-8"></div>
                      </div>
                    </div>
                    <div class="flex-grow overflow-x-auto"></div>
                    <div label="tests" class="test-label z-10">
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
            </template>
          </VerticalResizablePanels>
        </div>
      </template>

      <!-- Bottom containers -->
      <template v-slot:bottom>
        <div class="bottom-containers-wrapper h-full">
          <!-- Left Bottom Container -->
          <VerticalResizablePanels>
            <template v-slot:left>
              <div class="bottom-container relative">
                <a class="absolute-text">
                  Feedback:
                </a>
                <div class="bg-white h-full overflow-y-auto">
                  <div class="mx-4 my-8">
                    {{feedbackOutput}}
                  </div>
                </div>
              </div>
            </template>
            <!-- Right Bottom Container -->
            <template v-slot:right>
              <div class="bottom-container relative">
                <a class="absolute-text">
                  Output:
                </a>
                <div class="bg-white h-full overflow-y-auto">
                  <div class="mx-4 my-8">
                    Output from terminal: {{ terminalOutput }}
                  </div>
                </div>
              </div>
            </template>
          </VerticalResizablePanels>
        </div>
      </template>
    </HorizontalResizablePanels>
  </div>
</template>