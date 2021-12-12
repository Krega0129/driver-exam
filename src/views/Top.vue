<template>
  <v-container fluid>
    <!-- <dv-full-screen-container> -->
      <v-row>
        <v-col cols="3">
          <v-card flat dark class="card-bg">
            <v-card-title>我的排名</v-card-title>
            <v-card-subtitle>科目一</v-card-subtitle>
            <v-card-text class="d-flex justify-center">
              <dv-decoration-9 style="width:25vh;height:25vh;">
                <span class="text-h4">{{myTop1Rank}}</span>
              </dv-decoration-9>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-subtitle>科目四</v-card-subtitle>
            <v-card-text class="d-flex justify-center">
              <dv-decoration-9 style="width:25vh;height:25vh;">
                <span class="text-h4">{{myTop2Rank}}</span>
              </dv-decoration-9>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-row>
            <v-col>
              <v-card
                max-width="32vw"
                class="mx-auto card-bg"
                dark
              >
                <v-img
                  src="@/assets/images/5.webp"
                  height="150px"
                  dark
                >
                  <v-row class="fill-height">
                    <v-card-title class="white--text pl-12">
                      <div class="text-h4">
                        科目一排行榜
                      </div>
                    </v-card-title>
                    <!-- <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          我的排名
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item> -->
                  </v-row>
                </v-img>

                <v-list dense class="fill-height bar" style="overflow-y: scroll" height="53vh">
                  <v-list-item 
                    v-for="item in top1.examRankPage"
                    :key="item.userId"
                    link
                  >
                    <v-list-item-avatar>
                      <v-img
                        :alt="`${item.userName} avatar`"
                        :src="item.pic"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{item.userName}}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{item.score}}分
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-title>
                        耗时 {{item.passTime}} 秒
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-icon :color="colors[item.rank - 1]" v-if="item.rank <= 3">
                        mdi-crown
                      </v-icon>
                      <v-icon v-else>
                        {{item.rank}}
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col>
              <v-card
                max-width="32vw"
                class="mx-auto card-bg"
                dark
              >
                <v-img
                  src="@/assets/images/3.webp"
                  height="150px"
                  dark
                >
                  <v-row class="fill-height">
                    <v-card-title class="white--text pl-12">
                      <div class="text-h4">
                        科目四排行榜
                      </div>
                    </v-card-title>
                  </v-row>
                </v-img>

                <v-list dense class="fill-height bar" style="overflow-y: scroll" height="53vh">
                  <v-list-item 
                    v-for="item in top2.examRankPage"
                    :key="item.userId"
                    link
                  >
                    <v-list-item-avatar>
                      <v-img
                        :alt="`${item.userName} avatar`"
                        :src="item.pic"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{item.userName}}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{item.score}}分
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-title>
                        耗时 {{item.passTime}} 秒
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-icon :color="colors[item.rank - 1]" v-if="item.rank <= 3">
                        mdi-crown
                      </v-icon>
                      <v-icon v-else>
                        {{item.rank}}
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    <!-- </dv-full-screen-container> -->
  </v-container>
</template>

<script>
import { getExamRank } from '@/services/api';
import { subjectItems } from '@/data/types';
export default {
  name: 'top',
  data() {
    return {
      subjectItems,
      tab: 0,
      top1: [],
      top2: [],
      colors: ['yellow darken-1', 'blue-grey lighten-3', 'orange accent-2']
    }
  },
  created() {
    this._getExamRank(1)
    this._getExamRank(2)
  },
  computed: {
    myTop1Rank() {
      return parseInt(this.top1.myRank) < 0 ? '50+' : this.top1.myRank
    },
    myTop2Rank() {
      return parseInt(this.top2.myRank) < 0 ? '50+' : this.top2.myRank
    }
  },
  methods: {
    _getExamRank(subject) {
      getExamRank({
        subjectId: subject
      }).then(({data}) => {
        this[`top${subject}`] = data
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style>

</style>