import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        jwt:null,
    },
    getters:{
        getToken: state => {
            return state.jwt === null ? null : 'Bearer ' + state.jwt;
        },
        isLoggedIn: state =>{
            return state.jwt === null ? false : true;
        }
    }
})