<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import LangButton from './components/LangButton.vue';
import TaskButton from './components/TaskButton.vue';

const selectedLanguage = ref<string | null>(null);
const tasks = ref<Array<{ title: string, description: string, taskid: number }>>([]);

// Function to set the selected language
const selectLanguage = (language: string) => {
  selectedLanguage.value = language;
};

// Fetch tasks from the backend
const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:5001/tasks');
    tasks.value = await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

onMounted(() => {
  fetchTasks();
});
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
          <TaskButton
            v-for="task in tasks"
            :key="task.taskid"
            :title="task.title"
            :content="task.description"
            :redirect="`/solution?id=${task.taskid}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>