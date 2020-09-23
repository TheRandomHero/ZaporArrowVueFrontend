import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify';
import firebase from './firebaseInit';
require('firebase/firestore')


import '@fortawesome/fontawesome-free/css/all.css'

import { store } from './store/store';


Vue.config.productionTip = false



firebase.auth().onAuthStateChanged(user => {
  store.dispatch('fetchUser', user);
})

Vue.prototype.$firebase = firebase;

Vue.use(vuetify, {
  iconfont: 'fa'
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
