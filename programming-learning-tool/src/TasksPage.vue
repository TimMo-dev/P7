<script setup lang="ts">
import { ref } from 'vue';

import Navbar from './components/Navbar.vue';
import LangButton from './components/LangButton.vue';
import TaskButton from './components/TaskButton.vue';

const selectedLanguage = ref<string | null>(null);

// Function to set the selected language
const selectLanguage = (language: string) => {
  selectedLanguage.value = language;
};
</script>

<template>
  <Navbar />
  <div class="grid grid-cols-3 gap-4 p-4">
    <div class="top-container" style="height: 85vh; width: 100%;">
      <a class="absolute-text">
        Programming Language:
      </a>
      <div class="white-scrollable">
        <div class="mx-4 my-10">
          <LangButton title="Python" :isSelected="selectedLanguage === 'Python'" @select="selectLanguage('Python')" />
          <LangButton title="C" :isSelected="selectedLanguage === 'C'" @select="selectLanguage('C')" />
          <LangButton title="Haskell" :isSelected="selectedLanguage === 'Haskell'"
            @select="selectLanguage('Haskell')" />
        </div>
      </div>
    </div>
    <!-- ... -->
    <div class="top-container col-span-2" style="height: 85vh; width: 100%;">
      <a class="absolute-text">
        Task:
      </a>
      <div class="white-scrollable">
        <div class="mx-4 my-10">
          
          <TaskButton title="Hello World!"
                      content="Write a program that prints 'Hello world!'"
                      redirect="/solution" />
                    
          <TaskButton title="How to pointers work" 
                      content="Learn how pointers work in C and complete an exercise"
                      redirect="/solution" />
                    
          <TaskButton title="Sort the Array" 
                      content="sort an array of items which are the contents of the list"
                      redirect="/solution" />
                    
          <TaskButton title="How to reverse a binary tree" 
                      content="good luck!"
                      redirect="/solution" />
                    
          <TaskButton title="Building your own GPT" 
                      content="its easy!"
                      redirect="/solution" />
        </div>
      </div>
    </div>
  </div>
</template>