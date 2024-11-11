<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, defineProps } from 'vue';

// Define a prop to control where the separator starts
const props = defineProps({
  startWidth: {
    type: Number,
    default: 0.5 * window.innerWidth,  // Default to half the screen width
  }
});

const screenWidth = ref<number>(window.innerWidth);

// Reactive state
const isResizing = ref<boolean>(false);
const leftWidth = ref<number>(props.startWidth); // Initial width for the left panel
const rightWidth = ref<number>(screenWidth.value - leftWidth.value); // Initial width for the right panel
const startX = ref<number>(0); // Initial X position for resizing

// Boundaries for the resizing to stay within valid space
const minLeftWidth = window.innerWidth/10; // Minimum width for the left panel
const minRightWidth = window.innerWidth/10; // Minimum width for the right panel

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
  leftWidth.value = props.startWidth;
  rightWidth.value = screenWidth.value - leftWidth.value;
};

const startResize = (event: MouseEvent) => {
  isResizing.value = true;
  startX.value = event.clientX;

  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);
};

const resize = (event: MouseEvent) => {
  if (!isResizing.value) return;

  const deltaX = event.clientX - startX.value;

  let newLeftWidth = leftWidth.value + deltaX;
  let newRightWidth = screenWidth.value - newLeftWidth;

  // Restrict resizing to valid space
  if (newLeftWidth >= minLeftWidth && newRightWidth >= minRightWidth) {
    leftWidth.value = newLeftWidth;
    rightWidth.value = newRightWidth;
  }

  startX.value = event.clientX;
};

const stopResize = () => {
  isResizing.value = false;
  window.removeEventListener('mousemove', resize);
  window.removeEventListener('mouseup', stopResize);
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

// Clean up event listeners on component unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
  window.removeEventListener('mousemove', resize);
  window.removeEventListener('mouseup', stopResize);
});
</script>

<template>
  <div class="resizable-panels">
    <div class="panel" :style="{ flexBasis: leftWidth + 'px' }">
      <slot name="left"></slot>
    </div>
    <div class="separator" @mousedown="startResize"></div>
    <div class="panel" :style="{ flexBasis: rightWidth + 'px' }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped>
.resizable-panels {
  display: flex;
  flex-direction: row;
  width: 100%;  /* Allow the component to fill the container */
}

.panel {
  overflow: auto;  /* Ensure panels can scroll if content is too large */
}

.separator {
  cursor: ew-resize;  /* Cursor indicates horizontal resizing */
  width: 10px;  /* Width of the separator */
  background: gray;  /* Separator color */
}
</style>
