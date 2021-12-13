<template>
  <div>
    <v-card class="bg-transparent" flat v-if="!subjectDialog">
      <Question :question="currentQuestion" @answer="answer">
        <template #toolbar>
          <v-toolbar-title>
            {{ questionList.subject }}
          </v-toolbar-title>
        </template>
        <template #index> {{ currentQuestionIndex + 1 }}. </template>
        <template #next>
          <v-btn
            outlined
            color="success"
            :disabled="cantNext"
            @click="nextQuestion"
          >
            下一题
          </v-btn>
        </template>
        <template #action>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-on="on"
                v-bind="attrs"
                @click="exitExam"
                icon
                color="error"
              >
                <v-icon> mdi-exit-to-app </v-icon>
              </v-btn>
            </template>
            <span>退出做题</span>
          </v-tooltip>
          <div>剩余时间：{{ timer }}</div>
          <v-dialog width="500" v-model="leaveExamDialog">
            <v-card>
              <v-card-title
                >当前试题还未提交，是否退出考试？退出后进度将不会保存，下次进入将重新开始考试！</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text outlined color="primary" @click="cancelLeaveExam"
                  >取消</v-btn
                >
                <v-btn text outlined color="red" @click="leaveExam">确定</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-spacer></v-spacer>
          <div>
            <span class="green--text mr-3">
              <v-icon color="success"> mdi-checkbox-marked </v-icon>
              {{ totalCount.correct }}
            </span>
            <span class="red--text mr-3">
              <v-icon color="error"> mdi-close-box </v-icon>
              {{ totalCount.error }}
            </span>
            <span>
              {{ hasFinishedCount }}
            </span>
            /
            <span>
              {{ questionList.questionList.length }}
            </span>
          </div>
          <div class="text-center">
            <v-bottom-sheet v-model="sheet">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="orange" dark icon v-bind="attrs" v-on="on">
                  <v-icon> mdi-apps </v-icon>
                </v-btn>
              </template>
              <v-sheet class="grey lighten-2">
                <v-row class="pa-5">
                  <v-sheet
                    rounded
                    elevation="1"
                    class="
                      ma-2
                      d-flex
                      justify-center
                      align-center
                      white--text
                      sheet
                    "
                    height="50"
                    :color="
                      item.correct === true
                        ? 'green'
                        : item.correct === false
                        ? 'red'
                        : index === currentQuestionIndex
                        ? 'cyan'
                        : 'grey'
                    "
                    width="50"
                    v-for="(item, index) in questionList.questionList"
                    :key="item.id"
                    @click="chooseQuestion(index)"
                  >
                    <span>{{ index + 1 }}</span>
                  </v-sheet>
                  <v-btn
                    class="success align-self-end ml-auto mr-5"
                    @click="submitDialog = true"
                  >
                    交卷
                  </v-btn>
                </v-row>
              </v-sheet>
            </v-bottom-sheet>
          </div>
          <v-dialog v-model="submitDialog">
            <v-card>
              <v-card-title>确认交卷？</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outlined color="success" @click="submitDialog = false"
                  >取消</v-btn
                >
                <v-btn class="error" @click="submit">确定</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="resultDialog" persistent>
            <v-card>
              <v-card-title>总分：{{ totalScore }}分</v-card-title>
              <v-card-text>{{ resultText }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outlined color="success" @click="$router.back()"
                  >返回首页</v-btn
                >
                <v-btn color="success" @click="_autoCreateExam">再做一遍</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </Question>
    </v-card>
    <!-- <v-footer app>
      
    </v-footer> -->
    <v-dialog v-model="subjectDialog" persistent>
      <v-card>
        <v-card-title>请选择要模拟考试的科目：</v-card-title>
        <v-card-text>
          <v-chip-group column mandatory v-model="subjectId">
            <v-chip
              filter
              outlined
              v-for="(n, i) in subjects"
              :key="n"
              :value="i + 1"
            >
              {{ n }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined color="success" @click="$router.back()"
            >返回首页</v-btn
          >
          <v-btn class="success" @click="chooseSubject">开始考试</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { autoCreateExam, examJudge } from "@/services/api";
import { subjectItems } from "@/data/types";
import Question from "@/components/Question";
export default {
  name: "simulativeExam",
  data() {
    return {
      sheet: false,
      questionList: {
        subject: "科目一",
        questionList: [],
      },
      subjects: subjectItems,
      totalCount: {
        correct: 0,
        error: 0,
      },
      questionJudgeBoList: [],
      subjectId: 1,
      chooseSubjectDialog: false,
      leaveExamDialog: false,
      navigatorFn: () => {},
      currentQuestionIndex: 0,
      currentQuestion: {},
      submitDialog: false,
      timer: "00:00",
      resultDialog: false,
      subjectDialog: true,
      totalScore: 0,
      t: null
    };
  },
  components: {
    Question,
  },
  computed: {
    sheetColor() {
      let color = ["green", "red", "grey"];
      console.log(
        color[[true, false, undefined].indexOf(this.currentQuestion.correct)]
      );
      return color[
        [true, false, undefined].indexOf(this.currentQuestion.correct)
      ];
    },
    hasFinishedCount() {
      return +this.totalCount.correct + +this.totalCount.error;
    },
    cantNext() {
      return (
        this.currentQuestionIndex >= this.questionList.questionList.length - 1
      );
    },
    resultText() {
      return this.totalScore >= 90
        ? `恭喜你，考试及格。\n“教练，我想加入车队！”`
        : `很遗憾，考试不及格，道路千万条，安全第一条，请下次继续努力！`;
    },
  },
  mounted() {
    // window.onbeforeunload = function (e) {
    //   e = e || window.event;
    //   if (e) {
    //     e.returnValue = '关闭提示';
    //   }
    //   return '关闭提示';
    // };
    // this._autoCreateExam()
  },
  destroyed() {
    window.onbeforeunload = null;
  },
  methods: {
    chooseSubject() {
      window.onbeforeunload = function (e) {
        e = e || window.event;
        if (e) {
          e.returnValue = "关闭提示";
        }
        return "关闭提示";
      };
      this.subjectDialog = false;
      this._autoCreateExam();
    },
    _autoCreateExam() {
      autoCreateExam({
        duration: this.subjectId === 1 ? 60 : 30,
        subjectId: this.subjectId,
      })
        .then(({ data }) => {
          this.questionList = data;
          let arr = [];
          data.questionList.forEach((item) => {
            arr.push({
              questionId: item.id,
              answerList: [],
            });
          });
          this.questionJudgeBoList = arr;
          this.currentQuestion = this.questionList.questionList[0];
          this.createClock();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createClock() {
      let endTime = new Date().getTime() + (this.subjectId === 1 ? 3600000 : 1800000);
      this.t = setInterval(() => {
        let time = endTime - new Date().getTime();
        time -= 1000;
        if (time <= 0) {
          this.submit();
          clearInterval(this.t);
          return;
        }
        time = this.$up.formatTime(time).split(" ")[1].substring(3, 8);
        this.timer = time;
      }, 1000);
    },
    cancelLeaveExam() {
      this.leaveExamDialog = false;
    },
    leaveExam() {
      this.navigatorFn();
    },
    chooseQuestion(i) {
      this.currentQuestionIndex = i;
      this.currentQuestion = this.questionList.questionList[i];
      this.sheet = false;
    },
    nextQuestion() {
      this.currentQuestionIndex++;
      this.currentQuestion =
        this.questionList.questionList[this.currentQuestionIndex];
    },
    answer(res, myAnswer) {
      res.correct ? this.totalCount.correct++ : this.totalCount.error++;
      this.questionJudgeBoList[this.currentQuestionIndex].answerList = myAnswer;
      let o = {
        correct: res.correct,
        answer: res,
        myAnswer
      }
      Object.assign(this.currentQuestion, o)
      // this.currentQuestion.correct = res.correct;
      // this.currentQuestion.answer = res;
      // this.currentQuestion.myAnswer = myAnswer;
    },
    exitExam() {
      this.$router.back()
    },
    submit() {
      const { duration, examName, startTime } = this.questionList;
      examJudge({
        createExamBo: {
          duration,
          examName,
          startTime,
          subjectId: this.subjectId,
        },
        questionJudgeBoList: this.questionJudgeBoList,
      })
        .then(({ data }) => {
          this.totalScore = data;
          this.sheet = false;
          this.resultDialog = true;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.submitDialog = false;
        });
    },
    showResult() {},
  },
  beforeRouteLeave(from, to, next) {
    if (this.subjectDialog || this.resultDialog) {
      next();
      return;
    }
    this.leaveExamDialog = true;
    this.navigatorFn = next;
  },
  beforeDestroy() {
    clearInterval(this.t)
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .v-bottom-sheet.v-dialog {
    max-height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .v-dialog.v-dialog--active.v-bottom-sheet::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  .v-dialog.v-dialog--active.v-bottom-sheet::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }

  .v-dialog.v-dialog--active.v-bottom-sheet::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
} 
.sheet {
  cursor: pointer;
}
</style>