<template>
  <div class="relative overflow-x-auto">
    <h2>{{ props.table.name }}</h2>
    <table class="text-sm text-left text-gray-500 dark:text-gray-400 w-2/4">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            scope="col"
            class="px-6 py-3"
            v-for="column in props.table.columns"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td class="px-6 py-4" v-for="column in props.table.columns">...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Table } from "@/types/table-types";
import { defineProps } from "vue";

const props = defineProps<{
  table: Table;
}>();
</script>
