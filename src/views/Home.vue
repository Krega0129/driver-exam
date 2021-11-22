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
          :class="[item.color]"
          @click="chooseModule(item)"
        >
          <div>
            <div>
              <v-icon
                x-large
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
          color: "blue lighten-4 blue--text"
        },
        {
          icon: "mdi-library",
          title: "专项练习",
          link: "/user/special-practice",
          name: 'SpecialPractice',
          color: "indigo lighten-4 indigo--text"
        },
        {
          icon: "mdi-history",
          title: "历史试题",
          link: "/user/test-history",
          name: 'TestHistory',
          color: "teal lighten-4 teal--text"
        },
        {
          icon: "mdi-file-document",
          title: "错题集",
          link: "/user/error-data-bank",
          name: 'ErrorDataBank',
          color: "yellow lighten-4 amber--text"
        }
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
