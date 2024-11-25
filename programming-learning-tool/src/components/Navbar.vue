<script setup lang="ts">
import { ref } from 'vue';

const showMenu = ref<boolean>(false);
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