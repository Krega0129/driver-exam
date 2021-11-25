<template>
  <v-container>
    <v-card flat>
      <Question 
        :question="question"
        @nextQuestion="_getQuestion"
      ></Question>
    </v-card>
  </v-container>
</template>

<script>
import { getQuestion } from "@/services/api";
import Question from '@/components/Question';
export default {
  name: "special-practice",
  data() {
    return {
      type: [0],
      subjectId: 1,
      question: {},
      radio: null
    };
  },
  components: {
    Question
  },
  created() {
    this._getQuestion();
  },
  methods: {
    async _getQuestion() {
      await getQuestion({})
        .then((res) => {
          this.question = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  watch: {
    
  },
};
</script>