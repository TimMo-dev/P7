<script setup lang="ts">
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

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash.slice(1) || '/';
})

const CurrentPage = computed(() => {
  return routes[currentPath.value] || TasksPage; // Default to TasksPage if the route is not found
});

</script>

<template>
  <component :is="CurrentPage" />
</template>
