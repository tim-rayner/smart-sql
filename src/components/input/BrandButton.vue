<template>
  <button
    v-if="props.outline"
    class="mr-1 my-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded hover:cursor-pointer"
  >
    <slot></slot>
  </button>
  <button
    v-else
    class="mr-1 my-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded hover:cursor-pointer"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  outline?: boolean;
}>();
</script>
