export function debounce(fn, time) {
  let timeout = null
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      this[fn](...arguments)
    }, time);
  }
}