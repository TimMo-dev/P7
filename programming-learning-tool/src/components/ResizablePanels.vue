<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';

// Define a prop to control where the separator starts
const props = defineProps({
  startHeight: {
    type: Number,
    default: 0.5 * window.innerHeight,  // Default to half the screen height
  }
});

const screenHeight = ref<number>(window.innerHeight);

// Reactive state
const isResizing = ref<boolean>(false);
const topHeight = ref<number>(screenHeight.value / 2 - 55 + (props.startHeight * screenHeight.value)); // Default height for the top panel
const bottomHeight = ref<number>(screenHeight.value / 2 - 55 - (props.startHeight * screenHeight.value)); // Default height for the bottom panel
const startY = ref<number>(0); // Initial Y position for resizing

// Boundaries for the resizing to stay within valid space
const minTopHeight = 100; // Minimum height for the top panel
const minBottomHeight = 100; // Minimum height for the bottom panel

const updateScreenHeight= () => {
      screenHeight.value = window.innerHeight;
      topHeight.value = screenHeight.value / 2 - 55 + (props.startHeight * screenHeight.value);
      bottomHeight.value = screenHeight.value / 2 - 55 - (props.startHeight * screenHeight.value);
}

const startResize = (event: MouseEvent) => {
  isResizing.value = true;
  startY.value = event.clientY;

  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);
};

const resize = (event: MouseEvent) => {
  if (!isResizing.value) return;

  const deltaY = event.clientY - startY.value;

  let newTopHeight = topHeight.value + deltaY;
  let newBottomHeight = bottomHeight.value - deltaY;

  // Restrict resizing to valid space
  if (newTopHeight >= minTopHeight && newBottomHeight >= minBottomHeight) {
    topHeight.value = newTopHeight;
    bottomHeight.value = newBottomHeight;
  }

  startY.value = event.clientY;
};

const stopResize = () => {
  isResizing.value = false;
  window.removeEventListener('mousemove', resize);
  window.removeEventListener('mouseup', stopResize);
};

onMounted(() => {
  window.addEventListener('resize', updateScreenHeight);
});

// Clean up event listeners on component unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenHeight);
  window.removeEventListener('mousemove', resize);
  window.removeEventListener('mouseup', stopResize);
});
</script>

<template>
  <div class="resizable-panels">
    <div class="panel" :style="{ height: topHeight + 'px' }">
      <slot name="top"></slot>
    </div>
    <div class="separator" @mousedown="startResize" />
    <div class="panel" :style="{ height: bottomHeight +'px' }">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<style scoped>
.resizable-panels {
  display: flex;
  flex-direction: column;
  height: 100%;  /* Allow the component to fill the container */
}

.panel {
  overflow: auto;  /* Ensure panels can scroll if content is too large */
}

.separator {
  cursor: ns-resize;  /* Cursor indicates vertical resizing */
  height: 10px;  /* Height of the separator */
  background: gray;  /* Separator color */
}
</style>
