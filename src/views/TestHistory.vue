<template>
  <v-data-table
    dark
    height="70vh"
    :items="examHistory"
    :headers="headers"
    no-data-text="你还没进行过模拟考试，先去试试吧~~"
  >
    <template v-slot:[`item.totalScore`]="{ item }">
      <v-progress-circular
        :value="item.totalScore"
        :color="item.totalScore >= 90 ? 'success' : 'error'"
      >
      {{item.totalScore}}</v-progress-circular>
    </template>
    <template v-slot:[`item.passQuestion`]="{ item }">
      <v-progress-circular
        :value="item.totalScore"
        :color="item.totalScore >= 90 ? 'success' : 'error'"
      >
      {{item.passQuestion}}</v-progress-circular>
    </template>

    <template v-slot:[`item.startTime`]="{ item }">
      {{ item.startTime.split('T').join(' ') }}
    </template>
  </v-data-table>
</template>

<script>
import {
  getHistory
} from '@/services/api';
export default {
  name: 'test-history',
  data() {
    return {
      examHistory: [],
      headers: [
        {text: '考试名称', value: 'examName'},
        {text: '科目', value: 'subject'},
        {text: '题目数量', value: 'totalQuestion'},
        {text: '正确题数', value: 'passQuestion'},
        {text: '总分', value: 'totalScore'},
        {text: '考试时间(分钟)', value: 'duration'},
        {text: '开始时间', value: 'startTime'},
      ]
    }
  },
  created() {
    this._getHistory()
    document.querySelector(".v-data-table__wrapper").classList.add("bar");
  },
  methods: {
    _getHistory() {
      getHistory().then(({data}) => {
        console.log(data);
        this.examHistory = data
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style scoped>

</style>