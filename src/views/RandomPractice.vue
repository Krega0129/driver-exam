<template>
  <v-card class="mt-5">
    <Question 
      :question="question"
      @nextQuestion="_getQuestion"
    ></Question>
  </v-card>
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
      question: {
        id: -1,
        question: "题目",
        option: [],
        answer: null,
        explain: "",
        pic: "",
        mark: "",
        type: 0,
        subjectId: 1,
        chapter: "",
        remark: "",
      },
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