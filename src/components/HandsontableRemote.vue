<template>
    <HotTable ref="hotTableComponent"
              :data="data"
              :settings="settings"
              :beforeChange="beforeChange"
              :beforeCreateRow="beforeCreateRow"
              :beforeRemoveRow="beforeRemoveRow"
              :beforeCreateCol="beforeCreateCol"
              :beforeRemoveCol="beforeRemoveCol"
              :beforeColumnSort="beforeColumnSort"
              :beforeRowMove="beforeRowMove"
    />
</template>

<script>
  import { HotTable } from '@handsontable-pro/vue';

  export default {
    name: "Handsontable",
    methods: {
      beforeChange(changes, source) {
        if (source !== 'loadData') {
          this.$store.dispatch('change', changes);
        }

        return false;
      },
      beforeCreateRow(index, amount) {
        const colsCount = this.hotInstance.countCols();
        const createdRows = new Array(amount);

        createdRows.fill(new Array(colsCount));
        this.$store.dispatch('createRows', { index, createdRows });

        return false;
      },
      beforeRemoveRow(index, amount, removedRows) {
        this.$store.dispatch('removeRows', { index, removedRows });

        return false;
      },
      beforeCreateCol(index, amount) {
        const rowsCount = this.hotInstance.countRows();
        const createdColumns = new Array(rowsCount);

        createdColumns.fill(new Array(amount));
        this.$store.dispatch('createColumns', { index, createdColumns });

        return false;
      },
      beforeRemoveCol(index, amount, removedColumns) {
        this.$store.dispatch('removeColumns', { index, removedColumns });

        return false;
      },
      beforeRowMove(rows, target) {
        this.$store.dispatch('moveRow', { rows, target });

        return false;
      },
      beforeColumnMove(columns, target) {
        this.$store.dispatch('moveColumn', { columns, target });

        return false;
      },
      beforeColumnSort(currentSortConfig, nextSortConfig) {
        const hot = this.hotInstance;
        const sortConfig = nextSortConfig[0];
        const columnSortingPlugin = hot.getPlugin('columnSorting');

        // set optimistic UI
        columnSortingPlugin.setSortConfig(sortConfig);
        hot.render();

        if (sortConfig) {
          // apply change to the Vuex
          this.$store.dispatch('sort', sortConfig)
            .catch(() => {
              // reset optimistic UI on error, sort action failed
              columnSortingPlugin.setSortConfig(currentSortConfig);
            });
        }

        return false;
      },
      // eslint-disable-next-line no-unused-vars
      beforeFilter(conditionsStack) {
        // do it yourself
      },
    },
    computed: {
      hotInstance() {
        return this.$refs.hotTableComponent.hotInstance;
      },
      data() {
        return this.$store.getters.data;
      },
      settings() {
        return this.$store.getters.settings;
      },
    },
    components: {
      HotTable,
    },
  }
</script>

<style scoped>

</style>