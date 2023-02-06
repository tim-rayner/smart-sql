<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings pb-5">
    <h1 class="">{{ msg }}</h1>
    <h3 class="py-2">
      Welcmome to Query Mate, a SQL query generator powered by GPT3 artificial
      intelligence
    </h3>
  </div>
</template>

<style scoped></style>
