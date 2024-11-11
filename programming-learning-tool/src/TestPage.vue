<script setup lang="ts">
import VerticalResizablePanels from './components/VerticalResizablePanels.vue';
</script>

<template>
  <div>
    <h1>Resizable Panels Example</h1>
    <VerticalResizablePanels>
      <template v-slot:left>
        <div class="border-test" style="padding: 10px; height: 100%">
          <h2>Left Panel</h2>
          <p>This panel can be resized. You can place any content here.</p>
        </div>
      </template>
      <template v-slot:right>
        <div class="border-test" style="padding: 10px; height: 100%">
          <h2>Right Panel</h2>
          <p>This panel can also be resized. Add your content here.</p>
        </div>
      </template>
    </VerticalResizablePanels>
  </div>
</template>

<style scoped>
.border-test {
  border: 1px solid #ccc;
}
</style>
