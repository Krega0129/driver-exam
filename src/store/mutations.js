export default {
  _update(state, {
    data
  }) {
    if(typeof data.key === 'string') {
      toKey(data.key, data.value)
    } else {
      data.key.forEach((k, i) => {
        toKey(k, data.value[i])
      });
    }

    function toKey(str, data) {
      let keys = str.split('.')
      let lastKey = keys.pop()
      let _state = keys.reduce((pre, aft) => {
        // 
        return pre[aft]
      }, state)

      _state[lastKey] = data
    }
  },

  updateDreadcrumbs(state, to) {
    const route = to.params
    if(to.name === 'Home') {
      if(to.fullPath === '/login') {
        sessionStorage.removeItem('Authorization')
      }
      state.breadcrumbs = state.breadcrumbs.splice(0, 1);
      return;
    };
    
    let index = state.breadcrumbs.findIndex(n => n.link === route.link)
    
    if(index > -1) {
      state.breadcrumbs.disabled = true
      state.breadcrumbs.length = index + 1;
    } else {
      let len = state.breadcrumbs.length
      state.breadcrumbs[len - 1].disabled = false;
      state.breadcrumbs.push(Object.assign(route, {disabled: true}))
    }
  }
}