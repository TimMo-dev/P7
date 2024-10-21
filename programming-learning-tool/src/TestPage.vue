<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Navbar from './components/Navbar.vue';

const leftWidth = ref(300); // initial width of left container
const isResizing = ref(false);

const startResize = (event) => {
  isResizing.value = true;
  window.addEventListener('mousemove', onResize);
  window.addEventListener('mouseup', stopResize);
};

const onResize = (event) => {
  if (isResizing.value) {
    leftWidth.value = event.clientX; // adjust the left container width
  }
};

const stopResize = () => {
  isResizing.value = false;
  window.removeEventListener('mousemove', onResize);
  window.removeEventListener('mouseup', stopResize);
};

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onResize);
  window.removeEventListener('mouseup', stopResize);
});
</script>

<template>
  <Navbar></Navbar>
  <div class="flex h-screen">
    <div
      class="resizable bg-gray-100"
      :style="{ width: leftWidth + 'px' }"
    >
      <!-- Left content -->
      Left Side
    </div>
    <div class="resizer" @mousedown="startResize"></div>
    <div
      class="flex-grow bg-gray-200"
      :style="{ width: `calc(100% - ${leftWidth}px)` }"
    >
      <!-- Right content -->
      Right Side
    </div>
  </div>
</template>

<style scoped>
.resizable {
  min-width: 100px; /* Prevent the box from becoming too small */
}

.resizer {
  width: 5px;
  cursor: ew-resize;
  background-color: #ddd;
  height: 100%;
}
</style>