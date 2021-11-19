<template>
  <v-container fluid>
    <v-app-bar app class="teal lighten-1">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">驾照帮</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-dialog>
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
      </v-dialog>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
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
    </v-navigation-drawer>

    <v-sheet> </v-sheet>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-container>
</template>

<script>
export default {
  name: "user",
  data: () => ({
    userName: "userName",
    account: "account",
    drawer: null,
    links: [
      {
        icon: "mdi-home",
        title: "首页",
        link: "/user/home",
      },
      {
        icon: "mdi-library",
        title: "题库",
        link: "/user/question-library",
      },
      {
        icon: "mdi-history",
        title: "历史试题",
        link: "/user/test-history",
      },
      {
        icon: "mdi-file-document",
        title: "错题集",
        link: "/user/error-data-bank",
      },
    ],
  }),
  methods: {
    logout() {
      sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>