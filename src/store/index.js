/* eslint-disable no-console */
import Vuex from "vuex";
import Vue from "vue";
import cloneDeep from "lodash.clonedeep";
import Handsontable from "handsontable";
import { compareFunctionFactory } from "handsontable/plugins/columnSorting/sortFunction/default"

Vue.use(Vuex);

let initialState = {
  data: Handsontable.helper.createSpreadsheetData(100, 7),
  settings: {
    colHeaders: true,
    rowHeaders: true,
    stretchH: 'all',
    width: 500,
    height: 400,
    contextMenu: true,
    copyPaste: true,
    dragToScroll: true,
    enterBeginsEditing: true,
    fillHandle: false,
    dropdownMenu: true,
    filters: false,
    persistentState: false,
    renderAllRows: false,
    manualRowMove: true,
    headerAction: true,
    columnSorting: true,
  },
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    updateData(state, data) {
      state.data = data;
    },
    updateSettings(state, settings) {
      state.settings = settings;
    },
    settingChange(state, { key, value }) {
      state.settings[key] = value;
    },
  },
  actions: {
    sort({ commit, getters }, sortConfig) {
      const data = getters.data;
      const compareFunction = compareFunctionFactory(sortConfig.sortOrder, {}, {});

      data.sort(compareFunction);

      commit('updateData', data);
    },
    change({ commit, getters }, changes) {
      const data = getters.data;

      changes.forEach(([ row, column, , newValue ]) => {
        data[row][column] = newValue;
      });

      commit('updateData', data);
    },
    createColumns({ commit, getters }, { index, createdColumns }) {
      const data = getters.data;

      data.forEach((row, i) => row.splice(index, 0, ...createdColumns[i]));

      commit('updateData', data);
    },
    removeColumns({ commit, getters }, { index, removedColumns }) {
      if (removedColumns.length > 1) {
        return console.warn('Remove for multiple columns was not implemented in this example.');
      }

      const data = getters.data;

      data.forEach(row => row.splice(index, removedColumns.length));

      commit('updateData', data);
    },
    createRows({ commit, getters }, { index, createdRows }) {
      const data = getters.data;

      data.splice(index, 0, ...createdRows);

      commit('updateData', data);
    },
    removeRows({ commit, getters }, { index, removedRows }) {
      if (removedRows.length > 1) {
        return console.warn('Remove for multiple rows was not implemented in this example.');
      }

      const data = getters.data;

      data.splice(index, removedRows.length);

      commit('updateData', data);
    },
    moveRow({ commit, getters }, { rows, target }) {
      if (rows.length > 1) {
        return console.warn('Move for multiple rows was not implemented in this example.');
      }

      const data = getters.data;
      const source = rows[0];
      const items = data.splice(source, 1);

      data.splice(source < target ? target - 1 : target, 0, ...items);

      commit('updateData', data);
    }
  },
  getters: {
    data: (state) => {
      return cloneDeep(state.data);
    },
    settings: (state) => {
      return state.settings;
    },
  },
});
