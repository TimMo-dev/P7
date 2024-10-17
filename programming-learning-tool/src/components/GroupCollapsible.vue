<script setup>
import { ref } from 'vue';
import Collapsible from './Collapsible.vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const expandedIndex = ref(null);

const toggleExpand = (index) => {
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