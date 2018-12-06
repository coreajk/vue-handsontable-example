<template>
    <div class="sidebar">
        <div class="sidebar-logo">
            <img src="../assets/handsontable.svg">
            <img src="../assets/vue.svg">
        </div>
        <div class="sidebar-toggle" v-for="(value, key) in settings" v-if="typeof value === 'boolean'" :key="key" @click="toggle(key)">
            <span>{{ key }}</span>
            <input type="checkbox" :id="key" v-model="settings[key]">
            <label :for="key"><i></i></label>
        </div>
        <button @click="updateVuex">Random change Vuex</button>
        <div class="sidebar-divider"></div>
        <div class="sidebar-version">
            <div>handsontable: {{ version.handsontable }}</div>
            <div>@handsontable/vue: {{ version.wrapper }}</div>
            <div>vue: {{ version.vue }}</div>
            <div>vuex: {{ version.vuex }}</div>
            <div>moment: {{ version.moment }}</div>
        </div>
    </div>
</template>

<script>
  import { HotTable } from '@handsontable-pro/vue';
  import Handsontable from 'handsontable-pro';
  import Vue from 'vue';
  import Vuex from 'vuex';
  import Moment from 'moment';
  import shuffle from 'lodash.shuffle';

  export default {
    name: 'Sidebar',
    props: ['settings'],
    methods: {
      toggle(key) {
        this.$store.commit('settingChange', {
          key: key,
          value: !this.settings[key],
        });
      },
      updateVuex() {
        this.$store.commit('updateData', shuffle(this.$store.getters.data));
      }
    },
    computed: {
      version() {
        return {
          handsontable: Handsontable.version || '?',
          wrapper: HotTable.version || '?',
          vue: Vue.version || '?',
          vuex: Vuex.version || '?',
          moment: Moment.version || '?',
        }
      }
    },
  }
</script>

<style scoped>
    .sidebar {
        display: flex;
        flex-direction: column;
        width: 250px;
    }

    .sidebar-logo {
        margin: 0 auto;
        padding: 20px;
    }

    .sidebar-logo img {
        width: 50%;
    }

    .sidebar-divider {
        flex-grow: 2;
    }

    .sidebar-version {
        font-size: 0.7em;
        padding: 20px;
        border-top: 1px solid gainsboro;
    }

    .sidebar-toggle {
        display: flex;
        padding: 5px 20px;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        cursor: default;
    }

    .sidebar-toggle:hover {
        background-color: #f5f5f5;
    }

    label {
        display: block;
        width: 36px;
        height: 22px;
        border-radius: 100px;
        transition: all 0.2s ease-in-out;
        -webkit-transition: all 0.2s ease-in-out;
        background-color: #E6E9EC;
    }

    input {
        display: none;
    }

    /* The toggle */

    i {
        height: 18px;
        width: 18px;
        background: #ffffff;
        display: inline-block;
        border-radius: 100px;
        margin-top: 2px;
        margin-left: 2px;
        transition: all 0.2s ease-in-out;
        -webkit-transition: all 0.2s ease-in-out;
        pointer-events: none;
        box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
    }

    label:hover>i {
        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.20);
        transform: scale(1.01);
    }

    input:checked+label>i {
        margin-left: 16px;
    }

    label:active {
        background-color: #A6B9CB;
    }

    label:active>i {
        width: 26px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.20);
    }

    input:checked+label:active>i {
        margin-left: 13px;
    }

    input:checked+label {
        background-color: #4b89ff;
    }
</style>
