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

export default {
  update,
  showSuccessSnackbar,
  showErrorSnackbar
}