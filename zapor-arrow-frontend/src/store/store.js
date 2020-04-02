import Vue from 'vue';
import Vuex from 'vuex';
import cookies from 'vue-cookies'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        jwt:null,
    },
    getters:{
        isLoggedIn: function (){
            return cookies.isKey('token');
        }
    },
})