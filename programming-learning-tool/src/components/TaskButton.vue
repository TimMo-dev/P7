<template>
  <div 
  class="task-item-button flex items-center justify-between"
  @click="navigate">
      <div class="flex flex-col">
          <div class="task-item-title">
              {{title}}
          </div>
          <div class="task-item-content" v-if="content"> 
              {{content}}
          </div>
      </div>
      <i class="fa-solid fa-chevron-right text-gray-800 ml-auto"></i>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: String,
  content: String,
  taskId: Number,
});

const emits = defineEmits(['navigate']);

const navigate = () => {
  emits('navigate', props.taskId);
};
</script>