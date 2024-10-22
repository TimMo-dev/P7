<script setup lang="ts">
import { ref } from 'vue';
import Collapsible from './Collapsible.vue';

interface Item {
  title: string;
  content: string;
  isExpanded?: boolean;
}

const props = defineProps<{
  items: Item[]; // Define the type of items in the array
}>();

const expandedIndex = ref<number | null>(null);

const toggleExpand = (index: number): void => {
  expandedIndex.value = expandedIndex.value === index ? null : index;
};
</script>

<template>
<div class=" bottom-4 flex flex-nowrap overflow-x-auto max-w-full">
    <div v-for="(item, index) in items":key="index" class="flex flex-col w-auto">
        <div class="flex-grow">

        </div>
        <div class="flex w-300">
            <Collapsible 
            :title="item.title" 
            :content="item.content"
            :is-expanded="expandedIndex === index" 
            @toggle="toggleExpand(index)"/>
        </div>
    </div>
</div>
</template>