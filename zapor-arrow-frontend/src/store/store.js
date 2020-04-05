import Vue from 'vue';
import Vuex from 'vuex';
import cookies from 'vue-cookies'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        jwt:null,
        imageIdsForArrow:[],

    },
    getters:{
        isLoggedIn(){
            return cookies.isKey('token');
        },
        imageIdsForSpecArrow(){

        }

    },
    actions:{
        
    },
    mutations:{
        
    }
})