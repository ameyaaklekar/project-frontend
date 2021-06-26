import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        error: '#f44336',
        warning: '#ff9800',
        info: '#03a9f4',
        success: '#8bc34a',
      },
    },
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
  },
});
