<script setup lang="ts">
import { ref } from 'vue';

const showMenu = ref<boolean>(false);

const toggleNavbar = (): void => {
  showMenu.value = !showMenu.value;
};
</script>

<template>
  <nav class="navbar">
    <div class="navbar-items">
      <div class="navbar-item">
        <a class="navbar-text" href="/home">
          Online Programming Learning Tool
        </a>
      </div>
      <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
        <ul class="navbar-list">
          <li class="nav-item">
            <div class="navbar-item">
              <a class="navbar-text" href="#pablo">
                Username
              </a>
            </div>
          </li>
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