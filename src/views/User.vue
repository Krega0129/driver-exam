<template>
  <v-container fluid fill-height style="position: relative">
    <v-app-bar dense app class="teal lighten-1">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down white--text">驾照帮</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-avatar
        size="36px"
        @click.stop="showUserInfo"
      >
        <img
          alt="Avatar"
          src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
        >
      </v-avatar>

      <!-- <v-dialog>
        <template #activator="{ on, attrs }">
          <v-btn class="teal" text v-on="on" v-bind="attrs">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-on="on" v-bind="attrs"> mdi-exit-to-app </v-icon>
              </template>
              <span>退出登录</span>
            </v-tooltip>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>是否确认退出程序？</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="error" @click="logout">确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->

      <v-dialog
        v-model="$store.state.loading"
        hide-overlay
        persistent
      >
        <v-card
          color="rgba(0,0,0,.5)"
          dark
        >
          <v-card-text class="pa-3">
            <v-progress-circular
              :size="30"
              color="white"
              indeterminate
            ></v-progress-circular>
            加载中...
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <!-- <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="amber lighten-3" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

        <div>{{ userName }}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="route in links"
          :key="route.title"
          link
          :to="route.link"
        >
          <v-list-item-icon>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-navigation-drawer
        app
        v-model="drawer"
        fixed
        right
        temporary
        overlay-opacity="0"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <!-- <v-list-item
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->
          <v-list-item
            link
            @click="logout"
          >
            退出登录
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

    <v-breadcrumbs style="position: fixed; top: 40px" :items="$store.state.breadcrumbs">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item
            exact-path
            :to="item.link"
            replace
            :disabled="item.disabled"
          >
            {{ item.title }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>

    <v-main style="height: 100%" class="flex-grow-1 pt-16">
      <router-view></router-view>
    </v-main>
  </v-container>
</template>

<script>
export default {
  name: "user",
  data: () => ({
    userName: "userName",
    drawer: null
  }),
  methods: {
    logout() {
      sessionStorage.removeItem("Authorization");
      this.$router.push("/login");
    },
    showUserInfo() {
      this.drawer = !this.drawer
    }
  },
  watch: {
    '$store.state.loading'(val) {
      console.log(val);
    }
  }
};
</script>

<style>

</style>