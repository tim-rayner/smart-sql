import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTableStore = defineStore("table", () => {
  const tables = ref([]);
  //@ts-ignore
  const addTable = (table: any) => tables.value.push(table);
  const removeTable = (
    tableId: number //@ts-ignore
  ) => (tables.value = tables.value.filter((table) => table?.id !== tableId));
  const removeAllTables = () => {
    tables.value = [];
  };
  return { tables, addTable, removeTable, removeAllTables };
});
