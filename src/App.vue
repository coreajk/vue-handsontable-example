<template>
    <div id="app">
        <sidebar :settings="settings"></sidebar>
        <div class="handsontable-view">
            <h2>Handsontable Component</h2>
            <Handsontable/>
        </div>
        <div class="store-view">
            <h2>Vuex State Preview</h2>
            <StorePreview/>
        </div>
    </div>
</template>

<script>
  import StorePreview from "./components/StorePreview";
  import Sidebar from "./components/Sidebar";
  import Handsontable from "./components/Handsontable";

  global.Handsontable = Handsontable;

  export default {
    name: 'App',
    methods: {
      toggle(key) {
        this.$store.commit('settingChange', {
          key: key,
          value: !this.settings[key],
        });
      },
    },
    computed: {
      data() {
        return this.$store.getters.data;
      },
      settings() {
        return this.$store.getters.settings;
      },
    },
    components: {
      Handsontable,
      Sidebar,
      StorePreview,
    },
  }
</script>

<style src="../node_modules/handsontable-pro/dist/handsontable.full.css"></style>
<style>
    html {
        box-sizing: border-box;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    #app {
        font-family: Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        display: flex;
        height: 100%;
    }

    .handsontable-view,
    .store-view {
        padding: 20px;
        border-left: 1px solid #ccc;
        height: 100%;
        flex-grow: 1;
        max-width: calc(50% - 100px);
    }

    .bounce-enter-active {
        animation: bounce 1s;
    }

    @keyframes bounce {
        50% {
            border-color: #fff;
            background-color: #4b89ff;
            color: #fff;
        }
    }
</style>
