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

const showSnackbar = function (snackbarData) {
  update('snackbar', snackbarData)
}

export default {
  update,
  showSnackbar
}