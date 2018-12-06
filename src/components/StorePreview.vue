<template>
    <div>
        <table>
            <tbody>
            <tr v-for="(row, rowIndex) in data" :key="'r' + rowIndex">
                <td v-for="(cell, cellIndex) in row" :key="'c' + rowIndex + '-' + cellIndex">
                    <transition name="bounce" mode="out-in">
                        <span :key="cell">{{ cell }}</span>
                    </transition>
                </td>
            </tr>
            </tbody>
        </table>
        <transition name="bounce" mode="out-in">
            <pre :key="JSON.stringify(settings)">{{ JSON.stringify(settings, null, 4) }}</pre>
        </transition>
    </div>
</template>

<script>
  export default {
    name: "StorePreview",
    computed: {
      data() {
        return this.$store.getters.data;
      },
      settings() {
        return this.$store.getters.settings;
      },
    },
  }
</script>

<style scoped>
    table {
        border-collapse: collapse;
        width: 100%;
    }

    td {
        border: 1px solid #ccc;
        padding: 0;
    }

    span {
        display: block;
        padding: 4px 8px;
        width: 100%;
    }

    pre {
        padding: 10px;
        background: #f5f5f5;
        border: 1px solid #ccc;
    }
</style>