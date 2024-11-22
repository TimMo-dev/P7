<!-- <script setup lang="ts">
import { ref, computed } from 'vue'
import type { Component } from 'vue'

import SolutionPage from './SolutionPage.vue';
import TasksPage from './TasksPage.vue';
import TestPage from './TestPage.vue'; 

// Define a type for the routes
type Route = {
  [key: string]: Component; // Allow string keys that map to Vue components
};

// Define a mapping of routes to components
const routes: Route = {
  '/tasks': TasksPage,
  '/solution': SolutionPage,
  '/test': TestPage, // Add more routes as needed
};

const currentPath = ref(window.location.hash.slice(1) || '/');
const queryParams = ref<{ [key: string]: string }>({});

function updatePathAndQueryParams() {
  const [path, query] = window.location.hash.slice(1).split('?');
  currentPath.value = path || '/';

  // Parse query parameters and store them in a reactive object
  queryParams.value = {};
  if (query) {
    new URLSearchParams(query).forEach((value, key) => {
      queryParams.value[key] = value;
    });
  }
}

window.addEventListener('hashchange', updatePathAndQueryParams);

// Initialize path and query parameters on load
updatePathAndQueryParams();

const CurrentPage = computed(() => {
  return routes[currentPath.value] || TasksPage;
});

</script>

<template>
  <component :is="CurrentPage" v-bind="queryParams" />
</template> -->

<template>
  <router-view />
</template>

<script setup lang="ts">
// import { ref, computed } from 'vue';
// import { useRoute } from 'vue-router';
</script>