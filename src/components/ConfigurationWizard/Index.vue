<template>
  <div class="content">
    <h3>Enter Table name Below</h3>
    <input v-model="data.tableInput" type="string" />
    <button @click="addTableToStore">Add</button>

    <h4>Tables:</h4>
    <ul>
      <li v-for="table in tables">{{ table }}</li>
    </ul>
    <button @click="removeAllTables">Remove all tables</button>
  </div>

  <div class="bgx"></div>
</template>

<script setup lang="ts" scoped>
import { useTableStore } from "@/stores/table-store";
import { reactive } from "vue";

const { tables, addTable, removeTable, removeAllTables } = useTableStore();

const data = reactive({
  tableInput: "",
});

const addTableToStore = () => {
  if (data.tableInput.length) {
    addTable(data.tableInput);
    data.tableInput = "";
  }
};
</script>

<style lang="scss">
/*--------------------
Body
--------------------*/
*,
*::before,
*::after {
  box-sizing: border-box;
}

// .bg {
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   z-index: 1;
//   background: url("https://images.unsplash.com/photo-1451186859696-371d9477be93?crop=entropy&fit=crop&fm=jpg&h=975&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1925")
//     no-repeat 0 0;
//   filter: blur(80px);
//   transform: scale(1.2);
//   position: relative;
// }

.content {
  position: relative;
  z-index: 2;
}
</style>
