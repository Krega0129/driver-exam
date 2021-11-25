<template>
  <v-container flat>
    <div class="grey--text text-center" v-if="!question.hasOwnProperty('id')">
      没有该类型题目，换一个类型吧~~
    </div>
    <v-card flat v-show="question.hasOwnProperty('id')">
      <Question 
        :question="question"
        ref="question"
        @nextQuestion="_getQuestion"
      >
        <template #toolbar>
          <v-dialog v-model="dialog">
            <template #activator="{ on, attrs }">
              <v-btn
                color="primary"
                text
                v-on="on"
                v-bind="attrs"
              >
                筛选题目
              </v-btn>
            </template>
            <v-card
              width="500"
              class="pa-5"
            >
              科目：
              <v-chip-group
                column
                mandatory
                v-model="newQuestionType.subjectId"
              >
                <v-chip
                  filter
                  v-for="item in subjectItems"
                  :key="item"
                  outlined
                >
                  {{ item }}
                </v-chip>
              </v-chip-group>

              <v-divider class="my-3"></v-divider>

              章节：
              <v-tabs-items v-model="newQuestionType.subjectId">
                <v-tab-item>
                  <v-chip-group
                    column
                    mandatory
                    v-model="newQuestionType.subject1Chapter"
                  >
                    <v-chip
                      filter
                      v-for="item in subject1ChapterItems"
                      :key="item"
                      :value="item"
                      outlined
                    >
                      {{ item }}
                    </v-chip>
                  </v-chip-group>
                </v-tab-item>
                <v-tab-item>
                  <v-chip-group
                    column
                    mandatory
                    v-model="newQuestionType.subject2Chapter"
                  >
                    <v-chip
                      filter
                      v-for="item in subject2ChapterItems"
                      :key="item"
                      :value="item"
                      outlined
                    >
                      {{ item }}
                    </v-chip>
                  </v-chip-group>
                </v-tab-item>
              </v-tabs-items>

              <v-divider class="my-3"></v-divider>

              题目类型：
              <v-tabs-items v-model="newQuestionType.subjectId">
                <v-tab-item>
                  <v-chip-group
                    column
                    mandatory
                    v-model="newQuestionType.subject1Type"
                  >
                    <v-chip
                      filter
                      v-for="item in subject1TypeItmes"
                      :key="item"
                      outlined
                    >
                      {{ item }}
                    </v-chip>
                  </v-chip-group>
                </v-tab-item>
                <v-tab-item>
                  <v-chip-group
                    column
                    mandatory
                    v-model="newQuestionType.subject2Type"
                  >
                    <v-chip
                      filter
                      v-for="item in subject2TypeItmes"
                      :key="item"
                      outlined
                    >
                      {{ item }}
                    </v-chip>
                  </v-chip-group>
                </v-tab-item>
              </v-tabs-items>
              
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="changeQestionType"
                  class="success"
                >确定</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </Question>
    </v-card>
  </v-container>
    
</template>

<script>
import { 
  getQuestion
} from "@/services/api";
import Question from '@/components/Question';
import {
  subject1TypeItmes,
  subject2TypeItmes,
  subject1ChapterItems,
  subject4ChapterItems,
  subjectItems
} from '@/data/types';
export default {
  name: "special-practice",
  data() {
    return {
      subject1TypeItmes,
      subject2TypeItmes,
      subject1ChapterItems,
      subject2ChapterItems: subject4ChapterItems,
      subjectItems,
      containPic: null,
      questionType: {
        subject1Type: 0,
        subject2Type: 0,
        subject1Chapter: '',
        subject2Chapter: '',
        subjectId: 0,
      },
      newQuestionType: {
        subject1Type: 0,
        subject2Type: 0,
        subject1Chapter: '',
        subject2Chapter: '',
        subjectId: 0,
      },
      question: {},
      radio: null,
      dialog: false
    };
  },
  components: {
    Question
  },
  computed: {
    chapterItems() {
      return this.questionType.subjectId ? this.subject2ChapterItems : this.subject1ChapterItems
    },
  },
  created() {
    this._getQuestion();
  },
  methods: {
    async _getQuestion() {
      const { subjectId } = this.questionType
      await getQuestion({
        subjectId: subjectId + 1,
        type: this.questionType[`subject${subjectId + 1}Type`] === 0 ? '' : this.questionType[`subject${subjectId + 1}Type`],
        chapter: this.filterArg(this.questionType[`subject${subjectId + 1}Chapter`])
      })
        .then((res) => {
          this.question = res.data || {};
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filterArg(arg) {
      return arg === '全部' ? '' : arg
    },
    async changeQestionType() {
      this.questionType = Object.assign({}, this.newQuestionType)
      await this._getQuestion()
      this.$refs.question.setRes()
      this.dialog = false
    }
  }
};
</script>

<style lang="scss">
</style>