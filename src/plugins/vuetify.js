import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'
import zhHans from 'vuetify/es5/locale/zh-Hans'
Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  },
  theme: {
    themes: {
      light: {
        primary: "#1976D2", // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
    dark: false
  },
});
