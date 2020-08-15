import Vue from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify';
import VueResourse from 'vue-resource';
import cookies from 'vue-cookies';
import Cloudinary, {CldImage, CldTransformation} from 'cloudinary-vue';

import '@fortawesome/fontawesome-free/css/all.css'

import { store } from './store/store';


Vue.config.productionTip = false
Vue.use(VueResourse);
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


Vue.use(vuetify, {
  iconfont: 'fa'
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
