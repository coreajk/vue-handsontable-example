<template>
    <div><button @click="onClick">{{ value }}</button></div>
</template>

<script>
  export default {
    name: "AdvancedCellRenderer",
    props: ['value'],
    methods: {
      onClick() {
        console.log('Vue button clicked!', this.$parent);
      }
    }
  }
</script>

<style scoped>

</style>
