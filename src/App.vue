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
    if(!this.$store.state.userInfo.hasOwnProperty('userName')) {
      getUserInfo().then(({data}) => {
        this.$up.update('userInfo', data)
        console.log(this.$store.state.userInfo);
      }).catch(err => {
        this.$up.showErrorSnackbar('获取用户信息失败')
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