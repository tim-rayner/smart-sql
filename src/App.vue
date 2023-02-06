<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { reactive } from "vue";
import BrandButton from "./components/input/BrandButton.vue";
import WelcomeMsg from "./components/WelcomeMsg.vue";

const data = reactive({
  activeTab: 0,
});
</script>

<template>
  <header>
    <div class="">
      <WelcomeMsg msg="Welcome to Query Mate" />
      <nav>
        <BrandButton
          @click="$router.push('/'), (data.activeTab = 0)"
          :outline="data.activeTab === 0"
        >
          Configuration
        </BrandButton>
        <BrandButton
          @click="$router.push('/query'), (data.activeTab = 1)"
          :outline="data.activeTab === 1"
        >
          Query Builder
        </BrandButton>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
