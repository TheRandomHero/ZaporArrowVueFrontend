import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        "jwt":'',
    },
    getters:{
        getToken: state => {
            return 'Bearer ' + state.jwt;
        }
    }
})