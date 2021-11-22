<template>
  <v-radio-group
    column 
    :multiple="type == 1"
    dense
    v-model="res"
    @change="$emit('update:res', res)"
  >
    <v-radio
      v-for="item in option"
      :key="item"
      :label="item"
      :value="item"
    ></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: 'singleSelect',
  props: {
    type: {
      type: [String, Number],
      default: 0
    },
    option: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      res: []
    }
  }
}
</script>

<style>

</style>