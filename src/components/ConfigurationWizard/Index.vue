<template>
  <div class="content">
    <!-- <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Enter Table name Below
      </label>
      <input
        class="shadow appearance-none border rounded w-1/8 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="tableName"
        type="text"
        v-model="data.tableInput"
      />
      <BrandButton @click="addTableToStore">Add</BrandButton>
    </div>
    <h3></h3> -->
    <TableForm />
    <br />

    <h4>Tables:</h4>
    <ul>
      <div v-for="table in tables">
        <Table :table="table" />
      </div>
    </ul>
    <button @click="tablesStore.removeAllTables">Remove all tables</button>
  </div>

  <div class="bgx"></div>
</template>

<script setup lang="ts" scoped>
import Table from "./components/Table.vue";
// Store
import { useTablesStore } from "@/stores/table-store";
import { storeToRefs } from "pinia";
import TableForm from "./components/TableForm.vue";

const tablesStore = useTablesStore();
const { tables } = storeToRefs(tablesStore);
</script>

<style lang="scss"></style>
