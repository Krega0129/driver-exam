<template>
  <v-container fluid>
    <v-card
      v-for="item in questionData"
      class="mt-3"
      :key="item.id"
    >
      <question
        :question="item"
      >
        <template #explain>
          <v-expansion-panels flat>
            <v-expansion-panel>
              <v-expansion-panel-header>
                <span>
                  题目解析
                </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div>
                  正确答案：
                  <span
                    class="ml-3 green--text"
                  >
                    {{ item.answer }}
                  </span>
                </div>
                <div>
                  解析：{{ item.explain }}
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
        <template #action>
          <v-spacer></v-spacer>
          <div style="max-width: 60vh">
            <v-pagination
            v-show="questionData[0]"
            v-model="currentPage"
            :length="totalPages"
            @input="_getWoringQuestion"
          ></v-pagination>
          </div>
        </template>
        <template #confirm>
          <div></div>
        </template>
        <template #next>
          <div></div>
        </template>
      </question>
    </v-card>
    <div class="grey--text text-center" v-if="!questionData.length">
      针不戳，你还没做错过题目~~
    </div>
  </v-container>
</template>

<script>
import Question from '@/components/Question';
import {
  woringQuestion
} from '@/services/api';
export default {
  name: 'error-data-bank',
  data() {
    return {
      currentPage: 1,
      totalPages: 1,
      questionData: []
    }
  },
  components: {
    Question
  },
  created() {
    this._getWoringQuestion()
  },
  methods: {
    _getWoringQuestion() {
      woringQuestion({
        currentPage: this.currentPage,
        size: 10
      }).then(({data}) => {
        window.scrollTo(0,0)
        this.totalPages = data.pages
        this.questionData = data.records
      }).catch(err => {
        this.$up.showErrorSnackbar('题目获取失败')
      })
    }
  }
}
</script>

<style scoped>
  
</style>