<template>
  <div class="mb-4 w-1/4">
    <p><input v-model="data.newTable.name" placeholder="Table name" /></p>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">
            <input placeholder="Product name" />
          </th>
          <th scope="col" class="px-6 py-3"><input placeholder="Color" /></th>
          <th scope="col" class="px-6 py-3">
            <input placeholder="Category" />
          </th>
          <th scope="col" class="px-6 py-3"><input placeholder="Price" /></th>
          <BrandButton> Add Column </BrandButton>
        </tr>
      </thead>
    </table>
  </div>
</template>
<script setup lang="ts">
import BrandButton from "@/components/input/BrandButton.vue";
import { reactive } from "vue";
import type { Table as TableType } from "@/types";
const emptyTable: TableType = {
  id: null,
  name: "",
  description: "",
  columns: [],
};

const data = reactive({
  tableInput: "",
  newTable: {
    ...(emptyTable as TableType),
  },
});
</script>
