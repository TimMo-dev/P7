<template>
  <div class="min-h-screen flex flex-col">
    <!-- Top containers (left and right) with more vertical height -->
    <div class="flex flex-grow h-3/4 justify-between space-x-4 p-4">
      <!-- Left container -->
      <div class="w-1/2 bg-blue-200 p-4">
        Left Container
      </div>
      <!-- Right container -->
      <div class="w-1/2 bg-green-200 p-4">
        Right Container
      </div>
    </div>

    <!-- Bottom container -->
    <div class="flex-grow bg-red-200 m-4 p-4">
      Bottom Container
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreeContainersLayout',
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
