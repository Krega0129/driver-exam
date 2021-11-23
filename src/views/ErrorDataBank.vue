<template>
  <v-container fluid>
    <v-card
      v-for="item in questionData.records"
      class="mt-3"
      :key="item.id"
    >
      <question
        :question="item"
      >
        <template #action>
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
      </question>
    </v-card>
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
      questionData: {}
    }
  },
  components: {
    Question
  },
  mounted() {
    woringQuestion({
      currentPage: 1,
      size: 10
    }).then(({data}) => {
      console.log(data);
      this.questionData = data
    })
  }
}
</script>

<style scoped>

</style>