<template>
  <v-container fluid fill-height style="position: relative" class="blue-grey lighten-4">
    <v-app-bar dense app class="teal lighten-1">
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down white--text">驾照帮</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        v-model="menu"
        bottom
        right
        transition="scale-transition"
        origin="top right"
      >
        <template v-slot:activator="{ on }">
          <v-btn @click="getAnalysisExam" small v-on="on">
            <v-icon dense class="mr-2">mdi-account-circle</v-icon>
            {{$store.state.userInfo.userName}}
          </v-btn>
        </template>
        <v-card width="300">
          <v-list dark>
            <v-list-item>
              <v-list-item-avatar>
                <v-img :src="$store.state.userInfo.pic"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{$store.state.userInfo.userName}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-on="on"
                      v-bind="attrs"
                      @click="logout"
                    >
                      <v-icon>mdi-exit-to-app</v-icon>
                    </v-btn>
                  </template>
                  <span>退出登录</span>
                </v-tooltip>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>预测通过率：</v-list-item-title>
                <v-list-item-subtitle class="my-1">科目一：<span>{{$store.state.userInfo.subject1Rate}}</span></v-list-item-subtitle>
                <v-list-item-subtitle>科目四：<span>{{$store.state.userInfo.subject2Rate}}</span></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
              
          </v-list>
        </v-card>
      </v-menu>

      <template v-slot:extension>
        <v-sheet width="100%" class="teal lighten-5">
          <v-breadcrumbs class="pt-3" :items="$store.state.breadcrumbs">
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
        </v-sheet>
      </template>

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

    <!-- <v-navigation-drawer
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
        <v-list-item
          link
          @click="logout"
        >
          退出登录
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-main app style="height: 100%" class="main">
      <router-view></router-view>
    </v-main>
  </v-container>
</template>

<script>
import {
  analysisExam
} from '@/services/api';
export default {
  name: "user",
  data: () => ({
    userName: "userName",
    drawer: null,
    menu: false
  }),
  created() {
    // this.getAnalysisExam()
  },
  methods: {
    logout() {
      sessionStorage.removeItem("Authorization");
      this.$router.push("/login");
    },
    showUserInfo() {
      this.drawer = !this.drawer
    },
    getAnalysisExam() {
      analysisExam().then(({data}) => {
        let rate = {}
        data.forEach((item) => {
          rate[`subject${item.subjectId}Rate`] = item.rate + '%'
        })
        console.log(rate);
        console.log();
        let userInfo = Object.assign({}, this.$store.state.userInfo, rate)
        console.log(data);
        console.log(this.$store.state.userInfo);
        this.$up.update('userInfo', userInfo)
      }).catch(err => {
        console.log(err);
      })
    }
  }
};
</script>

<style lang="scss" scoped>
  ::v-deep .v-toolbar__extension {
    padding: 0;
    height: 20px;
  }
</style>