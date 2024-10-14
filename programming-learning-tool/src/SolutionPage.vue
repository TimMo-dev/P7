<script setup>
import Collapsible from './components/Collapsible.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar/>
  <div class="min-h-screen flex flex-col">
    <!-- Top containers (left and right) with more vertical height -->
    <div class="solution-buttons">
      <div class="container-buttons">
        
      </div>
      <div class="container-buttons">
        <div class="button">
          Submit
        </div>
        <div class="button">
          Run
        </div>
      </div>
    </div>
    <div class="top-containers-wrapper">
      <!-- Left container -->
      <div class="top-container">
        <a class="absolute font-bold leading-relaxed text-sm bg-gray-200 px-2 rounded-sm">
          Task Description:
        </a>
        <div class="bg-white h-full overflow-y-auto">
          <div class="mx-4 my-8">
            test
          </div>
        </div>
      </div>
      <!-- Right container -->
      <div class="top-container relative border-2 border-dashed border-black">
        <a class="absolute font-bold leading-relaxed text-sm bg-gray-200 px-2 rounded-sm">
          Code Block:
        </a>
        <div class="bg-white h-full">
          <div class="overflow-y-auto h-full">
            <textarea type="text" placeholder="Your code here.." class="mx-4 my-8 resize-none w-full h-full"></textarea>
          </div>
        </div>
          <div class="absolute bottom-4 py-2 flex space-x-0">
              <Collapsible title="Test 1"/>
              <Collapsible title="Test 2"/>
              <Collapsible title="Test 3"/>
              <Collapsible title="Test 4"/>
          </div>
      </div>
  </div>

    <!-- Bottom container -->
    <div class="bottom-containers-wrapper">
      <div class="bottom-container">
          <a class="absolute font-bold leading-relaxed text-sm bg-gray-200 px-2 rounded-sm">
            Feedback:
          </a>
          <div class="bg-white h-full overflow-y-auto">
            <div class="mx-4 my-8">
              test
            </div>
          </div>
        </div>
      </div>
    </div>
</template>