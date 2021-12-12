<template>
  <v-app>
    <!-- <dv-full-screen-container> -->
      <router-view></router-view>
    <!-- </dv-full-screen-container> -->
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
import {
  getUserInfo
} from '@/services/api';
export default {
  data: () => ({
    show: false,
    snackbar: {
      text: '',
      type: ''
    },
    timeout: 2000,
  }),
  created() {
    if(sessionStorage.getItem('Authorization')) {
      getUserInfo().then(({data}) => {
        this.$up.update('userInfo', Object.assign(this.$store.state.userInfo, data))
      }).catch(err => {
        console.log(err);
      })
    }
  },
  watch: {
    '$store.state.snackbar'(newVal) {
      this.snackbar = newVal
      this.show = true
    }
  }
};
</script>