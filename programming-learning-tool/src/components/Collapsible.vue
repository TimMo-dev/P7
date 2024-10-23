<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  title: string;
  content: string;
  isExpanded?: boolean;
}>();

const emit = defineEmits<{
  (event: 'toggle'): void;
}>();

const toggleExpand = (): void => {
  emit('toggle');
};
</script>

<template>
    <div class="relative w-full">
      <label class="block">
        <input
          class="peer/showLabel scale-0"
          type="checkbox"
          @change="toggleExpand"
          :checked="props.isExpanded"
        />
        <span
          class="block max-h-6 w-24 overflow-hidden rounded-t-lg bg-gray-400 pr-3 py-0 text-gray-800 shadow-lg 
          transition-all duration-300 ease-in-out"
          :class="{'max-h-72 w-80': props.isExpanded}"
        >
          <h3 class="flex h-6 cursor-pointer ml-4 items-center font-bold">
            {{ title }}
            <i
              class="ml-2 fas"
              :class="isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'"
            ></i>
          </h3>
          <p class="m-2" v-html="content">
          </p>
        </span>
      </label>
    </div>
  </template>
  