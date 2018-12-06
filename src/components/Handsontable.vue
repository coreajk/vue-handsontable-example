<template>
    <HotTable ref="hotTableComponent"
              :data="data"
              :settings="settings"
              :afterChange="onChange2"
              :afterCreateRow="onChange"
              :afterRemoveRow="onChange"
              :afterCreateCol="onChange"
              :afterRemoveCol="onChange"
              :afterColumnMove="onChange"
              :afterRowMove="onChange"
              :afterColumnSort="onChange"
              :afterUpdateSettings="onSettingsChange"
              :columns="columns"
    />
</template>

<script>
  import { HotTable } from '@handsontable-pro/vue';
  import CellRenderer from './CellRenderer';
  import AdvancedCellRenderer from './AdvancedCellRenderer';
  import Vue from "vue";

  const models = new WeakMap();

  function tempGetR(column) {
    if (column === 0) {
      return CellRenderer;
    }

    if (column === 1) {
      return AdvancedCellRenderer;
    }
  }

  function getVueComponent(component, $vm = null) {
    let componentInstance = null;

    if (typeof component === 'string') {

      if ($vm) {
        const localComponentInstance = $vm.$options.components[component];
        if (localComponentInstance) {
          componentInstance = localComponentInstance;
        }
      }

      const globalComponentInstance = Vue.component(component);
      if (globalComponentInstance) {
        componentInstance = globalComponentInstance;
      }

      if (!componentInstance) {
        console.log('Global and local component by that name not found.');
        return null;
      }
    }

    // TODO: what if componentInstance is already extended ES6?
    return Vue.extend(componentInstance || component);
  }

  function createVueComponent(component, parent, props) {
    const settings = {
      propsData: props,
      parent: parent,
      // TODO: check if those two are needed if we set parent above
      router: parent.$router,
      store: parent.$store,
    };

    return (new component(settings)).$mount();
  }

  export default {
    name: "Handsontable",
    methods: {
      onSettingsChange() {
        console.log('onSettingsChange', arguments);
      },
      onChange2(changes, source) {
        if (source === 'edit') {
          this.onChange();
        }
      },
      onChange() {
        if (this.hotInstance) {
          this.$store.commit('updateData', this.hotInstance.getData());
        } else {
          console.log('no ref?!');
        }
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
      columns() {
        const columns = Array(7);
        const $vm = this;

        const renderer = function (instance, TD, row, col, prop, value, cellProperties) {
          if (TD) {
            if (!models.has(TD)) {
              const vueComponent = getVueComponent(tempGetR(col), $vm);
              const mountedComponent = createVueComponent(vueComponent, $vm, { value: value });

              models.set(TD, mountedComponent);
            }

            const cachedComponent = models.get(TD);

            // vueComponent.$options.propsData['value'] = value;
            cachedComponent['value'] = value;

            TD.appendChild(cachedComponent.$el);
          }

          return TD;
        };

        columns[0] = { renderer };
        columns[1] = { renderer };

        return columns;
      },
    },
    components: {
      HotTable,
    },
  }
</script>
