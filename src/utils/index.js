import store from '../store';

const update = function (key, value) {
  store.commit({
    type: "_update",
    data: {
      key,
      value,
    },
  });
}

const showSuccessSnackbar = function (text) {
  update('snackbar', {
    type: 'success',
    text
  })
}

const showErrorSnackbar = function (text) {
  update('snackbar', {
    type: 'error',
    text
  })
}

const formatTime = function(t) {
  let date = new Date(t)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(key) {
  let k = key.toString()
  return k[1] ? k : `0${k}`
}

export default {
  update,
  showSuccessSnackbar,
  showErrorSnackbar,
  formatTime
}