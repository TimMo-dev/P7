<script setup lang="ts">
import { ref } from 'vue';

// Reactive state for toggling the dropdown
const isOpen = ref<boolean>(false);
const showMenu = ref<boolean>(false);

// Toggle the navbar menu
const toggleNavbar = (): void => {
  showMenu.value = !showMenu.value;
};

// Toggle the dropdown menu
const toggleDropdown = (): void => {
  isOpen.value = !isOpen.value;
};
const serverHost:string = "http://localhost:5001";

const submitLanguage = async (selectedLanguage: string): Promise<void> => {
  try {
    // Close the dropdown immediately after a selection is made
    isOpen.value = false
    // Construct the request body
    const body = JSON.stringify({ language: selectedLanguage });

    // Make a POST request to the /setLanguage endpoint with the selected language as the body
    const response = await fetch(`${serverHost}/setLanguage`, {
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
    console.log('Language submission was successful:', data);
  } catch (error) {
    console.error('Error submitting language:', error);
  }
};

</script>

<template>
  <!-- Left-aligned navigation items -->
  <nav class="navbar">
    <div class="navbar-items">
      <div class="navbar-item">
        <a class="navbar-text" href="/home">
          Online Programming Learning Tool
        </a>
      </div>

      <!-- Right-aligned navigation items -->
      <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
        <ul class="navbar-list">
          
          <!-- Username -->
          <li class="nav-item">
            <div class="navbar-item">
              <a class="navbar-text" href="#pablo">
                Username
              </a>
            </div>
          </li>

          <!-- Language Dropdown -->
          <li class="nav-item">
          <div class="relative inline-block text-left">
            <button
              @click="toggleDropdown"
              class="navbar-text"
              id="dropdown-button"
            >
              Language
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isOpen"
              class="absolute right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              <div class="py-1">
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100"
                  role="menuitem"
                  @click="() => { submitLanguage('English');}"
                  >
                  English
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100"
                  role="menuitem"
                  @click="() => { submitLanguage('Dansk');}"
                  >
                  Dansk
                </a>
              </div>
            </div>
          </div>
          </li>

            <!-- Log out -->
          <li class="nav-item">
            <div class="navbar-item">
              <a class="navbar-text" href="#pablo">
                Log Out
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
