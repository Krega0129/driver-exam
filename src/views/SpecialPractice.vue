<template>
  <v-card
    class="mt-5"
  >
    <v-toolbar dense flat>
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

      <v-spacer></v-spacer>

      <v-btn
        :class="this.question.stared ? 'orange--text' : ''"
        icon
        @click="collect"
      >
        <v-icon>mdi-star</v-icon>
      </v-btn>
    </v-toolbar>
    <Question 
      :question="question"
      :result="result"
      @answer="answer"
      @nextQuestion="_getQuestion"
    ></Question>
  </v-card>
</template>

<script>
import { 
  getQuestion,
  questionJudge,
  star
} from "@/services/api";
import Question from '@/components/Question';
import SingleSelect from '@/components/Question/OptionType/SingleSelect';
import MultipleSelect from '@/components/Question/OptionType/MultipleSelect';
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
        stared: false,
        chapter: "",
        remark: "",
      },
      radio: null,
      result: {},
      dialog: false
    };
  },
  components: {
    Question,
    SingleSelect,
    MultipleSelect
  },
  computed: {
    chapterItems() {
      return this.questionType.subjectId ? this.subject2ChapterItems : this.subject1ChapterItems
    },
    option() {
      return this.question.type === 1 ? MultipleSelect : SingleSelect
    }
  },
  created() {
    this._getQuestion();
  },
  methods: {
    _getQuestion() {
      const { subjectId } = this.questionType
      console.log(subjectId);
      getQuestion({
        subjectId: subjectId + 1,
        type: this.questionType[`subject${subjectId + 1}Type`] === 0 ? '' : this.questionType[`subject${subjectId + 1}Type`],
        chapter: this.filterArg(this.questionType[`subject${subjectId + 1}Chapter`])
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
      if(!Array.isArray(e)) e = [e]
      questionJudge({
        answerList: e,
        questionId: this.question.id
      }).then(({data}) => {
        this.result = data
      }).catch(err => {
        this.$up.showErrorSnackbar('请求失败')
      })
    },
    collect() {
      star({
        questionId: this.question.id
      }).then(res => {
        this.$up.showSuccessSnackbar('收藏成功')
        this.question.stared = !this.question.stared
      }).catch(err => {
        this.$up.showErrorSnackbar(err.message || '收藏失败')
      })
      
    },
    filterArg(arg) {
      return arg === '全部' ? '' : arg
    },
    changeQestionType() {
      this.questionType = Object.assign({}, this.newQuestionType)
      this._getQuestion()
      this.dialog = false
    }
  },
  watch: {
    'newQuestionType.subject1Chapter'(n) {
      console.log(n);
    },
    'questionType.subject2Chapter'(n) {
      console.log(n);
    },
  },
};
</script>

<style lang="scss">
  ::v-deep {
    .col {
      flex-grow: 0
    }
  }
</style>