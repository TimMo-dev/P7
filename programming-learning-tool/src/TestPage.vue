<script setup lang="ts">
import { ref } from 'vue';

import Navbar from './components/Navbar.vue';
import LangButton from './components/LangButton.vue';
import TaskButton from './components/TaskButton.vue';
import ResizablePanels from './components/ResizablePanels.vue';
</script>

<template>
  <div>
    <h1>Resizable Panels Example</h1>
    <ResizablePanels>
      <template v-slot:top>
        <div class="border-test" style="padding: 10px; height: 100%">
          <h2>Top Panel</h2>
          <p>This panel can be resized. You can place any content here.</p>
        </div>
      </template>
      <template v-slot:bottom>
        <div class="border-test" style="padding: 10px; height: 100%">
          <h2>Bottom Panel</h2>
          <p>This panel can also be resized. Add your content here.</p>
        </div>
      </template>
    </ResizablePanels>
  </div>
</template>