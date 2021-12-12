<template>
  <v-row align="center" class="fill-height card-bg">
    <v-col>
      <v-window
        v-model="window"
        dark
        class="elevation-1 full"
        vertical
      >
        <v-window-item>
          <v-card flat>
            <v-row>
              <v-col>
                <v-card-title>
                  亲爱的 {{$store.state.userInfo.userName}}：
                </v-card-title>
                <v-card-text>
                  在您使用本产品期间，一共做了 
                  <span class="text-h4"> {{ totalCount }} </span> 
                  道题
                </v-card-text>
                <v-card-text>
                  其中科目一总共完成 
                  <span class="text-h4"> {{ analysis.subject1.totalCount }} </span> 
                  道题，正确题数为 
                  <span class="text-h4"> {{ analysis.subject1.totalPassCount }} </span>，
                  正确率为 
                  <span class="text-h4"> {{ analysis.subject1.totalPassRate }} %</span>
                </v-card-text>
                <v-card-text>
                  其中科目四总共完成 
                  <span class="text-h4"> {{ analysis.subject2.totalCount }} </span> 
                  道题，正确题数为 
                  <span class="text-h4"> {{ analysis.subject2.totalPassCount }} </span>，
                  正确率为 
                  <span class="text-h4"> {{ analysis.subject2.totalPassRate }} %</span>
                </v-card-text>
              </v-col>
              <v-col>
                <div ref="totalCountBar" style="width: 500px; height: 300px"></div>
              </v-col>
            </v-row>
          </v-card>
        </v-window-item>
        <v-window-item>
          <v-card flat>
            <v-card-title>
              在所有题目中，
            </v-card-title>
            <v-row>
              <v-col cols="6">
                <v-row class="justify-space-between">
                  <div>
                    <v-card-text class="mt-5">
                      总完成题目 <span class="text-h4"> {{ pie1Total }} </span> 道<br/>
                      正确题数为 <span class="text-h4"> {{ pie1PassCount }} </span> 道<br/>
                      正确率为 <span class="text-h4"> {{ pie1PassRate }} %</span>
                    </v-card-text>
                  </div>
                  <div ref="totalPie" style="width: 360px; height: 200px"></div>
                </v-row>
                <v-row class="justify-space-between">
                  <div>
                    <v-card-text class="mt-5">
                      完成判断题 <span class="text-h4"> {{ pie2Total }} </span> 道<br/>
                      正确题数为 <span class="text-h4"> {{ pie2PassCount }} </span> 道<br/>
                      正确率为 <span class="text-h4"> {{ pie2PassRate }} %</span>
                    </v-card-text>
                  </div>
                  <div ref="audioPie" style="width: 360px; height: 200px"></div>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row class="justify-space-between">
                  <div>
                    <v-card-text class="mt-5">
                      完成单选题 <span class="text-h4"> {{ pie3Total }} </span> 道<br/>
                      正确题数为 <span class="text-h4"> {{ pie3PassCount }} </span> 道<br/>
                      正确率为 <span class="text-h4"> {{ pie3PassRate }} %</span>
                    </v-card-text>
                  </div>
                  <div ref="judgePie" style="width: 360px; height: 200px"></div>
                </v-row>
                <v-row class="justify-space-between">
                  <div>
                    <v-card-text class="mt-5">
                      完成多选题 <span class="text-h4"> {{ analysis.subject1.multipleTotalCount }} </span> 道<br/>
                      正确题数为 <span class="text-h4"> {{ analysis.subject1.multiplePassCount }} </span> 道<br/>
                      正确率为 <span class="text-h4"> {{ analysis.subject1.multiplePassRate }} %</span>
                    </v-card-text>
                  </div>
                  <div ref="multiPie" style="width: 360px; height: 200px"></div>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-window-item>
        <v-window-item>
          <v-card flat class="pl-16">
            <v-card-title>
              在使用期间，您一共参加过模拟考试 <span class="text-h3"> {{ totalExamCount }} </span> 次，其中
            </v-card-title>
            <v-card-text 
              v-for="item in examAnalysis"
              :key="item.subjectId"
            >
              {{ item.subjectName }}考试 
                <span class="text-h3"> {{ item.examCount }} </span> 
              次，通过 
                <span class="text-h3"> {{ item.passingCount }} </span> 
              次，通过率为 
                <span class="text-h3"> {{ item.rate }} %</span>
            </v-card-text>
            <!-- <v-card-text>
              科四考试 <span class="text-h3">5</span> 次，通过 <span class="text-h3">4</span> 次，通过率为 <span class="text-h3">80%</span>
            </v-card-text> -->
            <v-card-text>
              经过我们的细心推算，得出您
              <span
                v-for="item in examAnalysis"
                :key="item.subjectId"
              >
                通过{{ item.subjectName }}考试的概率为：
                  <span class="text-h3" :class="{'green--text': item.rate >= 90, 'red--text': item.rate < 90}">{{ item.rate }} %</span>，
              </span></v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-col>
    <v-item-group
      v-model="window"
      class="shrink mr-6"
      mandatory
      tag="v-flex"
    >
      <v-item
        v-for="n in length"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <div>
          <v-btn
            :input-value="active"
            icon
            dark
            @click="test(toggle, n)"
          >
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </div>
      </v-item>
    </v-item-group>
  </v-row>
