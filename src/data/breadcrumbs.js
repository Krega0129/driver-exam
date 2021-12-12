const Breadcrumbs = [
  ['special-practice', '专项练习'],
  ['simulative-exam', '模拟考试'],
  ['test-history', '历史试题'],
  ['error-data-bank', '错题集'],
  ['random-practice', '随机练习'],
  ['question-collection', '收藏题目'],
  ['top', '排行榜'],
  ['analysis', '考试分析'],
]

const ArrayToMap = function(arr) {
  if(Array.isArray(arr) && arr.every(item => Array.isArray(item))) {
    return new Map(arr);
  } else {
    throw new Error('传入格式错误');
  }
}

export default ArrayToMap(Breadcrumbs)