<template>
  <v-app>
    <router-view></router-view>
    <v-snackbar
      v-model="show"
      :timeout="timeout"
      :color="snackbar.type"
      app
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    show: false,
    snackbar: {
      text: '',
      type: ''
    },
    timeout: 2000,
  }),
  watch: {
    '$store.state.snackbar'(newVal) {
      this.snackbar = newVal
      this.show = true
    }
  }
};
</script>