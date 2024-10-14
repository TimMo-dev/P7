<script setup>
import { ref } from 'vue';

const isExpanded = ref(false);

const props = defineProps({
  title: {
    type: String,
    required: true,
    default: 'TITLE',
  },
});

const toggleExpand = () =>
{
      isExpanded.value = !isExpanded.value;
};
</script>

<template>
    <div class="relative w-full">
      <label class="block">
        <input
          class="peer/showLabel scale-0"
          type="checkbox"
          @change="toggleExpand"
        />
        <span
          class="block max-h-6 w-20 overflow-hidden rounded-md bg-gray-400 pr-3 py-0 text-gray-800 shadow-lg 
          transition-all duration-300 ease-in-out 
          peer-checked/showLabel:max-h-72 peer-checked/showLabel:w-96"
        >
          <h3 class="flex h-6 cursor-pointer justify-end items-center font-bold">
            {{ title }}
            <i
              class="ml-2 fas"
              :class="isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"
            ></i>
          </h3>
          <p class="m-2">
            input:<br />
            output:
          </p>
        </span>
      </label>
    </div>
  </template>
  