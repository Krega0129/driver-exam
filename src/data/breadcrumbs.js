const Breadcrumbs = [
  ['special-practice', '专项练习'],
  ['test-history', '历史试题'],
  ['error-data-bank', '错题集'],
  ['random-practice', '随机练习'],
  ['question-collection', '收藏题目']
]

const ArrayToMap = function(arr) {
  if(Array.isArray(arr) && arr.every(item => Array.isArray(item))) {
    return new Map(arr);
  } else {
    throw new Error('传入格式错误');
  }
}

export default ArrayToMap(Breadcrumbs)