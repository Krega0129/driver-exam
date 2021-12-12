<template>
  <div>
    <v-card
      v-for="item in questionData"
      class="mt-3 bg-transparent"
      :key="item.id"
    >
      <question
        @getStarQuestion="_getStarQuestion"
        :question="item"
      >
        <template #action>
          <v-spacer></v-spacer>
          <v-pagination
            v-show="questionData[0]"
            v-model="currentPage"
            :length="totalPages"
            @input="_getStarQuestion"
          ></v-pagination>
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
      您还没有收藏题目，先去收藏吧~~
    </div>
  </div>
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