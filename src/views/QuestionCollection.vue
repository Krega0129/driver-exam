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
        <template #next>
          <div></div>
        </template>
      </question>
    </v-card>
    <div class="text-center">
      <v-pagination
        v-show="questionData[0]"
        v-model="currentPage"
        :length="totalPages"
        @input="_getStarQuestion"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import {
  starQuestions
} from '@/services/api';
import Question from '@/components/Question';
export default {
  name: 'question-collection',
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
    this._getStarQuestion()
  },
  methods: {
    _getStarQuestion() {
      starQuestions({
        currentPage: this.currentPage,
        size: 10
      }).then(({data}) => {
        window.scrollTo(0,0)
        this.totalPages = data.pages
        this.questionData = data.records
      }).catch(err => {
        this.$up.showErrorSnackbar('题目获取失败')
        console.log(err);
      })
    }
  }
}
</script>

<style>

</style>