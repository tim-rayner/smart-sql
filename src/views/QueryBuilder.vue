<template>
  <div class="about">
    <MessageWindow />
  </div>
</template>

<script setup lang="ts">
import MessageWindow from "@/components/MessageWindow.vue";
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
