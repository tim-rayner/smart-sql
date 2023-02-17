<template>
  <div class="mb-4 w-1/4">
    <p>
      <input
        class="!border-none text-lg"
        v-model="data.newTable.name"
        placeholder="Edit title"
      />
    </p>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            scope="col"
            class="px-6 py-3"
            v-for="(column, index) in data.newTable.columns"
          >
            <input
              class="border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Column name"
              v-model="data.newTable.columns[index].name"
            />
          </th>
          <BrandButton @click="addColumn" class="px-3 py-2">
            Add Column
          </BrandButton>
        </tr>
      </thead>
    </table>
  </div>
  <div class="mb-4 w-1/4">
    <BrandButton @click="addTable"> Add Table </BrandButton>
  </div>
</template>
<script setup lang="ts">
import BrandButton from "@/components/input/BrandButton.vue";
import { reactive } from "vue";
import type { Table as TableType } from "@//types/table-types";
// Store
import { useTablesStore } from "@/stores/table-store";

const tablesStore = useTablesStore();

const emptyTable: TableType = {
  name: "",
  description: "",
  columns: [{ name: "" }],
};

const getEmptyTable = (): TableType => ({
  name: "",
  description: "",
  columns: [{ name: "" }],
});

const data = reactive({
  tableInput: "",
  newTable: getEmptyTable(),
});

const validateTable = () => {
  if (data.newTable.name === "") {
    return false;
  }
  if (data.newTable.columns.length === 0) {
    return false;
  }
  return true;
};

const addColumn = () => {
  data.newTable = {
    ...data.newTable,
    columns: [...data.newTable.columns, { name: "" }],
  };
};

const addTable = () => {
  if (validateTable()) {
    tablesStore.addTable(data.newTable);
    data.newTable = emptyTable as TableType;
  }
};
</script>
