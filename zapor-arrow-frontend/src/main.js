import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify';
import VueResourse from 'vue-resource';

import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

Vue.use(VueResourse);

Vue.use(vuetify, {
  iconfont: 'fa'
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
