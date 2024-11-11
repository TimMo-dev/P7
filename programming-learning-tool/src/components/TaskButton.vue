<script setup lang="ts">
const props = defineProps<{
  title: string;
  content?: string;
  redirect?: string;
}>();

function navigate() {
  if (props.redirect) {
    window.location.hash = props.redirect;
  }
}
</script>

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