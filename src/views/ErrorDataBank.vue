<template>
  <div>
    错题库
  </div>
</template>

<script>
import {
  woringQuestion
} from '@/services/api';
export default {
  name: 'error-data-bank',
  data() {
    return {
      
    }
  },
  mounted() {
    woringQuestion({
      currentPage: 1,
      size: 10
    }).then(res => {
      console.log(res);
    })
  }
}
</script>

<style scoped>

</style>