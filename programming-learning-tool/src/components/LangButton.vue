<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  title: string;
  isSelected: boolean;
}>();

const emit = defineEmits<{
  (e: 'select'): void;
}>();

const handleClick = () => {
  emit('select');
};
</script>

<template>
    <div 
        :class="['lang-item-button', { 'selected': isSelected }]"
        @click="handleClick">
        <div class="lang-item-title">
            {{title}}
        </div>
        <i class="fa-solid fa-chevron-right text-gray-800 ml-auto"></i>
    </div>
</template>