import { defineStore } from "pinia";
import type { Table } from "@/types/table-types";

export const useTablesStore = defineStore("tableStore", {
  /**
   * STATE
   * @docs https://pinia.vuejs.org/core-concepts/state.html
   */
  state: () => ({
    tables: [] as Array<Table>,
  }),

  /**
   * GETTERS
   * @docs https://pinia.vuejs.org/core-concepts/getters.html
   */
  getters: {},

  /**
   * ACTIONS
   * @docs https://pinia.vuejs.org/core-concepts/actions.html
   */
  actions: {
    addTable(table: Table) {
      console.log("table", table);
      table.columns = table.columns.filter((column) => column.name !== "");
      this.tables.push(table);
    },
    removeTable(tableId: number) {
      this.tables = this.tables.filter((table) => table?.id !== tableId);
    },
    removeAllTables() {
      this.tables = [];
    },
  },
});