</template>

<script>
import { analysisExam, analysis } from '@/services/api';
export default {
  name: 'Analysis',
  data () {
    return {
      length: 3,
      window: 0,
      examAnalysis: [
        {
          subjectId: 1,
          subjectName: '科目一',
          examCount: 0,
          passingCount: 0,
          rate: '未知'
        },
        {
          subjectId: 2,
          subjectName: '科目四',
          examCount: 0,
          passingCount: 0,
          rate: '未知'
        }
      ],
      analysis: {
        subject1: {},
        subject2: {}
      },
      totalCountBar: null,
      totalCountBarOption: {
        backgroundColor: 'transparent',
        title: {
          text: '做题情况'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['总题数', '判断题', '单选题', '多选题']
        },
        series: [
          {
            name: '科目一',
            type: 'bar',
            data: []
          },
          {
            name: '科目四',
            type: 'bar',
            data: []
          }
        ]
      },
      pieOption: {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'name',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      totalPie: null,
      totalPieOption: {},
      judgePie: null,
      judgePieOption: {},
      audioPie: null,
      audioPieOption: {},
      multiPie: null,
      multiPieOption: {},
    }
  },
  computed: {
    totalCount() {
      return parseInt(this.analysis.subject1.totalCount) + parseInt(this.analysis.subject2.totalCount)
    },
    totalExamCount() {
      let totalCount = 0
      this.examAnalysis.forEach(n => {
        totalCount += parseInt(n.examCount)
      })
      return totalCount
    },
    pie1Total() {
      return this.analysis.subject1.totalCount + this.analysis.subject2.totalCount
    },
    pie1PassCount() {
      return this.analysis.subject1.totalPassCount + this.analysis.subject2.totalPassCount
    },
    pie1PassRate() {
      return (this.pie1PassCount / this.pie1Total * 100).toFixed(2)
    },
    pie2Total() {
      return this.analysis.subject1.judgeTotalCount + this.analysis.subject2.judgeTotalCount
    },
    pie2PassCount() {
      return this.analysis.subject1.judgePassCount + this.analysis.subject2.judgePassCount
    },
    pie2PassRate() {
      return (this.pie2PassCount / this.pie2Total * 100).toFixed(2)
    },
    pie3Total() {
      return this.analysis.subject1.singleTotalCount + this.analysis.subject2.singleTotalCount
    },
    pie3PassCount() {
      return this.analysis.subject1.singlePassCount + this.analysis.subject2.singlePassCount
    },
    pie3PassRate() {
      return (this.pie3PassCount / this.pie3Total * 100).toFixed(2)
    },
    pie4Total() {
      return this.analysis.subject1.multipleTotalCount + this.analysis.subject2.multipleTotalCount
    },
    pie4PassCount() {
      return this.analysis.subject1.multiplePassCount + this.analysis.subject2.multiplePassCount
    },
    pie4PassRate() {
      return (this.pie4PassCount / this.pie4Total * 100).toFixed(2)
    }
  },
  mounted() {
    this._analysisExam()
    this._analysis()
    let opt = ['totalPieOption', 'judgePieOption', 'audioPieOption', 'multiPieOption']
    opt.forEach(n => {
      this[n] = Object.assign({}, this.pieOption)
    })
    this.totalCountBar = this.$echarts.init(this.$refs.totalCountBar, 'dark')
  },
  methods: {
    test(toggle, n) {
      toggle()
      
      if(n === 2) {
        setTimeout(() => {
          let echartsDoms = ['totalPie', 'judgePie', 'audioPie', 'multiPie']
          echartsDoms.forEach(n => {
            this[n] = this.$echarts.init(this.$refs[n], 'dark')
          })

          const setPie = (dom, opt, name, skey, ekey) => {
            this[opt].series[0].name = name
            this[opt].series[0].data = [
              {value: this.analysis.subject1[skey], name: '科目一正确'},
              {value: this.analysis.subject1[ekey], name: '科目一错误'},
              {value: this.analysis.subject2[skey], name: '科目四正确'},
              {value: this.analysis.subject2[ekey], name: '科目四错误'}
            ]
            this[dom].setOption(this[opt], true)
          }

          setPie('totalPie', 'totalPieOption', '总体情况', 'totalPassCount', 'totalErrorCount')
          setPie('judgePie', 'judgePieOption', '判断题', 'judgePassCount', 'judgeErrorCount')
          setPie('audioPie', 'audioPieOption', '单选题', 'singlePassCount', 'singleErrorCount')
          setPie('multiPie', 'multiPieOption', '多选题', 'multiplePassCount', 'multipleErrorCount')
        }, 0)
      }
    },
    _analysisExam() {
      analysisExam().then(({data}) => {
        this.examAnalysis = data
      }).catch(err => {
        console.log(err);
      })
    },
    _analysis() {
      analysis().then(({data}) => {
        // let data = [
        //   {
        //     "subjectId": 1,
        //     "subjectName": "科目1",
        //     "rate": 0.402,

        //     "totalCount": 100,
        //     "totalPassRate": 100,
        //     "totalPassCount": 4,
        //     "totalErrorCount": 4,
        //     "passRate": 0.5,

        //     "judgePassCount": 10,
        //     "judgeErrorCount": 10,
        //     "judgePassRate": 0,

        //     "singlePassCount": 20,
        //     "singleErrorCount": 20,
        //     "singlePassRate": 0.67,

        //     "multiPassCount": 30,
        //     "multiErrorCount": 30,
        //     "multiPassRate": 0,
        //   },
        //   {
        //     "subjectId": 2,
        //     "subjectName": "科目4",
        //     "rate": 0.684,
        //     "totalPassCount": 4,
        //     "totalErrorCount": 4,
        //     "judgePassCount": 10,
        //     "judgeErrorCount": 10,
        //     "singlePassCount": 20,
        //     "singleErrorCount": 20,
        //     "multiPassCount": 30,
        //     "multiErrorCount": 30,
        //     "passRate": 0.79,
        //     "judgmentPassRate": 0.89,
        //     "singleChoicePassRate": 0.82,
        //     "multipleChoicePassRate": 0
        //   }
        // ]
        this.analysis.subject1 = data.find(n => n.subjectId === 1)
        this.analysis.subject2 = data.find(n => n.subjectId === 2)

        // 所有题目情况
        let key = ['totalCount', 'judgeTotalCount', 'singleTotalCount', 'multipleTotalCount']
        let count1 = []
        let count2 = []
        key.forEach(n => {
          count1.push(this.analysis.subject1[n])
          count2.push(this.analysis.subject2[n])
        })
        this.totalCountBarOption.series[0].data = count1
        this.totalCountBarOption.series[1].data = count2
        this.totalCountBar.setOption(this.totalCountBarOption, true);
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>