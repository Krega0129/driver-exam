<template>
  <v-container>
    <v-row>
      <v-col
        v-for="item in links"
        :key="item.title"
        cols="12"
        md="3"
        justify="start"
      >
        <v-card
          class="d-flex justify-center align-center text-center"
          rounded
          height="200"
          :style="item.color"
          @click="chooseModule(item)"
        >
          <div>
            <div>
              <v-icon
                x-large
                :color="item.iconColor"
                :class="[item.color]"
              >
                {{ item.icon }}
              </v-icon>
            </div>
            <div>
              {{ item.title }}
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      links: [
        {
          icon: "mdi-shuffle",
          title: "随机练习",
          link: "/user/random-practice",
          name: 'RandomPractice',
          iconColor: "indigo lighten-3",
          color: "background: rgba(0,0,0,.4); color: white"
        },
        {
          icon: "mdi-library",
          title: "专项练习",
          link: "/user/special-practice",
          name: 'SpecialPractice',
          iconColor: "lime darken-2",
          color: "background: rgba(0,0,0,.4); color: white"
        },
        {
          icon: "mdi-desktop-mac",
          title: "模拟考试",
          link: "/user/simulative-exam",
          name: 'SimulativeExam',
          iconColor: "green",
          color: "background: rgba(0,0,0,.4); color: white"
        },
        {
          icon: "mdi-chart-bar",
          title: "排行榜单",
          link: "/user/top",
          name: 'Top',
          iconColor: "yellow lighten-3",
          color: "background: rgba(0,0,0,.4); color: white"
        },
        {
          icon: "mdi-history",
          title: "历史试卷",
          link: "/user/test-history",
          name: 'TestHistory',
          iconColor: "cyan accent-3",
          color: "background: rgba(0,0,0,.4); color: white"
        },
        {
          icon: "mdi-file-document",
          title: "错题收集",
          link: "/user/error-data-bank",
          name: 'ErrorDataBank',
          iconColor: "red",
          color: "background: rgba(0,0,0,.4); color: white"
        },
        {
          icon: "mdi-star",
          title: "收藏题目",
          link: "/user/question-collection",
          name: 'QuestionCollection',
          iconColor: "orange",
          color: "background: rgba(0,0,0,.4); color: white"
        },
        {
          icon: "mdi-table-edit",
          title: "考试分析",
          link: "/user/analysis",
          name: 'Analysis',
          iconColor: "brown lighten-2",
          color: "background: rgba(0,0,0,.4); color: white"
        },
      ],
    };
  },
  methods: {
    chooseModule(item) {
      this.$router.push({
        name: item.name,
        params: item
      });
    }
  }
};
</script>

<style lang="scss" scoped>
 ::v-deep {
   .v-icon.notranslate.mdi.theme--light {
     background-color: rgba(0,0,0,0) !important;
     color: white; 
   }
 }
</style>
