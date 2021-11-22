<template>
  <Question 
    :question="question"
    :result="result"
    @nextQuestion="_getQuestion"
    @answer="answer"
  ></Question>
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
      radio: null,
      result: {}
    };
  },
  components: {
    Question
  },
  created() {
    this._getQuestion();
  },
  methods: {
    _getQuestion() {
      getQuestion({
        subjectId: 1
      })
        .then((res) => {
          this.question = res.data;
          this.result = {}
        })
        .catch((err) => {
          console.log(err);
        });
    },
    answer(e) {
      this.result = {
        answer: 'A',
        correct: false,
        explain: '恭喜你，回答正确！恭喜你，回答正确！恭喜你，回答正确！恭喜你，回答正确！恭喜你，回答正确！'
      }
    },
  },
  watch: {
    
  },
};
</script>