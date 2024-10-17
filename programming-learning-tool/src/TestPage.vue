<script setup>
import Collapsible from './components/Collapsible.vue';
import GroupCollapsible from './components/GroupCollapsible.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="flex bg-white h-full w-1/2 relative">
    <div class="flex flex-col w-full">
      <div class="absolute overflow-y-auto h-full w-full flex-grow">
        <textarea type="text" placeholder="Your code here.." class="mx-4 my-8 resize-none h-full w-full"></textarea>
      </div>
      <div label="tests" class="sticky">
        <GroupCollapsible :items="[
          { title: 'Test 1', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' },
          { title: 'Test 2', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' },
          { title: 'Test 3', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' },
          { title: 'Test 4', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' },
          { title: 'Test 5', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' },
          { title: 'Test 6', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' },
          { title: 'Test 7', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' },
          { title: 'Test 8', content: 'Input: 12<br>Expected Output: 13<br>Actual Output: 14' }
        ]" />
      </div>
    </div>
  </div>
</template>