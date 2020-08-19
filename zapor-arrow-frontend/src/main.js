import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource';
import cookies from 'vue-cookies';
import Cloudinary, {CldImage, CldTransformation} from 'cloudinary-vue';
import * as firebase from 'firebase';

import '@fortawesome/fontawesome-free/css/all.css'

import { store } from './store/store';


Vue.config.productionTip = false

Vue.use(VueResource);
Vue.use(cookies);
Vue.use(Cloudinary, {
  configuration: {
    cloudName: 'dwqs04xan',
    apiKey: process.env.VUE_APP_CLOUDINARYAPIKEY,
    apiSecret:process.env.VUE_APP_CLOUDINARYSECRETKEY

  },
  components: {
    CldImage,
    CldXf: CldTransformation
    
} 
});

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASEAPIKEY,
  authDomain: "zaporarrow-7f6ed.firebaseapp.com",
  databaseURL: "https://zaporarrow-7f6ed.firebaseio.com",
  projectId: "zaporarrow-7f6ed",
  storageBucket: "zaporarrow-7f6ed.appspot.com",
  messagingSenderId: process.env.VUE_APP_FIREBASEMESSAGESENDERID,
  appId: process.env.VUE_APP_FIREBASEAPPID,
  measurementId: process.env.VUE_APP_FIREBASEMEASUREMENTID
};

firebase.initializeApp(firebaseConfig);

Vue.use(vuetify, {
  iconfont: 'fa'
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
