<template>
  <v-container>
    <v-card flat>
      <v-toolbar dense flat>
        <slot name="toolbar"></slot>

        <v-spacer></v-spacer>

        <v-btn
          :class="question.stared ? 'orange--text' : ''"
          icon
          @click="collect"
        >
          <v-icon>mdi-star</v-icon>
        </v-btn>
      </v-toolbar>
      
      <v-card-title>（{{questionType}}）{{ question.question }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col :lg="question.pic ? 4 : 12" :md="question.pic ? 6 : 12">
            <div v-if="question.type === 3">
              <v-checkbox
                v-for="item in question.option"
                v-model="res"
                dense
                :readonly="Boolean(result.answer || (question.myAnswer && question.myAnswer[0]))"
                :key="item"
                :label="item"
                :color="color"
                :value="item"
              ></v-checkbox>
            </div>
            <v-radio-group
              column 
              dense
              v-else
              :readonly="Boolean(result.answer || (question.myAnswer && question.myAnswer[0]))"
              v-model="res"
            >
              <v-radio
                v-for="item in question.option"
                :key="item"
                :color="color"
                :label="item"
                :value="item"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col lg="4" md="3">
            <v-img
              v-if="question.pic"
              :src="question.pic"
              max-height="150"
              contain
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
        <v-row v-if="result.answer">
          <v-col>
            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header disable-icon-rotate>
                  <span>
                    你的答案：
                    <span 
                      :class="{ 'green--text': result.correct, 'red--text': !result.correct }"
                      class="ml-3"
                    >
                      {{ myAnswer }}
                    </span>
                    <v-icon 
                      :color="result.correct ? 'success' : 'error'"
                      class="mr-5"
                    > {{ result.correct ? 'mdi-check' : 'mdi-close' }} </v-icon>
                    <span v-if="!result.correct">
                      正确答案：
                      <span
                        class="ml-3 green--text"
                      >
                        {{ result.answer }}
                      </span>
                    </span>
                  </span>
                  <template v-slot:actions>
                    题目解析
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ result.explain }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card-text>
      <slot name="action">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" :disabled="!res" outlined @click="answer(res)">确定</v-btn>
          <slot name="next">
            <v-btn class="success" @click="nextQuestion"> 下一题 </v-btn>
          </slot>
        </v-card-actions>
      </slot>
    </v-card>
  </v-container>
</template>

<script>
import {
  questionJudge,
  star,
  deleteStar
} from "@/services/api";
export default {
  name: "question",
  data() {
    return {
      res: [],
      result: {}
    };
  },
  props: {
    question: {
      type: Object,
      default() {
        return {
          id: -1,
          question: "题目",
          option: [],
          answer: [],
          explain: "",
          pic: "",
          mark: "",
          type: 1,
          subjectId: 1,
          chapter: "",
          remark: "",
        }
      }
    }
  },
  computed: {
    color() {
      const {correct} = this.result
      const {myAnswer} = this.question
      return correct === true ? 'success' : 
              (correct === false || (myAnswer && myAnswer[0])) ? 'red' : ''
    },
    questionType() {
      const { type } = this.question
      return ['', '判断', '单选', '多选'][type]
    },
    myAnswer() {
      let r = this.res
      if(!Array.isArray(r)) r = [r]
      return r.reduce((prev, cur) => {
        return prev += cur.split('、')[0]
      }, '')
    }
  },
  created() {
    this.setRes()
  },
  methods: {
    setRes() {
      console.log(13434);
      const {type, myAnswer} = this.question
      this.result = {}
      console.log(type);
      // 多选
      if(type === 3) {
        this.res = myAnswer ?? []
      } else {
        this.res = (myAnswer && myAnswer[0]) ?? ''
      }
      console.log(this.res);
    },
    nextQuestion() {
      this.setRes()
      this.result = {}
      this.$emit('nextQuestion')
    },
    async collect() {
      let fn = this.question.stared ? deleteStar : star
      await fn({
        questionId: this.question.id
      }).then(res => {
        this.$up.showSuccessSnackbar(`${this.question.stared ? '取消' : ''}收藏成功`)
        this.question.stared = !this.question.stared
      }).catch(err => {
        this.$up.showErrorSnackbar(err.message || '操作失败')
      })
    },
    answer(e) {
      if(!Array.isArray(e)) e = [e]
      questionJudge({
        answerList: e,
        questionId: this.question.id
      }).then(({data}) => {
        this.result = data
      }).catch(err => {
        this.$up.showErrorSnackbar('请求失败')
      })
    }
  },
  watch: {
  }
};
</script>