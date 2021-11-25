<template>
  <v-container>
    <v-card flat min-height="65vh">
      <v-toolbar dense flat>
        <slot name="toolbar"></slot>

        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              :class="question.stared ? 'orange--text' : ''"
              v-on="on"
              v-bind="attrs"
              icon
              small
              @click="collect"
            >
              <v-icon>mdi-star</v-icon>
            </v-btn>
          </template>
          <span>{{(question.stared ? '已' : '') + '收藏'}}</span>
        </v-tooltip>
      </v-toolbar>
      
      <v-card-title v-show="question.hasOwnProperty('id')">
        <slot name="index"></slot>
        ({{questionType}}){{ question.question }}
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col :lg="question.pic ? 4 : 12" :md="question.pic ? 6 : 12">
            <div v-if="question.type === 3">
              <v-checkbox
                v-for="item in question.option"
                v-model="res"
                dense
                :readonly="readonly"
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
              :readonly="readonly"
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
        <v-row v-if="showExplain">
          <v-col>
            <slot name="explain">
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
                      <v-btn
                        outlined
                        dense
                        color="success"
                      >
                        题目解析
                      </v-btn>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    {{ result.explain }}
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </slot>
          </v-col>
        </v-row>
      </v-card-text>
      <slot name="card-action">
        <v-card-actions v-if="$route.fullPath === '/user/question-collection'">
          <v-spacer></v-spacer>
          <v-btn 
            class="success" 
            :disabled="!res || !!result.hasOwnProperty('correct')" 
            @click="answer(res)"
          >确定</v-btn>
        </v-card-actions>
      </slot>
    </v-card>
    <v-footer app>
      <slot name="action"></slot>
      <v-spacer></v-spacer>
      <slot name="confirm">
        <v-btn
          class="success mr-3" 
          :disabled="!res || !!result.hasOwnProperty('correct')" 
          @click="answer(res)"
        >确定</v-btn>
      </slot>
      <slot name="next">
        <v-btn outlined color="success" @click="nextQuestion"> 下一题 </v-btn>
      </slot>
    </v-footer>
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
        return {}
      }
    }
  },
  computed: {
    color() {
      const {correct} = this.result
      const {myAnswer} = this.question
      return (correct) ? 'success' : 
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
    },
    readonly() {
      return Boolean(
        this.result.answer || 
        // (this.question.myAnswer && this.question.myAnswer[0]) ||
        this.$route.fullPath === '/user/error-data-bank'
      )
    },
    showExplain() {
      return this.result.answer || (this.question.answer && this.$route.futhPath !== '/user/question-collection')
    }
  },
  methods: {
    setRes() {
      const {type, myAnswer, answer} = this.question
      this.result = answer ?? {}
      // 多选
      if(type === 3) {
        this.res = myAnswer ?? []
      } else {
        this.res = (myAnswer && myAnswer[0]) ?? ''
      }
    },
    nextQuestion() {
      this.$emit('nextQuestion')
    },
    async collect() {
      let fn = this.question.stared ? deleteStar : star
      await fn({
        questionId: this.question.id
      }).then(res => {
        this.$up.showSuccessSnackbar(`${this.question.stared ? '取消' : ''}收藏成功`)
        this.$emit('getStarQuestion')
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
        this.$emit('answer', data, e)
      }).catch(err => {
        this.$up.showErrorSnackbar('请求失败')
      })
    }
  },
  watch: {
    'question.id': {
      immediate: true,
      handler() {
        this.setRes()
      }
    }
  }
};
</script>