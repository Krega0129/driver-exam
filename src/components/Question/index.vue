<template>
  <v-container>
    <v-card flat>
      <v-card-title>{{ question.question }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col :lg="question.pic ? 4 : 12" :md="question.pic ? 6 : 12">
            <v-radio-group
              column 
              dense
              :multiple="question.type == 3"
              :error="result.correct === false"
              :disabled="Boolean(result.answer)"
              v-model="res"
            >
              <v-radio
                v-for="item in question.option"
                :key="item"
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
                      {{res.split('、')[0]}}
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" outlined @click="$emit('answer', res)">确定</v-btn>
        <v-btn class="success" @click="$emit('nextQuestion')"> 下一题 </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "question",
  data() {
    return {
      res: ''
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
          answer: null,
          explain: "",
          pic: "",
          mark: "",
          type: 0,
          subjectId: 1,
          chapter: "",
          remark: "",
        }
      }
    },
    result: {
      type: Object,
      default() {
        return {}
      }
    }
  }
};
</script>